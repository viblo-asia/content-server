require('dotenv').config()

export const PORT = process.env.PORT || 3000
export const API_URL = process.env.API_URL
export const APP_URL = process.env.APP_URL
export const IMAGES_URL = process.env.IMAGES_URL

export default {
    PORT,
    API_URL,
    APP_URL,
    IMAGES_URL,
}
