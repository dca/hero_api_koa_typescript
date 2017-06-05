
import * as Router from 'koa-router'
import authentication from './middlewares/authentication'

const router = new Router()

router.get('/heroes', authentication, require('./routes/heroes.list'))
router.get('/heroes/:heroId', authentication, require('./routes/heroes.show'))

export default router
