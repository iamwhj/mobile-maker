import Category from '../models/category';
import { processParams } from '../common'

export default class ActivityDao {
    async insert(data: object) {
        const ripeData = await processParams(data, Category)
        const activity = new Category(ripeData)
        const res = await activity.save()
        return res
    }
    async find() {
        const res = await Category.find()
        return res;
    }
    async update(id: number, data: Object) {
        const res = await Category.updateOne({ id }, { ...data })
        return res;
    }
    async findOne(id: number) {
        let res = await Category.findOne({ id })
        return res;
    }
    async delete(id: number) {
        let res = await Category.deleteOne({ id })
        return res
    }
}