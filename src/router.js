const router = require('express').Router();
const md = require('./renderer');

const { getPost } = require('viblo-sdk/api/posts');

router.get('/posts/:hashId/contents', async function (req, res, next) {
    try {
        const { data: post } = await getPost(req.params.hashId);

        return res.json({
            ...post,
            contents: md.render(post.contents)
        });
    } catch (e) {
        if (e.response) {
            res.status(e.response.status || 404).send();
        } else {
            res.status(500).send();
        }
    }
});

module.exports = router;
