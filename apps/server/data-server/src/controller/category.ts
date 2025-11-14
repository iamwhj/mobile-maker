import { ParameterizedContext, DefaultContext } from 'koa';
import CategoryDao from '../dao/category';
import { returnBody } from '../utils';
import { Code } from '../common/types';

const categoryDao = new CategoryDao()

export default class ActivityControll {
    async create(ctx: ParameterizedContext) {
        const v: DefaultContext = ctx.request;
        const name = v.body.name;
        const priority = v.body.priority;
        const params = { name, priority }
        const data = await categoryDao.insert(params)
        ctx.body = returnBody({
            code: Code.SUCCESS,
            message: '插入成功',
            data
        })
    }
    async getList(ctx: ParameterizedContext) {
        const data = await categoryDao.find()
        ctx.body = returnBody({
            code: Code.SUCCESS,
            message: '查询成功',
            data
        })
    }
    async update(ctx: ParameterizedContext) {
        const v: DefaultContext = ctx.request;
        const id = v.body.id;
        const data = v.body.data;
        const res = await categoryDao.update(id, data)
        ctx.body = returnBody({
            code: Code.SUCCESS,
            message: '更新成功',
            data: res
        })
    }
    async delete(ctx: ParameterizedContext) {
        const v: DefaultContext = ctx.request;
        const id = v.query.id;
        const res = await categoryDao.delete(id)
        ctx.body = returnBody({
            code: Code.SUCCESS,
            message: '删除成功',
            data: res
        })
    }
}