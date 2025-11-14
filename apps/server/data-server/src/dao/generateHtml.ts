import GenerateHtml from '../models/generateHtml'
import { processParams } from '../common'

export default class generateHtmlDao {
  async insert(data: object) {
    const ripeData = await processParams(data, GenerateHtml)
    const generateHtml = new GenerateHtml(ripeData)
    const res = await generateHtml.save()
    return res
  }
  async find() {
    const res = await GenerateHtml.find()
    return res
  }
  async findLatest() {
    const res = await GenerateHtml.findOne().sort({ id: -1 }).limit(1)
    return res
  }
  async update(id: number, data: Object): Promise<any> {
    const res = await GenerateHtml.updateOne({ id }, { ...data })
    return res
  }
}
