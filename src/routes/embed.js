import { embedNotFound, responseEmbed } from '../utils/page'
import { Router } from 'express'
import embed from '../libs/viblo-embed'

const router = Router()

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

export default router
