import { ParameterizedContext } from 'koa'
import Router from '@koa/router'
import VisitControll from '../controller/visit'

const visitCntl = new VisitControll()
const router = new Router({
    prefix: '/visit'
})

router.get('/', visitCntl.getList)

router.get('/user', (ctx: ParameterizedContext) => visitCntl.update(ctx, 'new'))

router.get('/returned', (ctx: ParameterizedContext) => visitCntl.update(ctx, 'old'))


export default router;