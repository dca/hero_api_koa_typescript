
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'

import errorHandler from './middlewares/errorHandler'
import router from './router'

const app = new Koa()

app.use(errorHandler)

app.use(bodyParser())
   .use(router.routes())
   .use(router.allowedMethods())

export default app
