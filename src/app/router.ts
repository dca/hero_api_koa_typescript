
import * as Router from 'koa-router'

const router = new Router()

router.get('/heroes', require('./routes/heroes.list'))
router.get('/heroes/:heroId', require('./routes/heroes.show'))

export default router
