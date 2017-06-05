
import axios from 'axios'

import * as Debug from 'debug'
const debug = Debug('app:services:hahow')

// fetchHeroOne
export async function fetchHeroOne (id: string): Promise<any > {
  let { data, status } = await axios.request({
    url: `http://hahow-recruit.herokuapp.com/heroes/${id}`,
    method: 'get'
  })
  debug('fetchHeroOne %s %j', id, data)
  if (data.code === 1000) {
    throw data
  }
  return data
}

// fetchHeroProfile
export async function fetchHeroProfile (id: string): Promise<any > {
  let { data, status } = await axios.request({
    url: `http://hahow-recruit.herokuapp.com/heroes/${id}/profile`,
    method: 'get'
  })
  debug('fetchHeroProfile %s %j', id, data)
  if (data.code === 1000) {
    throw data
  }
  return data
}

// fetchHeroAll
export async function fetchHeroAll (): Promise<any > {
  let { data, status } = await axios.request({
    url: `http://hahow-recruit.herokuapp.com/heroes`,
    method: 'get'
  })
  debug('fetchHeroAll %j', data)
  if (data.code === 1000) {
    throw data
  }
  return data
}

// fetchAuth
export async function fetchAuth (name: string, password: string): Promise<any > {
  let { data, status } = await axios.request({
    url: 'http://hahow-recruit.herokuapp.com/auth',
    method: 'post',
    data: {
      name,
      password
    }
  })
  debug('fetchAuth %j', data)
  if (data.code === 1000) {
    throw data
  }
  return data
}
