const router = require('express').Router();
const bodyParser = require('body-parser');
const md = require('./renderer');

const { getPost } = require('viblo-sdk/api/posts');

router.use(bodyParser.json());

router.get('/contents/posts/:hashId', async function (req, res, next) {
    try {
        const { data: post } = await getPost(req.params.hashId);

        return res.json({
            ...post,
            contents: md.render(post.contents)
        });
    } catch (e) {
        if (e.response) {
            res.status(e.response.status || 404).send();
        }
    }
});

module.exports = router;
