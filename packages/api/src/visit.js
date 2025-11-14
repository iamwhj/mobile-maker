import { request } from '@mk/utils'

const baseURl = '/visit'

export const getVisitList = (params) => {
  return request.get(baseURl, { params })
}

export const updateVisitNew = () => {
  return request.get(baseURl + '/user')
}

export const updateVisitOld = () => {
  return request.get(baseURl + '/returned')
}
