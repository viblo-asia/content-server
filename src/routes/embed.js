const express = require('express')
const axios = require('axios')
const resolve = require('path').resolve

const router = express.Router()

/** Response 404 page **/
const sendErrorPage = (res, url) => res.status(404).send(
    `<style>
        .link {color:#5488c7;font-size:1rem;text-decoration:none}.link:hover{color:#33629c;text-decoration:underline}
    </style>
    <a class="link" href="${url}" target="_blank">${url}</a>`
)

/** The data variable is object, must contains "embedURL" or "document" **/
const embedResponse = (res, data, viewPath) => {
    if (!viewPath) {
        viewPath = resolve(__dirname, '../views/embed/embed.pug')
    }

    return res.render(viewPath, data, (err, html) => {
        return err ? sendErrorPage(res, data.url) : res.send(html)
    })
}

/** Get slide's data from SlideShare api **/
const fetchSlideShare = (url) => {
    const endpoint = 'http://www.slideshare.net/api/oembed/2'
    const params = { url, format: 'json' }

    return axios.get(endpoint, { params }).then(({ data }) => data)
}

router.get('/embed/slideshare', async (req, res) => {
    if (!req.query.url) return res.sendStatus(400)

    const url = req.query.url
    const data = await fetchSlideShare(url).catch(() => sendErrorPage(res, url))
    const embedURL = `https://slideshare.net/slideshow/embed_code/${data.slideshow_id}`

    return embedResponse(res, { embedURL, title: data.title, url })
})

module.exports = router
