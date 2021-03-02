export default (url) => {
    const regex = /^https?:\/\/codepen.io\/([a-zA-Z0-9]+)\/(pen|embed\/preview|embed)\/([a-zA-Z0-9]+)(.*)$/
    const matches = url.match(regex)

    if (!matches) return

    const penUser = matches[1]
    const penId = matches[3]
    const penOptions = matches[4]

    const embedURL = `https://codepen.io/${penUser}/embed/${penId}${penOptions}`

    return {
        src: embedURL,
    }
}
