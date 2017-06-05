
import * as heroes from './heroes'
import * as auth from './auth'

export interface IProxy {
  heroes: any,
  auth: any
}

const proxy: IProxy = {
  heroes,
  auth
}

export default proxy
