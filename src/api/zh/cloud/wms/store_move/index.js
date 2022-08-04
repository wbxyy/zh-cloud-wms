import service from '@/utils/request'
import { mapRequest, mapResponse, transformData, transformSelect, getSampleMapping } from '@/utils/sugar'
import { getDicts } from '@/api/system/dict/data'
import {
  sampleStoreMoveList,
  sampleStoreMoveDelete,
  sampleStoreMove,
  sampleStoreMoveUpdateDetail,
  sampleStoreMoveCreate,
  sampleSelectStock,
  sampleCustomerList,
  sampleStoreMoveAudit,
  sampleStoreMoveReject,
  sampleStoreMoveOverview,
  sampleStoreMoveOverviewDeleted,
  sampleStoreMoveOverviewExport,
  sampleSelectPosition
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

/*
* 入仓单的接口总览
*/

// ? 调仓单列表
export function storeMoveList({ data, params }) {
  return request({
    url: '/storage/hwtc/list',
    method: 'post',
    data,
    params,
    schema: getSchema(sampleStoreMoveList)
  })
}

// ?删除调仓单sku(编辑页)
export function storeMoveDelete(data) {
  return request({
    url: '/storage/hwtc/del',
    method: 'post',
    data,
    schema: getSchema(sampleStoreMoveDelete)
  })
}

// ?获取调仓单sku详情(编辑页)
export function storeMove(dzid) {
  return request({
    url: `/storage/hwtc/detail/${dzid}`,
    method: 'post',
    schema: getSchema(sampleStoreMove)
  })
}

// ?调仓单修改（sku）=> (编辑页)
export function storeMoveUpdateDetail(data) {
  return request({
    url: `/storage/hwtc/modify`,
    method: 'post',
    data,
    headers: {
      repeatSubmit: false
    },
    schema: getSchema(sampleStoreMoveUpdateDetail)
  })
}

// ? 添加调仓单
export function storeMoveCreate(data) {
  const _data = {
    // 静态参数（不知是什么）
    dzrb: 'ck_spdj16'
  }
  return request({
    url: `/storage/hwtc/add`,
    method: 'post',
    data: Object.assign(_data, data),
    schema: getSchema(sampleStoreMoveCreate)
  })
}

// ? 选择客户和仓库
export function customerList({ data, params } = {}) {
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
    schema: getSchema(sampleCustomerList)
  })
}

// ? 货物调仓=>选择库存
export function selectStock({ data, params } = {}) {
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

// ? 调仓单审核 => 编辑页/列表页
export function storeMoveAudit(data) {
  return request({
    url: `/storage/hwtc/audit`,
    method: 'post',
    data,
    schema: getSchema(sampleStoreMoveAudit)
  })
}

// ? 出仓单驳回 => 出仓单编辑页
export function storeMoveReject(id) {
  return request({
    url: `/storage/hwtc/reject/${id}`,
    method: 'post',
    schema: getSchema(sampleStoreMoveReject)
  })
}

// ? 调仓单总览
export function storeMoveOverview(data) {
  return request({
    url: `/storage/hwtc/overview`,
    method: 'post',
    data,
    schema: getSchema(sampleStoreMoveOverview)
  })
}

// ? 调仓单总览=>已删除记录
export function storeMoveOverviewDeleted(data) {
  return request({
    url: `/storage/hwtc/recordDeleted`,
    method: 'post',
    data,
    schema: getSchema(sampleStoreMoveOverviewDeleted)
  })
}
// ? 调仓单总览=>导出excel
export function storeMoveOverviewExport(data) {
  return request({
    url: `/storage/hwtc/export`,
    method: 'post',
    data,
    schema: getSchema(sampleStoreMoveOverviewExport)
  })
}

// ? 新增调仓单=>选择仓位
export function selectPosition({ params }) {
  const _params = {
    pageNum: params.pageNum,
    pageSize: params.pageSize,
    spckid: params.$warehouseId,
    ckcw: params.position
  }
  return request({
    url: `/storage/category/selectPosition2`,
    method: 'post',
    params: _params,
    schema: getSchema(sampleSelectPosition)
  })
}
