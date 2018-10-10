import app from './app'
import { PORT } from './env'

app.listen(PORT, () => {
    console.log(`Application is running at port ${PORT}...`)
})
