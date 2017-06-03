
import '../init'
import 'mocha'
import axios from 'axios'
import { expect } from 'chai'

describe('heroes list', () => {
  it('should return heroes array', async () => {
    let { status, data } = await axios.get('http://localhost:8888/heroes')
    expect(status).to.be.equal(200)
    expect(data).to.a('array')
  })
})
