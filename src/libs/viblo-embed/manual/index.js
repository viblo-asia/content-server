import parsers from './parsers'
import { renderEmbed } from '../utils/embed'

const SITE_REGEX = /^http[s]?:\/\/(?:www\.)?(gist\.github\.com|jsfiddle\.net|docs\.google\.com\/presentation|viblo\.asia)/

const detectProvider = (url) => {
    const match = url.match(SITE_REGEX)
    if (!match) return
    return ({
        'gist.github.com': 'gist',
        'jsfiddle.net': 'jsfiddle',
        'docs.google.com/presentation': 'googleslide',
        'codepen.io': 'codepen',
        'viblo.asia': 'viblo',
    })[match[1]]
}

const render = (url, provider = null) => new Promise((resolve, reject) => {
    try {
        const site = provider ? provider : detectProvider(url)
        const iframe = parsers[site](url)
        if (!iframe) {
            reject(new Error('Could not found HTML in response.'))
        }
        const html = renderEmbed(iframe)
        resolve({ html })
    } catch (e) {
        reject(e)
    }
})

export default {
    render
}
