import axios from '@/utils/axios'

const baseURl = '/visit'

export const getVisitList = (params) => {
  return axios.get(baseURl, { params })
}

export const updateVisitNew = () => {
  return axios.get(baseURl + '/user')
}

export const updateVisitOld = () => {
  return axios.get(baseURl + '/returned')
}
