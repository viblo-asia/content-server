const createRenderer = require('viblo-sdk/markdown').createRenderer;

const md = createRenderer({
    baseURL: process.env.APP_URL
});

module.exports = md;
