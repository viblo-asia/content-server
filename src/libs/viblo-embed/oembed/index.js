import axios from 'axios'

const fetchNoembed = params => axios.get('https://noembed.com/embed', { params })

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

    const validRegex = /^http[s]?:\/\/(?:www\.)?(youtube\.com|youtu\.be|vimeo\.com|slideshare\.net|codepen\.io)/
    return validRegex.test(url)
}

const render = (url, provider = null) => new Promise((resolve, reject) => {
    try {
        // Because of legacy embed allows id use instead of URL.
        const isIdUsing = !url.startsWith('http')

        // Support render ID:
        if (isIdUsing && provider) {
            url = convertIdToURL(url, provider)
        }

        fetchNoembed({ url, format: 'json' })
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
    render
}
