
import * as Koa from 'koa'
import axios from 'axios'
import * as proxy from '../proxy'

import * as Debug from 'debug'
const debug = Debug('app:middlewares:errorHandler')

// middleware
export default async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {
  try {
    await next()
  } catch (err) {
    debug('new error')
    let error = err
    let status = error.status || 500
    let message = error.message || 'server error'

    // ensure is Error
    if (!(error instanceof Error)) {
      const originalError = err
      error = new Error(message)
      error.code = error.code
      error.originalError = originalError
    }

    // set response
    ctx.status = status
    ctx.body = error

    // emit error event, for log or something
    if (status === 500) {
      ctx.app.emit('error', error, ctx)
    }
    return
  }
}
