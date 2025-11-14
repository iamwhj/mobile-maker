import { ParameterizedContext, DefaultContext } from 'koa';
import ComponentDao from '../dao/component';
import { returnBody } from '../utils';
import { Code } from '../common/types';

const componentDao = new ComponentDao()

export default class ActivityControll {
    async create(ctx: ParameterizedContext) {
        const v: DefaultContext = ctx.request;
        const path = v.body.path;
        const name = v.body.name;
        const full_name = v.body.full_name;
        const version = v.body.version;
        const last_version = v.body.last_version;
        const author = v.body.author;
        const priority = v.body.priority;
        const category_id = v.body.category_id;
        const params = { path, name, full_name, version, last_version, author, priority, category_id }
        const data = await componentDao.insert(params)
        ctx.body = returnBody({
            code: Code.SUCCESS,
            message: '插入成功',
            data
        })
    }
    async getList(ctx: ParameterizedContext) {
        const data = await componentDao.find()
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
        const res = await componentDao.update(id, data)
        ctx.body = returnBody({
            code: Code.SUCCESS,
            message: '更新成功',
            data: res
        })
    }
    async delete(ctx: ParameterizedContext) {
        const v: DefaultContext = ctx.request;
        const id = v.query.id;
        const res = await componentDao.delete(id)
        ctx.body = returnBody({
            code: Code.SUCCESS,
            message: '删除成功',
            data: res
        })
    }
}