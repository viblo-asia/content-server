import axios from 'axios'

const requestNoembedHTML = params => axios.get('https://noembed.com/embed', { params })

const providers = {
    'youtube': /^http[s]?:\/\/(?:www\.)?(youtube\.com|youtu\.be)/,
    'vimeo': /^http[s]?:\/\/(?:www\.)?(vimeo\.com)/,
    'slideshare': /^http[s]?:\/\/(?:www\.)?(slideshare\.net)/,
    'codepen': /^http[s]?:\/\/(?:www\.)?(codepen\.io)/,
}

const sitesEmbedByID = {
    youtube: 'https://www.youtube.com/watch?v=',
    vimeo: 'https://vimeo.com/',
    slideshare: 'https://www.slideshare.net/slideshow/embed_code/',
}

const convertIdToURL = (id, provider) => {
    const makeURL = (baseURI, path) => `${baseURI}${path}`
    const baseURI = sitesEmbedByID[provider]
    return baseURI ? makeURL(baseURI, id) : id
}

const isOembed = (url, provider) => {
    // Support legacy embed, need provider name:
    if (provider) {
        return !!providers[provider]
    }

    const validRegex = /^http[s]?:\/\/(?:www\.)?(youtube\.com|youtu\.be|vimeo\.com|slideshare\.net|codepen\.io|soundcloud\.com)/
    return validRegex.test(url)
}

const isCodepenEmbed = (url) => {
    return providers.codepen.test(url)
}

const fetchNoembed = (url) => new Promise((resolve, reject) => {
    requestNoembedHTML({ url, format: 'json' })
        .then((response) => {
            // Noembed always returns "200 OK".
            const error = response.data.error
            const embedNotFound = error && error.match(/(404)/)
            if (!embedNotFound) {
                return resolve(response)
            }

            return requestNoembedHTML({ url: `${url}?ver-${new Date().getTime()}` })
                .then(resolve)
                .catch(reject)
        })
        .catch(reject)
})

const render = (url, provider = null) => new Promise((resolve, reject) => {
    try {
        // Because of legacy embed allows id use instead of URL.
        const isIdUsing = !url.startsWith('http')

        // Support render ID:
        if (isIdUsing && provider) {
            url = convertIdToURL(url, provider)
        }

        fetchNoembed(url)
            .then(({ data: { html, title } }) => {
                if (!html) {
                    reject(new Error('Could not found HTML in response from Oembed provider'))
                }

                resolve({ html, title })
            })
    } catch (e) {
        reject(e)
    }
})

export default {
    isOembed,
    isCodepenEmbed,
    render
}
