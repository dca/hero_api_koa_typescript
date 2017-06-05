
import '../init'
import 'mocha'
import axios from 'axios'
import { expect } from 'chai'

import * as Debug from 'debug'
const debug = Debug('app:test:route:heroes:show')

describe('heroes show', () => {
  it('should return object', async () => {
    let { status, data } = await axios.get('http://localhost:8888/heroes/1')
    debug('response %j', data)

    expect(status).to.be.equal(200)
    expect(data).to.a('object')
    // expect(data).to.have.nested.property('id').that.is.a('string')
    // expect(data).to.have.nested.property('name').that.is.a('string')
    // expect(data).to.have.nested.property('image').that.is.a('string')
  })

  it('should return object', async () => {
    let { status, data } = await axios.request({
      url: 'http://localhost:8888/heroes/1',
      method: 'get',
      headers: {
        Name: 'hahow',
        Password: 'rocks'
      }
    })
    debug('response %j', data)

    expect(status).to.be.equal(200)
    expect(data).to.a('object')
  })
})
