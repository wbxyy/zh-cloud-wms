import request from '@/utils/request'

// 查询企业会员列表
export function listShop(query) {
  return request({
    url: '/storage/shop/list',
    method: 'post',
    data: query
  })
}

// 查询企业会员详细
export function getShop(id) {
  return request({
    url: '/storage/shop/' + id,
    method: 'post'
  })
}

// 新增企业会员
export function addShop(data) {
  return request({
    url: '/storage/shop',
    method: 'post',
    data: data
  })
}

// 修改企业会员
export function updateShop(data) {
  return request({
    url: '/storage/shop',
    method: 'put',
    data: data
  })
}

// 删除企业会员
export function delShop(id) {
  return request({
    url: '/storage/shop/' + id,
    method: 'delete'
  })
}
