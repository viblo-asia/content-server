const express = require('express')
const axios = require('axios')
const resolve = require('path').resolve

const router = express.Router()

/** Response 404 page **/
const sendErrorPage = (res) => res.status(404).sendFile(resolve(__dirname, '../views/404.html'))

/** The data variable is object, must contains "embedURL" or "document" **/
const embedResponse = (res, data, viewPath) => {
    if (!viewPath) {
        viewPath = resolve(__dirname, '../views/embed/embed.pug')
    }

    return res.render(viewPath, data, (err, html) => {
        return err ? sendErrorPage(res) : res.send(html)
    })
}

/** Get slide's data from SlideShare api **/
const fetchSlideShare = (url) => {
    const endpoint = 'http://www.slideshare.net/api/oembed/2'
    const params = { url, format: 'json' }

    return axios.get(endpoint, { params }).then(({ data }) => data)
}

router.get('/embed/slideshare', async (req, res) => {
    if (!req.query.url) return sendErrorPage(res)

    const data = await fetchSlideShare(req.query.url).catch(() => sendErrorPage(res))
    const embedURL = `https://slideshare.net/slideshow/embed_code/${data.slideshow_id}`

    return embedResponse(res, { embedURL, title: data.title })
})

module.exports = router
