import { embedNotFound, responseEmbed, profileEmbed } from '../utils/page'
import { Router } from 'express'
import embed from '../libs/viblo-embed'
import _findLastKey from 'lodash/findLastKey'
import _pick from 'lodash/pick'
import _forEach from 'lodash/forEach'
import { getProfile } from 'viblo-sdk/api/users'
import { APP_URL, IMAGES_URL } from '../env'

const router = Router()

const postfixes = {
    1e3: 'K',
    1e6: 'M',
    1e9: 'B',
    1e12: 'T',
}

const formatNumber = (number = 0) => {
    const magnitude = _findLastKey(postfixes, (_, magnitude) => number >= magnitude)

    if (!magnitude) {
        return Number(number.toFixed(2))
    }

    const decimalForm = number / magnitude
    const integerPart = Math.floor(decimalForm)
    const tenthPlace = Number(String(decimalForm).replace(/\d+\./, '').slice(0, 1))
    const postfix = postfixes[magnitude]

    if (integerPart == String(decimalForm)) {
        return `${integerPart}${postfix}`
    }
    return `${integerPart}.${tenthPlace}${postfix}`
}

const getFormatedNumber = (profile) => {
    try {
        const data = _pick(profile, [
            'total_post_views', 'questions_count', 'answers_count', 'reputation', 'followers_count', 'posts_count',
        ])
        var formatters = {}

        _forEach(data, (value, key) => {
            formatters[key] = formatNumber(value)
        })

        return formatters
    } catch (error) {
        console.log(error)
    }
}

router.get('/embed', ({ query: { url, provider } }, res) => {
    if (!url) return embedNotFound(res)(url)

    provider = embed.isValidProvider(provider) ? provider : undefined

    embed.render(url, provider)
        .then(({ html, title }) => responseEmbed(res)(html, { title }))
        .catch((e) => {
            console.error(e)
            return embedNotFound(res)(url)
        })
})

router.get('/embed/slideshare', ({ query: { url } }, res) => res.redirect(`/embed?url=${url}&provider=slideshare`))

router.get('/embed/users/:username', async function ({ params }, res) {
    try {
        const { data: profile } = await getProfile(params.username)
        if (profile) {
            const title = 'Viblo ' + profile.name + ' Embed'
            const profile_url = APP_URL + '/u/' + profile.username + '/'
            const image_url = IMAGES_URL + '/avatar/' + profile.avatar
            const formated =  getFormatedNumber(profile)

            return profileEmbed(res)({
                ...profile,
                profile_url,
                image_url,
                formated,
            }, { title })
        }
    } catch (e) {
        return embedNotFound(res)(res.req.url)
    }
})

export default router
