import _omitBy from 'lodash.omitby'
import { default as axios } from 'viblo-sdk/libs/axios'

export default ({ baseURL = '/', ignoredHeaders = [] }) => {
    axios.defaults.baseURL = baseURL

    return (req, res, next) => {
        const proxiedHeader = _omitBy(req.headers, (value, key) => ignoredHeaders.includes(key.toLowerCase()))

        axios.defaults.headers.common = {
            'Accept': 'application/json, text/plain, */*',
            ...proxiedHeader
        }

        next()
    }
}
