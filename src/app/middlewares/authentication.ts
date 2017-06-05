
import * as Koa from 'koa'
import axios from 'axios'
import proxy from '../proxy'

import * as Debug from 'debug'
const debug = Debug('app:middlewares:authentication')

export default async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {
  // default isAuthorized = false
  ctx.isAuthorized = false

  //
  let name = ctx.request.headers.name
  let password = ctx.request.headers.password

  // empty name or password, skip
  if (!name || !password) {
    return await next()
  }

  // verify name and password
  const verify = await proxy.auth.verify(name, password)
  debug('verify response %j', verify)

  if (verify === 'OK') {
    ctx.isAuthorized = true
  }
  return await next()
}
