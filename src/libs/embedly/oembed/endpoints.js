import axios from 'axios'

export const fetchCodepen = params => axios.get('https://codepen.io/api/oembed', { params })
export const fetchNoembed = params => axios.get('https://noembed.com/embed', { params })
