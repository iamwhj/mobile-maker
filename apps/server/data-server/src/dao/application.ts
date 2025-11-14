import Application from '../models/application'
import { processParams } from '../common'
import { Paging } from '../common/types'
import { generateHtml } from '../utils/generate'

export default class ApplicationDao {
  async insert(data: object) {
    const ripeData = await processParams(data, Application)
    const application = new Application(ripeData)
    const res = await application.save()
    return res
  }
  async find(data: Paging) {
    // 分页(页码，条数)，不传返回全部
    let skip = (data.pageNum - 1) * data.pageSize || 0
    let limt = data.pageSize || 0
    let list = await Application.find().skip(skip).limit(limt)
    // 总条数
    let count = await Application.find().countDocuments()
    return { data: list, count }
  }
  async update(id: number, data: Object): Promise<any> {
    const res = await Application.updateOne({ id }, { ...data })
    return res
  }
  async findOne(id: number) {
    let res = await Application.findOne({ id })
    return res
  }
  async delete(id: number): Promise<any> {
    let res = await Application.deleteOne({ id })
    return res
  }
  async preview(id: number) {
    const application = await this.findOne(id)
    const htmlStr = await generateHtml(application)
    return htmlStr
  }
  async publish(id: number) {
    const application = await this.findOne(id)
    const htmlStr = generateHtml(application, true)
    return htmlStr
  }
}
