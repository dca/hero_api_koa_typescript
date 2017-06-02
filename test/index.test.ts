
import app from '../src/index'
import { expect } from 'chai'
import 'mocha'

describe('app', () => {
  it('should return app object', () => {
    expect(app).to.a('object')
  })
})
