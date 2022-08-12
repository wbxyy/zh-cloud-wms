import service from '@/utils/request'
import { transformData, transformSelect } from '@/utils/sugar'
import { createMapping } from '@/utils/createMapping'
import {
  sampleSelectStock
} from './sample'

import _ from 'lodash'

function getSchema(samplePair) {
  return {
    mapRequest: createMapping().then(map => map(_, samplePair.request)),
    mapResponse: createMapping('response').then(map => map(_, samplePair.response)),
    sample: samplePair.request
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
    config.data = (await schema.mapRequest)(config.data)
    config.data = transformData(config.data, schema.sample)
  }
  config.data = transformSelect(config.data)

  return config
})

// 响应拦截器=》放在1号位
request.interceptors.response.unshift(async res => {
  const schema = res.config.schema
  if (schema) {
    res.data = (await schema.mapResponse)(res.data)
  }
  return res
})

// ? 货物调仓=>选择库存
export function selectStock({ data, params } = {}) {
  // 模拟请求数据
  const _params = {
    pageNum: 1,
    pageSize: 100000
  }
  return request({
    url: '/storage/hwtc/toKC',
    method: 'post',
    data,
    params: Object.assign(_params, params),
    schema: getSchema(sampleSelectStock)
  })
}

// const queryParams = {
//   'ckid': '72',
//   'inp': [],
//   'isBa': '',
//   'khlx': '',
//   'khmc': '',
//   'khmcid': '',
//   'khpb': 0,
//   'liid_1': 1246,
//   'shopId': 0,
//   'spbh': '',
//   'spcd': '',
//   'spckidis': [],
//   'spcwid2': 1246,
//   'spgh': '',
//   'spmc': '',
//   'sptm': '',
//   'spzs': ''
// }

const queryParams = {
  '$skuNo': null,
  '$shipNo': null,
  '$batchNo': null,
  'specification': null,
  'skuName': null,
  'brand': null,
  'btnCustomerWarehouse': null,
  'customerName': '中国国投国际贸易广州有限公司',
  'warehouse': '中恒塱宝仓',
  '$warehouseId': '72',
  'position': 'A106',
  '$positionId': 1248,
  '$newPositionId': 1248,
  '$customerId': '130',
  'stock': null,
  'movingType': null,
  'billRemark': null,
  'list': []
}

selectStock({
  params: {
    pageNum: 1,
    pageSize: 15
  },
  data: queryParams
}).then(res => {
  console.log(res)
})
