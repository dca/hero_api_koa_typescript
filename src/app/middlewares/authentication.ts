
import * as Koa from 'koa'
import axios from 'axios'

import * as Debug from 'debug'
const debug = Debug('app:middlewares:authentication')

// middleware
export default async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {
  //
  ctx.isAuthorized = false

  let name = ctx.request.headers.name
  let password = ctx.request.headers.password
  debug('check auth', name, password)

  // no name or password, skip
  if (!name || !password) {
    return await next()
  }

  // call auth api
  let { status, data } = await axios.post('http://hahow-recruit.herokuapp.com/auth', {
    name: name,
    password: password
  })

  debug('response %j', data)
  // TODO 200, error {"code":1000,"message":"Backend Error"}
  // TODO 200, "OK"

  //
  if (status === 200 && data === 'OK') {
    ctx.isAuthorized = true
  }
  return await next()
}
