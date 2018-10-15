import endpoints from './endpoints'

const SITE_REGEX = /^http[s]?:\/\/(?:www\.)?(youtube\.com|vimeo\.com|slideshare\.net|codepen\.io)/

const convertIdToURL = (id, provider) => {
    const baseURLs = {
        youtube: 'https://www.youtube.com/watch?v=',
        vimeo: 'https://vimeo.com/',
        slideshare: 'https://www.slideshare.net/slideshow/embed_code/',
    }
    return baseURLs[provider] ? `${baseURLs[provider]}${id}` : null
}

const detectProvider = (url) => {
    const match = url.match(SITE_REGEX)
    return match ? match[1].split('.').reverse().pop() : null
}

const isOembed = (url, provider) => {
    if (provider) return !!endpoints[provider]
    return SITE_REGEX.test(url)
}

const render = async (url, provider = null) => {
    try {
        const site = provider ? provider : detectProvider(url)
        const embedURL = url.startsWith('http') ? url : convertIdToURL(url, provider)
        const { data: { html, title } } = await endpoints[site]({ url: embedURL, format: 'json' })

        return { html, title }
    } catch (e) {
        throw e
    }
}

export default {
    isOembed,
    render
}
