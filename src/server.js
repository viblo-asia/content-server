const app = require('express')();
const router = require('./router');
const axios = require('viblo-sdk/libs/axios').default;

require('dotenv').config();

axios.defaults.baseURL = process.env.API_URL;

app.use(function (req, res, next) {
    axios.defaults.headers.commoon = req.headers;
    next();
});

app.use(router);

app.listen(process.env.PORT);
