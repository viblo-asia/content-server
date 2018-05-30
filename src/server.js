const app = require('express')();
const main = require('./routes/main');
const embed = require('./routes/embed');
const axios = require('viblo-sdk/libs/axios').default;
const _omitBy = require('lodash.omitby');

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

app.use(main);
app.use(embed);

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Applciation listening on port ${port}`)
});
