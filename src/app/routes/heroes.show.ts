
import * as Koa from 'koa'
import axios from 'axios'
import * as proxy from '../proxy'

import * as Debug from 'debug'
const debug = Debug('app:route:heroes:show')

module.exports = async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {

  let response = await axios.get('http://hahow-recruit.herokuapp.com/heroes/1')
  // TODO 錯誤處理

  debug('response.status', response.status)
  debug('response.data', response.data)

  if (ctx.isAuthorized === true) {
    let { status, data } = await axios.request({
      url: 'http://hahow-recruit.herokuapp.com/heroes/1/profile',
      method: 'get',
      headers: {
        Name: ctx.request.headers.name,
        Password: ctx.request.headers.password
      }
    })
    // TODO 錯誤處理
    response.data.profile = data
  }
  ctx.body = response.data
}
