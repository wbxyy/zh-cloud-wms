import service from '@/utils/request'
import { mapRequest, mapResponse, transformData, transformSelect, getSampleMapping } from '@/utils/sugar'
import { getDicts } from '@/api/system/dict/data'
import {
  sampleStoreInList,
  sampleStoreInDelete,
  sampleStoreIn,
  sampleStoreInUpdate,
  sampleStoreInUpdateDetail,
  sampleWarehousePositions,
  sampleStoreInCreate,
  sampleWarehouseList,
  sampleCustomerList,
  sampleStoreInAudit,
  sampleStoreInReject
} from './sample'

const dict = getDicts('store_in_schema').then(res => res.data)

function getSchema(pairSample) {
  return {
    request: dict.then(res => getSampleMapping(res, pairSample.request)),
    response: dict.then(res => getSampleMapping(res, pairSample.response)),
    sample: pairSample.request
  }
}

// 构造新实例
const request = service.extend(service.defaults)

// 请求拦截器=》放在1号位
request.interceptors.request.use(async config => {
  // ? 允许重复提交
  // config.headers.repeatSubmit = false

  const schema = config.schema
  if (schema) {
    config.data = mapRequest(config.data, await schema.request)
    config.data = transformData(config.data, schema.sample)
  }
  config.data = transformSelect(config.data)

  return config
})

// 响应拦截器=》放在1号位
request.interceptors.response.unshift(async res => {
  const schema = res.config.schema
  if (schema) {
    res.data = mapResponse(res.data, await schema.response)
  }
  return res
})

// ? 货物入仓->入仓单table:查询入仓单列表
export function storeInList({ data, params }) {
  return request({
    url: '/storage/hwrc/list',
    method: 'post',
    data,
    params,
    schema: getSchema(sampleStoreInList)
  })
}

// ?删除入仓单
export function storeInDelete(data) {
  return request({
    url: '/storage/hwrc/del',
    method: 'post',
    data,
    schema: getSchema(sampleStoreInDelete)
  })
}

// ?获取入仓单详情
export function storeIn(dzid) {
  const shztn = 0
  return request({
    url: `/storage/hwrc/detail/${dzid}/${shztn}`,
    method: 'post',
    schema: getSchema(sampleStoreIn)
  })
}

// ? 入仓单修改(外围)
export function storeInUpdate(data) {
  return request({
    url: `/storage/hwrc/modifyInfo`,
    method: 'post',
    data,
    schema: getSchema(sampleStoreInUpdate)
  })
}

// ?入仓单修改（明细）
export function storeInUpdateDetail(data) {
  return request({
    url: `/storage/hwrc/modify`,
    method: 'post',
    data,
    headers: {
      repeatSubmit: false
    },
    schema: getSchema(sampleStoreInUpdateDetail)
  })
}

// ? 货物入仓->仓位下拉：根据仓库id获取仓位列表
export function warehousePositions(warehouseId) {
  return request({
    url: `/storage/category/selectPosition/${warehouseId}`,
    method: 'post',
    headers: {
      repeatSubmit: false
    },
    schema: getSchema(sampleWarehousePositions)
  })
}

// ? 货物入仓->添加入仓单
export function storeInCreate(data) {
  return request({
    url: `/storage/hwrc/add`,
    method: 'post',
    data,
    schema: getSchema(sampleStoreInCreate)
  })
}

// ? 货物入仓->仓库下拉/选择仓库：获取仓库列表
//! 设置默认值防止解构undefined报错
export function warehouseList({ data, params } = {}) {
  const _data = {
    'all': '',
    'khmc': '',
    'khpb': 0,
    'name': '',
    'num': '',
    'shopId': 0,
    'spckid': '',
    'spckidis': []
  }
  const _params = {
    pageNum: 1,
    pageSize: 100000
  }
  return request({
    url: `/storage/zdspck/selectWarehouse1`,
    method: 'post',
    data: Object.assign(_data, data),
    params: Object.assign(_params, params),
    schema: getSchema(sampleWarehouseList)
  })
}
// ? 货物入仓->添加入仓单：获取客户列表
export function customerList({ data, params } = {}) {
  const _data = {
    'all': '',
    'khmc': '',
    'khpb': 0,
    'name': '',
    'num': '',
    'shopId': 0,
    'spckid': '',
    'spckidis': []
  }
  const _params = {
    pageNum: 1,
    pageSize: 100000
  }
  return request({
    url: '/storage/shop/selectCustomer',
    method: 'post',
    data: Object.assign(_data, data),
    params: Object.assign(_params, params),
    schema: getSchema(sampleCustomerList)
  })
}

// 入仓单审核
export function storeInAudit(data) {
  return request({
    url: `/storage/hwrc/audit`,
    method: 'post',
    data,
    schema: getSchema(sampleStoreInAudit)
  })
}

// 入仓单驳回
export function storeInReject(id) {
  return request({
    url: `/storage/hwrc/reject/${id}`,
    method: 'post',
    schema: getSchema(sampleStoreInReject)
  })
}
