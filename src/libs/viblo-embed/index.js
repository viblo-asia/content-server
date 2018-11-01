import oembed from './oembed'
import manual from './manual'

const isValidProvider = (name = '') => {
    return !!name.toLowerCase().match(/(youtube|vimeo|slideshare|codepen|gist|jsfiddle|googleslide)/)
}

const render = (url, provider) => Promise.resolve(
    oembed.isOembed(url, provider)
        ? oembed.render(url, provider)
        : manual.render(url, provider)
)

export default {
    render,
    isValidProvider
}
