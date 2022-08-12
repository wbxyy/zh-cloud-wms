import { request, getSchema } from '@api/wms/request'
import {
  sampleWarehouseStoreIn,
  sampleWarehouseStoreOut,
  sampleWarehouseStoreMove,
  samplePositionsStoreIn,
  samplePositionsStoreMove
} from './sample'

// ? 货物入仓->仓库下拉/选择仓库：获取仓库列表
//! 设置默认值防止解构undefined报错
export function warehouseStoreIn({ data, params } = {}) {
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
    schema: getSchema(sampleWarehouseStoreIn)
  })
}

// 选择仓库
export function warehouseStoreOut() {
  return request({
    url: `/storage/zdspck/selectWarehouse3`,
    method: 'post',
    schema: getSchema(sampleWarehouseStoreOut)
  })
}

// 选择新仓库
export function warehouseStoreMove() {
  return request({
    url: `/storage/zdspck/selectWarehouse10`,
    method: 'post',
    schema: getSchema(sampleWarehouseStoreMove)
  })
}

// ? 货物入仓->仓位下拉：根据仓库id获取仓位列表
export function positionsStoreIn(warehouseId) {
  return request({
    url: `/storage/category/selectPosition/${warehouseId}`,
    method: 'post',
    headers: {
      repeatSubmit: false
    },
    schema: getSchema(samplePositionsStoreIn)
  })
}

// ? 新增调仓单=>选择仓位
export function positionStoreMove({ params }) {
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
    schema: getSchema(samplePositionsStoreMove)
  })
}
