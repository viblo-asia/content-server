import oembed from './oembed'
import noembed from './noembed'

const render = (url, provider) => Promise.resolve(
    oembed.isOembed(url, provider)
        ? oembed.render(url, provider)
        : noembed.render(url, provider)
)

export default {
    render
}
