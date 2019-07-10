import { APP_URL } from '../../../../env'

export default (url) => {
    const regExp = /^http[s]?:\/\/?viblo.asia\/u\/([a-zA-Z0-9-]{0,20})/
    const match = url.match(regExp)
    if (!match) return

    const embedURL = `${APP_URL}/embed/users/${match[1]}`

    return {
        src: embedURL,
    }
}
