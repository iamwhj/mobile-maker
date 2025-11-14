import Router from '@koa/router'
import GenerateHtmlControll from '../controller/generateHtml'

const generateHtmlCntl = new GenerateHtmlControll()
const router = new Router({
  prefix: '/generateHtml',
})

router.post('/', generateHtmlCntl.create)

router.get('/', generateHtmlCntl.getHtml)

router.get('/getList', generateHtmlCntl.getList)

export default router
