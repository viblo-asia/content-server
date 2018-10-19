import { embedNotFound, responseEmbed } from '../utils/page'
import { Router } from 'express'
import embedly from '../libs/embedly'

const router = Router()

router.get('/embed', async ({ query: { url, provider } }, res) => {
    if (!url) return embedNotFound(res)(url)

    provider = embedly.isValidProvider(provider) ? provider : undefined

    try {
        const { html, title } = await embedly.render(url, provider)
        return responseEmbed(res)(html, { title })
    } catch (e) {
        console.error(e)
        return embedNotFound(res)(url)
    }
})

router.get('/embed/slideshare', ({ query: { url } }, res) => res.redirect(`/embed?url=${url}&provider=slideshare`))

export default router
