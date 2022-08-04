import service from '@/utils/request'
import { mapRequest, mapResponse, transformData, transformSelect, getSampleMapping } from '@/utils/sugar'
import { getDicts } from '@/api/system/dict/data'
import {
  sampleStoreOutList,
  sampleStoreOutDelete,
  sampleStoreOut,
  sampleStoreOutUpdate,
  sampleStoreOutUpdateDetail,
  sampleStoreOutCreate,
  sampleSelectStock,
  sampleAppendStock,
  sampleCustomerList,
  sampleStoreOutAudit,
  sampleStoreOutReject,
  sampleStoreOutHistory,
  sampleStoreOutOverview,
  sampleOptionsCustomer,
  sampleOptionsWarehouse
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

// ? 出仓单列表
export function storeOutList({ data, params }) {
  return request({
    url: '/storage/hwcc/list',
    method: 'post',
    data,
    params,
    schema: getSchema(sampleStoreOutList)
  })
}

// ?删除出仓单sku => 出仓单编辑页
export function storeOutDelete(data) {
  return request({
    url: '/storage/hwcc/del',
    method: 'post',
    data,
    schema: getSchema(sampleStoreOutDelete)
  })
}

// ?获取出仓单sku详情 => 出仓单编辑页
export function storeOut(dzid) {
  return request({
    url: `/storage/hwcc/detail/${dzid}`,
    method: 'post',
    schema: getSchema(sampleStoreOut)
  })
}

// ? 出仓单修改 => 出仓单编辑页
export function storeOutUpdate(data) {
  return request({
    url: `/storage/hwcc/modifyInfo`,
    method: 'post',
    data,
    schema: getSchema(sampleStoreOutUpdate)
  })
}

// ?出仓单修改（sku）=> 出仓单编辑页
export function storeOutUpdateDetail(data) {
  return request({
    url: `/storage/hwcc/modify`,
    method: 'post',
    data,
    headers: {
      repeatSubmit: false
    },
    schema: getSchema(sampleStoreOutUpdateDetail)
  })
}

// ? 货物出仓->添加出仓单 => 出仓单新增页
export function storeOutCreate(data) {
  return request({
    url: `/storage/hwcc/add`,
    method: 'post',
    data,
    schema: getSchema(sampleStoreOutCreate)
  })
}

// ? 货物出仓->添加出仓单：获取客户列表 => 出仓单新增页
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
    'spckid': '',
    'spckidis': []
  }
  return request({
    url: '/storage/hwcc/selectCustomer',
    method: 'post',
    data: Object.assign(_data, data),
    params: Object.assign(_params, params),
    schema: getSchema(sampleCustomerList)
  })
}

// ? 货物出仓->添加出仓单：选择库存 => 出仓单新增页
// ? 后端给出的sample很混乱，实际使用给出仓库id，仓位id，批号id，柜号id，品牌，条码来查询库存
export function selectStock({ data, params } = {}) {
  const _params = {
    pageNum: 1,
    pageSize: 100000
  }
  return request({
    url: '/storage/hwcc/selectStock',
    method: 'post',
    data,
    params: Object.assign(_params, params),
    schema: getSchema(sampleSelectStock)
  })
}

// ? 出仓单追加库存 => 出仓单新增页
export function appendStock({ data, params }) {
  const _params = {
    pageNum: 1,
    pageSize: 100000
  }
  return request({
    url: '/storage/hwcc/selectStock1',
    method: 'post',
    data,
    params: Object.assign(_params, params),
    schema: getSchema(sampleAppendStock)
  })
}

// ? 出仓单审核 => 出仓单编辑页/列表页
export function storeOutAudit(data) {
  return request({
    url: `/storage/hwcc/audit`,
    method: 'post',
    data,
    schema: getSchema(sampleStoreOutAudit)
  })
}

// ? 出仓单驳回 => 出仓单编辑页
export function storeOutReject(id) {
  return request({
    url: `/storage/hwcc/reject/${id}`,
    method: 'post',
    schema: getSchema(sampleStoreOutReject)
  })
}

// ? 出仓单历史记录 => 出仓单编辑页
export function storeOutHistory(id) {
  return request({
    url: `/storage/hwcc/historyRecord/${id}`,
    method: 'post',
    schema: getSchema(sampleStoreOutHistory)
  })
}

// 出仓单总览
export function storeOutOverview(data) {
  return request({
    url: `/storage/hwcc/overview`,
    method: 'post',
    data,
    schema: getSchema(sampleStoreOutOverview)
  })
}

// 出仓字段新增字段映射
// ?入仓单详情
// todo 装卸费： zxf<==>stevedorage
// todo 作业量： zyl<==>workingOut

// ? 获取库存
// todo 剩余件数：spjs2<==>restNumber
// todo 剩余吨数：spsl2<==>restWeight
// todo 估价单价: spdj<==>unitPrice
// todo 估价金额：spje<==>totalPrice
// todo 质押件数: spjsz<==>pledgeNumber
// todo 质押重量：spslz<==>pledgeWeight

// todo 出仓日期：ssrqidn<==>dischargeDate
// todo 修改日期：ssrqid2<==>modifiedDate

// todo 单据类别：djlb<==>billType

// ?单据历史
// todo 操作人：namep<==>operationMan
// todo 操作时间：rqid<==>operationDate
// todo 操作内容：action<==>action

// ?通用搜索
// todo 取样查找：qycz<==>sample
// todo 精确查找：jqcz<==>accurate

// 选择客户
export function optionsCustomer() {
  return request({
    url: `/storage/shop/selectClient`,
    method: 'post',
    schema: getSchema(sampleOptionsCustomer)
  })
}
// 选择仓库
export function optionsWarehouse() {
  return request({
    url: `/storage/zdspck/selectWarehouse3`,
    method: 'post',
    schema: getSchema(sampleOptionsWarehouse)
  })
}
