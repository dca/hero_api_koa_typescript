
import '../init'
import 'mocha'
import axios from 'axios'
import * as sinon from 'sinon'
import { expect } from 'chai'
import services from '../../src/app/services'

import * as Debug from 'debug'
const debug = Debug('app:test:route:heroes:show')

const AXIOS_ALWAYS_RESOLVE = function (status: any) {
  return true
}

describe('heroes show', () => {
  describe('request without auth', () => {
    let stubFetchHero: any

    before(() => {
      stubFetchHero = sinon.stub(services.hahow, 'fetchHeroOne')
      stubFetchHero.resolves({
        id: '1',
        name: 'Daredevil',
        image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg'
      })
    })
    after(() => {
      stubFetchHero.restore()
    })

    it('should return heroes object', async () => {
      let { status, data } = await axios.request({
        url: 'http://localhost:8888/heroes/1',
        method: 'get',
        headers: {},
        validateStatus: AXIOS_ALWAYS_RESOLVE
      })
      debug('status %j', status)
      debug('response %j', data)

      expect(status).to.be.equal(200)
      expect(data).to.a('object')
    })
  })

  describe('request with auth', () => {
    let stubFetchAuth: any
    let stubFetchHero: any
    let stubFetchHeroProfile: any

    before(() => {
      stubFetchAuth = sinon.stub(services.hahow, 'fetchAuth')
      stubFetchAuth.resolves('OK')

      stubFetchHero = sinon.stub(services.hahow, 'fetchHeroAll')
      stubFetchHero.resolves({
        id: '1',
        name: 'Daredevil',
        image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg'
      })

      stubFetchHeroProfile = sinon.stub(services.hahow, 'fetchHeroProfile')
      stubFetchHeroProfile.resolves({
        str: 8,
        int: 2,
        agi: 5,
        luk: 9
      })
    })

    after(() => {
      stubFetchAuth.restore()
      stubFetchHero.restore()
      stubFetchHeroProfile.restore()
    })

    it('should return heroes array include profile', async () => {
      let { status, data } = await axios.request({
        url: 'http://localhost:8888/heroes/1',
        method: 'get',
        headers: {
          Name: 'hahow',
          Password: 'rocks'
        },
        validateStatus: AXIOS_ALWAYS_RESOLVE
      })
      debug('status %j', status)
      debug('response %j', data)

      expect(status).to.be.equal(200)
      expect(data).to.a('object')
    })
  })

  describe('if backend error', () => {
    let stubFetchAuth: any
    let stubFetchHero: any

    before(() => {
      stubFetchAuth = sinon.stub(services.hahow, 'fetchAuth')
      stubFetchAuth.resolves('OK')

      stubFetchHero = sinon.stub(services.hahow, 'fetchHeroProfile')
      stubFetchHero.throws({
        code: 1000,
        message: 'Backend Error'
      })
    })

    after(() => {
      stubFetchAuth.restore()
      stubFetchHero.restore()
    })

    it('should return 500 Backend Error', async () => {
      let { status, data } = await axios.request({
        url: 'http://localhost:8888/heroes/1',
        method: 'get',
        headers: {
          Name: 'hahow',
          Password: 'rocks'
        },
        validateStatus: AXIOS_ALWAYS_RESOLVE
      })
      debug('status %j', status)
      debug('response %j', data)

      expect(status).to.be.equal(500)
      expect(data).to.a('object')
      expect(data.code).to.be.equal(1000)
    })
  })

})
