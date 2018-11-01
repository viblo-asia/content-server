const encodeURI = (uri) => {
    return `https://docs.google.com/presentation/d/${encodeURIComponent(uri)}/embed?start=false&loop=false&delayms=3000`
}

const parseGoogleSlideURL = (code) => {
    if (code.startsWith('https://docs.google.com/presentation/d/')) {
        const match = code.match(/[-\w]{25,}/)
        return !match ? null : encodeURI(match[0])
    }

    return encodeURI(code)
}

export default (code) => {
    const embedURL = parseGoogleSlideURL(code)
    if (!embedURL) return

    return {
        src: embedURL,
        frameborder: 0,
        webkitallowfullscreen: true,
        mozallowfullscreen: true,
        allowfullscreen: true
    }
}
