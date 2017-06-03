
import '../init'
import app from '../../src/app/app'
import { expect } from 'chai'
import 'mocha'

describe('app', () => {
  it('should return app object', () => {
    expect(app).to.a('object')
  })
})
