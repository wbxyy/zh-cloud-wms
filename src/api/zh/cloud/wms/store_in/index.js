import { request, getSchema } from '@api/wms/request'
import {
  sampleStoreInList,
  sampleStoreInDelete,
  sampleStoreIn,
  sampleStoreInUpdate,
  sampleStoreInUpdateDetail,
  sampleStoreInCreate,
  sampleStoreInAudit,
  sampleStoreInReject
} from './sample'

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

// ?删除入仓单sku
export function storeInDelete(data) {
  return request({
    url: '/storage/hwrc/del',
    method: 'post',
    data,
    schema: getSchema(sampleStoreInDelete)
  })
}

// ?获取入仓单sku详情
export function storeIn(dzid) {
  const shztn = 0
  return request({
    url: `/storage/hwrc/detail/${dzid}/${shztn}`,
    method: 'post',
    schema: getSchema(sampleStoreIn)
  })
}

// ? 入仓单修改
export function storeInUpdate(data) {
  return request({
    url: `/storage/hwrc/modifyInfo`,
    method: 'post',
    data,
    schema: getSchema(sampleStoreInUpdate)
  })
}

// ?入仓单修改（sku）
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

// ? 货物入仓->添加入仓单
export function storeInCreate(data) {
  return request({
    url: `/storage/hwrc/add`,
    method: 'post',
    data,
    schema: getSchema(sampleStoreInCreate)
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
