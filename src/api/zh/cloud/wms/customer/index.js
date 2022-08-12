import { request, getSchema } from '@api/wms/request'
import {
  sampleCustomerStoreIn,
  sampleCustomerStoreOutPlain,
  sampleCustomerStoreOut,
  sampleCustomerStoreMove
} from './sample'

// ? 货物入仓->添加入仓单：获取客户列表
export function customerStoreIn({ data, params } = {}) {
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
    schema: getSchema(sampleCustomerStoreIn)
  })
}

// ? 现场出仓
export function customerStoreOut({ data, params } = {}) {
  const _params = {
    pageNum: 1,
    pageSize: 100000
  }
  const _data = {
    'isBa': '',
    'khmc': '',
    'khpb': 0,
    'shopId': 0,
    'spckid': '',
    'spckidis': []
  }
  return request({
    url: '/storage/hwcc/selectCustomer',
    method: 'post',
    data: Object.assign(_data, data),
    params: Object.assign(_params, params),
    schema: getSchema(sampleCustomerStoreOut)
  })
}

// 选择客户
// ?现场出仓/选择旧货权人
export function customerStoreOutPlain() {
  return request({
    url: `/storage/shop/selectClient`,
    method: 'post',
    schema: getSchema(sampleCustomerStoreOutPlain)
  })
}

// ? 现场调仓
export function customerStoreMove({ data, params } = {}) {
  const _params = {
    pageNum: 1,
    pageSize: 100000
  }
  const _data = {
    'isBa': '',
    'khmc': '',
    'khpb': 0,
    'shopId': 0,
    'spckidis': [],
    'spckmc': '',
    'spgh': ''
  }
  return request({
    url: '/storage/hwtc/toCAW',
    method: 'post',
    data: Object.assign(_data, data),
    params: Object.assign(_params, params),
    schema: getSchema(sampleCustomerStoreMove)
  })
}
