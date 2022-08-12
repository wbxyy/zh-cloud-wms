import { request, getSchema } from '@api/wms/request'
import {
  sampleStoreMoveList,
  sampleStoreMoveDelete,
  sampleStoreMove,
  sampleStoreMoveUpdateDetail,
  sampleStoreMoveCreate,
  sampleSelectStock,
  sampleStoreMoveAudit,
  sampleStoreMoveReject,
  sampleStoreMoveOverview,
  sampleStoreMoveOverviewDeleted,
  sampleStoreMoveOverviewExport
} from './sample'

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
export function storeMove({ params }) {
  return request({
    url: `/storage/hwtc/detail/${params.$billId}`,
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
