import Router from '@koa/router'
import ApplicationController from '../controller/application'

const applicationCntl = new ApplicationController()
const router = new Router({
  prefix: '/application',
})

router.post('/', applicationCntl.create)

router.get('/', applicationCntl.getList)

router.post('/update', applicationCntl.update)

router.delete('/delete', applicationCntl.delete)

router.get('/preview/:id', applicationCntl.preview)

router.get('/publish', applicationCntl.publish)

router.get('/:id', applicationCntl.getById)

export default router
