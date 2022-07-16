import request from '@/utils/request'
// ? 货物入仓->入仓单table:查询入仓单列表
export function categoryDropdown() {
  return request({
    url: '/storage/category/detailsDropDown1',
    method: 'post'
  })
}
