import { fetchCodepen, fetchNoembed } from './endpoints'

const convertIdToURL = (id, provider) => {
    const makeURL = (baseURI, path) => `${baseURI}${path}`
    const baseURI = ({
        youtube: 'https://www.youtube.com/watch?v=',
        vimeo: 'https://vimeo.com/',
        slideshare: 'https://www.slideshare.net/slideshow/embed_code/',
    })[provider]

    return baseURI ? makeURL(baseURI, id) : null
}

const detectProvider = (url) => {
    const SITE_REGEX = /^http[s]?:\/\/(?:www\.)?(youtube\.com|youtu\.be|vimeo\.com|slideshare\.net|codepen\.io)/
    const match = url.match(SITE_REGEX)
    const provider = match ? match[1].split('.').reverse().pop() : null
    return provider === 'youtu' ? 'youtube' : provider
}

const isOembed = (url, provider) => {
    if (provider) {
        return /(youtube|vimeo|slideshare|codepen)/.test(provider)
    }

    return !!detectProvider(url)
}


const getOembedHTML = (url, oembedProvider) => {
    const params = { url, format: 'json' }
    const unsupportedByNoembed = oembedProvider === 'codepen'

    if (unsupportedByNoembed) {
        return fetchCodepen(params)
    }

    return fetchNoembed(params)
}

const render = (url, provider = null) => new Promise((resolve, reject) => {
    try {
        // Because of legacy embed allows id use instead of URL.
        const isIdUsing = !url.startsWith('http')

        provider = provider ? provider : detectProvider(url)
        url = isIdUsing ? convertIdToURL(url, provider) : url

        getOembedHTML(url, provider)
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
