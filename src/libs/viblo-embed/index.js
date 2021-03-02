import oembed from './oembed'
import manual from './manual'

const isValidProvider = (name = '') => {
    return !!name.toLowerCase().match(/(youtube|vimeo|slideshare|codepen|gist|jsfiddle|googleslide|viblo)/)
}

const render = (url, provider) => {
    if (oembed.isCodepenEmbed(url)) {
        return manual.render(url, 'codepen')
    }

    if (oembed.isOembed(url, provider)) {
        return oembed.render(url, provider)
    }

    return manual.render(url, provider)
}

export default {
    render,
    isValidProvider
}
