const createRenderer = require('viblo-sdk/markdown').createRenderer

const md = createRenderer({
    baseURL: process.env.APP_URL,
    maxSize: 500,
    maxExpand: 100,
    maxCharacter: 1000,
})

module.exports = md
