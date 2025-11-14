import Component from '../models/component';
import { processParams } from '../common'

export default class ActivityDao {
    async insert(data: object) {
        const ripeData = await processParams(data, Component)
        const activity = new Component(ripeData)
        const res = await activity.save()
        return res
    }
    async find() {
        const res = await Component.find()
        return res;
    }
    async update(id: number, data: Object): Promise<any> {
        const res = await Component.updateOne({ id }, { ...data })
        return res;
    }
    async findOne(id: number) {
        let res = await Component.findOne({ id })
        return res;
    }
    async delete(id: number): Promise<any> {
        let res = await Component.deleteOne({ id })
        return res
    }
}