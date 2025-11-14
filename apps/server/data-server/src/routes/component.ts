import Router from '@koa/router'
import ComponentControll from '../controller/component'

const componentCntl = new ComponentControll()
const router = new Router({
    prefix: '/component'
})

router.post('/', componentCntl.create)

router.get('/', componentCntl.getList)

router.post('/update', componentCntl.update)

router.delete('/delete', componentCntl.delete)

export default router;