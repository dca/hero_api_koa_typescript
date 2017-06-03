
import app from '../src/app/app'
import { expect } from 'chai'
import 'mocha'
import './init'

before(function (done) {
  //
  const TESTING_PORT = process.env.PORT || 8888

  //
  app.listen(TESTING_PORT, done)
})
