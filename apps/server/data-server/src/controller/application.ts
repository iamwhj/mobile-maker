import { ParameterizedContext, DefaultContext } from 'koa'
import ApplicationDao from '../dao/application'
import { returnBody } from '../utils'
import { Code } from '../common/types'

const applicationDao = new ApplicationDao()

export default class ApplicationControll {
  async create(ctx: ParameterizedContext) {
    const v: DefaultContext = ctx.request
    const name = v.body.name
    const time = v.body.time
    const creator = v.body.creator
    const publisher = v.body.publisher
    const publisher_time = v.body.publisher_time
    const status = v.body.status
    const page = v.body.page
    const params = { name, time, creator, publisher, publisher_time, status, page }
    const data = await applicationDao.insert(params)
    ctx.body = returnBody({
      code: Code.SUCCESS,
      message: '插入成功',
      data,
    })
  }
  async getList(ctx: ParameterizedContext) {
    const v: DefaultContext = ctx.request
    const pageNum = v.body.pageNum
    const pageSize = v.body.pageSize
    const params = { pageNum, pageSize }
    const data = await applicationDao.find(params)
    ctx.body = returnBody({
      code: Code.SUCCESS,
      message: '查询成功',
      data,
    })
  }
  async update(ctx: ParameterizedContext) {
    const v: DefaultContext = ctx.request
    const id = v.body.id
    const data = v.body.data
    const res = await applicationDao.update(id, data)
    ctx.body = returnBody({
      code: Code.SUCCESS,
      message: '更新成功',
      data: res,
    })
  }
  async delete(ctx: ParameterizedContext) {
    const v: DefaultContext = ctx.request
    const id = v.query.id
    const res = await applicationDao.delete(id)
    ctx.body = returnBody({
      code: Code.SUCCESS,
      message: '删除成功',
      data: res,
    })
  }
  async preview(ctx: ParameterizedContext) {
    const v: DefaultContext = ctx.request
    const id = v.params.id
    const res = await applicationDao.preview(Number(id))
    ctx.body = res
  }
  async publish(ctx: ParameterizedContext) {
    const v: DefaultContext = ctx.request
    const id = v.query.id
    const res = await applicationDao.publish(Number(id))
    ctx.body = returnBody({
      code: Code.SUCCESS,
      message: `ID为${id}的活动发布成功`,
      data: res,
    })
  }
  async getById(ctx: ParameterizedContext) {
    const v: DefaultContext = ctx.request
    const id = v.params.id
    const res = await applicationDao.findOne(id)
    ctx.body = returnBody({
      code: Code.SUCCESS,
      message: '查询成功',
      data: res,
    })
  }
}
