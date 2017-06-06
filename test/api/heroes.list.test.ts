
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

describe('heroes list', () => {

  describe('request without auth', () => {
    let stubFetchHeroAll: any

    before(() => {
      stubFetchHeroAll = sinon.stub(services.hahow, 'fetchHeroAll')
      stubFetchHeroAll.resolves([
        { id: '1',
          name: 'Daredevil',
          image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg' },
        { id: '2',
          name: 'Thor',
          image: 'http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg' }
      ])
    })
    after(() => {
      stubFetchHeroAll.restore()
    })

    it('should return heroes array', async () => {
      let { status, data } = await axios.request({
        url: 'http://localhost:8888/heroes',
        method: 'get',
        headers: {},
        validateStatus: AXIOS_ALWAYS_RESOLVE
      })
      debug('status %j', status)
      debug('response %j', data)

      expect(status).to.be.equal(200)
      expect(data).to.a('array')
    })
  })

  describe('request with auth', () => {
    let stubFetchAuth: any
    let stubFetchHeroAll: any
    let stubFetchHeroProfile: any

    before(() => {
      stubFetchAuth = sinon.stub(services.hahow, 'fetchAuth')
      stubFetchAuth.resolves('OK')

      stubFetchHeroAll = sinon.stub(services.hahow, 'fetchHeroAll')
      stubFetchHeroAll.resolves([
        { id: '1',
          name: 'Daredevil',
          image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg' },
        { id: '2',
          name: 'Thor',
          image: 'http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg' }
      ])

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
      stubFetchHeroAll.restore()
      stubFetchHeroProfile.restore()
    })

    it('should return heroes array include profile', async () => {
      let { status, data } = await axios.request({
        url: 'http://localhost:8888/heroes',
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
      expect(data).to.a('array')
    })
  })

  describe('if backend error', () => {
    let stubFetchAuth: any
    let stubFetchHeroAll: any

    before(() => {
      stubFetchAuth = sinon.stub(services.hahow, 'fetchAuth')
      stubFetchAuth.resolves('OK')

      stubFetchHeroAll = sinon.stub(services.hahow, 'fetchHeroAll')
      stubFetchHeroAll.throws({
        code: 1000,
        message: 'Backend Error'
      })
    })

    after(() => {
      stubFetchAuth.restore()
      stubFetchHeroAll.restore()
    })

    it('should return 500 Backend Error', async () => {
      let { status, data } = await axios.request({
        url: 'http://localhost:8888/heroes',
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
