
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'

import router from '../routes'

const app = new Koa()

app.use(bodyParser())
   .use(router.routes())
   .use(router.allowedMethods())

export default app