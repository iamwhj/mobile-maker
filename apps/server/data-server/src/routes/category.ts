import Router from '@koa/router'
import CategoryControll from '../controller/category'

const categoryCntl = new CategoryControll()
const router = new Router({
    prefix: '/category'
})

router.post('/', categoryCntl.create)

router.get('/', categoryCntl.getList)

router.post('/update', categoryCntl.update)

router.delete('/delete', categoryCntl.delete)

export default router;