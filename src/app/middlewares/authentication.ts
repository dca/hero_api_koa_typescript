
import * as Koa from 'koa'
import axios from 'axios'
import proxy from '../proxy'

import * as Debug from 'debug'
const debug = Debug('app:middlewares:authentication')

/**
 * middleware to verify name and password
 * @param name      name from HTTP Header
 * @param password  password from HTTP Header
 * @returns         return ctx.isAuthorized: boolean
 */
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
  try {
    debug('verify %s %s', name, password)
    const verify = await proxy.auth.verify(name, password)
    debug('verify response %j', verify)

    if (verify === 'OK') {
      ctx.isAuthorized = true
    }
  } catch (error) {
    // throw Backend error
    if (error.code === 1000) {
      debug('verify error 1000')
      throw error
    }

    // log or do something
    debug('verify error ', error)
  }
  return await next()
}
