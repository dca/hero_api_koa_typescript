
import app from './app/app'

const port = process.env.PORT || 5555

app.listen(port, () => console.log(`Listening on port ${port}`))
