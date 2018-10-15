import express from 'express'
import proxiedHeader from './middlewares/proxied-header'
import main from './routes/main'
import embed from './routes/embed'
import { API_URL } from './env'

const app = express()

app.use(proxiedHeader({
    baseURL: API_URL,
    ignoredHeaders: ['host', 'accept']
}))

app.use(main)
app.use(embed)

export default app
