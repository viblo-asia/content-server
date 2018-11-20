export default (code) => {
    let embedURL = code.replace(/^\/+|\/+$/gm, '')
        .replace(/(^http[s]?:\/\/(?:www\.)?jsfiddle.net\/)|(^jsfiddle.net\/)/, 'https://jsfiddle.net/')
        .replace(/\/embed(\/|\/.+)?$/, '/embedded$1')

    if (!embedURL.startsWith('https://jsfiddle.net/')) {
        embedURL = `https://jsfiddle.net/${embedURL}`
    }

    if (!embedURL.match(/(\/embedded)/)) {
        embedURL = `${embedURL}/embedded/`
    }

    return {
        src: embedURL,
        height: 400
    }
}
