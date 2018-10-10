import axios from 'axios'

export const getYoutube = params => axios.get('https://www.youtube.com/oembed', { params })
export const getVimeo = params => axios.get('https://vimeo.com/api/oembed.json', { params })
export const getSlideShare = params => axios.get('https://www.slideshare.net/api/oembed/2', { params })
export const getCodepen = params => axios.get('https://codepen.io/api/oembed', { params })

export default {
    youtube: getYoutube,
    vimeo: getVimeo,
    slideshare: getSlideShare,
    codepen: getCodepen
}
