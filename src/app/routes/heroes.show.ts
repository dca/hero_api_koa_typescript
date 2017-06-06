
import * as Koa from 'koa'
import axios from 'axios'
import proxy from '../proxy'

import * as Debug from 'debug'
const debug = Debug('app:route:heroes:show')

module.exports = async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {

  const heroId: string = ctx.params.heroId
  let hero = await proxy.heroes.fetchOne(heroId)

  debug('ctx.isAuthorized', ctx.isAuthorized)
  if (ctx.isAuthorized === true) {
    hero = await proxy.heroes.fetchProfile(hero)
  }

  debug('hero %j', hero)
  ctx.body = hero
}
