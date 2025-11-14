import mongoose from 'mongoose';
import dayjs from 'dayjs';

// 创建Schema和Model
export const createSchemaModel = (cname: string, field: object) => {
    // 给每个model扩展公共field
    const extendFields = {
        id: Number,
        create_time: String
    }
    field = Object.assign(field, extendFields)

    const schema = new mongoose.Schema(field, { collection: cname, versionKey: false });
    const model = mongoose.model(cname, schema);
    return model
}

// 获取自增ID的值
export const getIncID = async (model: any) => {
    const newUsedId = await model.findOne().sort({_id: -1})
    const incID = newUsedId?.id || 0
    return incID + 1
}

// 组合创建的数据model参数
export const processParams = async (params: Object, model: any) => {
    // 填入扩展字段的值
    const extendFields = {
        id: await getIncID(model),
        create_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    const ripeParams = Object.assign(params, extendFields)
    return ripeParams;
}