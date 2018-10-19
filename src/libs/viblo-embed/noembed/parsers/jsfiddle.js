export default (code) => {
    let embedURL = code.replace(/^\/+|\/+$/gm, '')
        .replace(/(^http[s]?:\/\/(?:www\.)?jsfiddle.net\/)|(^jsfiddle.net\/)/, 'https://jsfiddle.net/')
        .replace('/embed', '/embedded')

    if (!embedURL.startsWith('https://jsfiddle.net/')) {
        embedURL = `https://jsfiddle.net/${embedURL}`
    }

    // Support jsFiddle Url:
    if (/^https:\/\/jsfiddle\.net(?:\/[^\s\/]+){2}$/.test(embedURL)) {
        embedURL = `${embedURL}/embedded`
    }

    return {
        src: embedURL,
        height: 400
    }
}
