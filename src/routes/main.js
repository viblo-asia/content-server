import md from '../renderer'
import { getPost } from 'viblo-sdk/api/posts'
import { Router } from 'express'

const router = Router()

router.get('/posts/:hashId/contents', async function (req, res) {
    try {
        const { data: post } = await getPost(req.params.hashId)
        const contents = md.render(post.contents)

        return res.json({ ...post, contents })
    } catch (e) {
        if (e.response) {
            res.status(e.response.status || 404).send()
        } else {
            res.status(500).send()
        }
    }
})

export default router
