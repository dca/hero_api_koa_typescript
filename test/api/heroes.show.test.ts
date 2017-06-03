
import '../init'
import 'mocha'
import axios from 'axios'
import { expect } from 'chai'

describe('heroes show', () => {
  it('should return object', async () => {
    let { status, data } = await axios.get('http://localhost:8888/heroes/1')
    expect(status).to.be.equal(200)
    expect(data).to.a('object')
    // expect(data).to.have.nested.property('id').that.is.a('string')
    // expect(data).to.have.nested.property('name').that.is.a('string')
    // expect(data).to.have.nested.property('image').that.is.a('string')
  })
})
