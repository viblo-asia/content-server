const app = require('express')();
const router = require('./router');
const axios = require('viblo-sdk/libs/axios').default;
const _omitBy = require('lodash.omitby')

require('dotenv').config();

axios.defaults.baseURL = process.env.API_URL;

const ignoredHeaders = ['host', 'accept'];

app.use(function (req, res, next) {
    const proxiedHeader = _omitBy(req.headers, (value, key) => ignoredHeaders.includes(key.toLowerCase()));
    axios.defaults.headers.common = {
        'Accept': 'application/json, text/plain, */*',
        ...proxiedHeader
    }
    next();
});

app.use(router);

app.listen(process.env.PORT);
