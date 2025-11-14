import Visit from '../models/visit';
import { processParams } from '../common'

export default class VisitDao {
    async insert(data: object) {
        const ripeData = await processParams(data, Visit)
        const visit = new Visit(ripeData)
        const res = await visit.save()
        return res
    }
    async find() {
        const res = await Visit.find()
        return res;
    }
    async upd(id: number, data: Object): Promise<any> {
        const res = await Visit.updateOne({ id }, { ...data })
        return res;
    }
}