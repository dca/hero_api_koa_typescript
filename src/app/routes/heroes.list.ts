
import * as Koa from 'koa'
import axios from 'axios'

module.exports = async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {

  let { data } = await axios.get('http://hahow-recruit.herokuapp.com/heroes')
  // TODO 錯誤處理

  if (ctx.isAuthorized === true) {

    let heroes: any = data

    heroes.map(async (hero: any) => {
      //
      let { data } = await axios.request({
        url: `http://hahow-recruit.herokuapp.com/heroes/${hero.id}/profile`,
        method: 'get',
        headers: {
          Name: ctx.request.headers.name,
          Password: ctx.request.headers.password
        }
      })
      hero.profile = data
      return hero
    })
  }

  ctx.body = data
}
