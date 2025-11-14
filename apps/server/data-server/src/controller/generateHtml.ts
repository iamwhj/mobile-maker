import { ParameterizedContext, DefaultContext } from 'koa'
import GenerateHtmlDao from '../dao/generateHtml'
import { returnBody } from '../utils'
import { Code } from '../common/types'

const generateHtmlDao = new GenerateHtmlDao()

export default class GenerateHtmlControll {
  async create(ctx: ParameterizedContext) {
    const v: DefaultContext = ctx.request
    const html = v.body.html
    const params = { html }
    const data = await generateHtmlDao.insert(params)
    ctx.body = returnBody({
      code: Code.SUCCESS,
      message: '插入成功',
      data,
    })
  }
  async getHtml(ctx: ParameterizedContext) {
    const data = await generateHtmlDao.findLatest()
    ctx.body = returnBody({
      code: Code.SUCCESS,
      message: '查询成功',
      data,
    })
  }
  async getList(ctx: ParameterizedContext) {
    const data = await generateHtmlDao.find()
    ctx.body = returnBody({
      code: Code.SUCCESS,
      message: '查询成功',
      data,
    })
  }
}
