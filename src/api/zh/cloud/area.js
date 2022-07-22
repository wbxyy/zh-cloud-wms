import request from '@/utils/request'

export function getArea(params) {
  return request({
    url: '/storage/category/provinceCityDistrict',
    params
  })
}
