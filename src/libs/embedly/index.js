import oembed from './oembed'
import noembed from './noembed'

const isValidProvider = (name = '') => {
    return !!name.toLowerCase().match(/(youtube|vimeo|slideshare|codepen|gist|jsfiddle|googleslide)/)
}

const render = (url, provider) => Promise.resolve(
    oembed.isOembed(url, provider)
        ? oembed.render(url, provider)
        : noembed.render(url, provider)
)

export default {
    render,
    isValidProvider
}
