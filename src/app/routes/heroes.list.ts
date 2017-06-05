
import * as Koa from 'koa'
import axios from 'axios'
import proxy from '../proxy'

import * as Debug from 'debug'
const debug = Debug('app:route:heroes:list')

module.exports = async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {

  let heroes = await proxy.heroes.fetchAll()

  debug('ctx.isAuthorized', ctx.isAuthorized)
  if (ctx.isAuthorized === true) {
    heroes = await proxy.heroes.fetchAllProfile(heroes)
  }

  ctx.body = heroes
}
