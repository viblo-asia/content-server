import _curry from 'lodash/curry'
import _map from 'lodash/map'
import md from '../renderer'

import { Router } from 'express'
import { getComments } from 'viblo-sdk/api/comments'
import { getPost } from 'viblo-sdk/api/posts'

const router = Router()

const handleError = _curry((res, e) => {
    console.error(e)

    if (e.response) {
        res.status(e.response.status || 404).send()
    } else {
        res.status(500).send()
    }
})

router.get('/posts/:hashId/contents', async function ({ params }, res) {
    try {
        const { data: post } = await getPost(params.hashId)
        const contents = md.render(post.contents || '')

        return res.json({ ...post, contents })
    } catch (e) {
        return handleError(res, e)
    }
})

router.get('/prerender/:commentableType/:hashId/comments', async ({ params }, res) => {
    try {
        const { comments: { data = [] }, threads } = await getComments(params.commentableType, params.hashId)

        const comments = _map(data, (comment) => {
            const contents = md.render(comment.contents || '')
            return { ...comment, contents_html: contents }
        })

        return res.json({
            comments: { data: comments },
            threads,
        })
    } catch (e) {
        return handleError(res, e)
    }
})

export default router
