
import * as Koa from 'koa'
import axios from 'axios'

module.exports = async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {

  let { data } = await axios.get('http://hahow-recruit.herokuapp.com/heroes/1')
  ctx.body = data
}
