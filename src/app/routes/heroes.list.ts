
import * as Koa from 'koa'

module.exports = async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {
  ctx.body = 'Hello world'
}
