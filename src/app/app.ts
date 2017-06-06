
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

/*
*
*/
import * as Debug from 'debug'
const debug = Debug('app:onerror')

app.on('error', (err: any, ctx: Koa.Context) => {
    // TODO log or doSomething
  debug(err)
})
