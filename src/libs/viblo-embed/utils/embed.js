export const renderEmbed = (attrs = {}, options = {})  => {
    const iframeAttrs = Object.keys(attrs)
        .map((key) => {
            const value = attrs[key]

            return value === true ? key : `${key}="${attrs[key]}"`
        })
        .join(' ')

    const iframeClassAttr = options.iframeClass ? `class="${options.iframeClass}"` : ''
    const iframe = `<iframe ${iframeClassAttr} ${iframeAttrs}></iframe>`
    const wrapperClassAttr = options.wrapperClass ? `class="${options.wrapperClass}"` : ''

    return `<div ${wrapperClassAttr}>${iframe}</div>`
}
