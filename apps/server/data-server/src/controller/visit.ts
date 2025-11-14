import { ParameterizedContext, DefaultContext } from 'koa';
import VisitDao from '../dao/visit';
import { returnBody } from '../utils';
import { Code } from '../common/types';

const visitDao = new VisitDao()

export default class VisitControll {
    async getList(ctx: ParameterizedContext) {
        const data = await visitDao.find()
        ctx.body = returnBody({
            code: Code.SUCCESS,
            message: '查询成功',
            data
        })
    }
    async update(ctx: ParameterizedContext, type: String) {
        // 表不存在则新建
        let record: any = await visitDao.find();
        if (!record || !record.length) record = await visitDao.insert({ user: 0, returned: 0 });
        record = Array.isArray(record) ? record[0] : record;

        const id = 1;
        const data: any = {};
        if (type === 'new') {
            data.user = record.user + 1;
        } else {
            data.returned = record.returned + 1;
        }
        const res = await visitDao.upd(id, data)
        ctx.body = returnBody({
            code: Code.SUCCESS,
            message: '更新成功',
            data: res
        })
    }
}