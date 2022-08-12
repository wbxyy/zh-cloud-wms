import { categoryDropdown } from '@api/wms/category'

import {
  warehouseStoreIn as fetchWarehouseStoreIn,
  warehouseStoreOut as fetchWarehouseStoreOut,
  warehouseStoreMove as fetchWarehouseStoreMove,
  positionsStoreIn as fetchPositionsStoreIn,
  positionStoreMove as fetchPositionsStoreMove
} from '@api/wms/warehouse'

import {
  customerStoreIn as fetchCustomerStoreIn,
  customerStoreOut as fetchCustomerStoreOut,
  customerStoreMove as fetchCustomerStoreMove
} from '@api/wms/customer'

//! ----------------------------------注意：修改仓库、仓位、客户时需要重新获取-------------------------------------
const dropdown = categoryDropdown()
const warehouseStoreInResult = fetchWarehouseStoreIn()
const warehouseStoreOutResult = fetchWarehouseStoreOut()
const warehouseStoreMoveResult = fetchWarehouseStoreMove()
const customerStoreOutResult = fetchCustomerStoreOut()
const customerStoreInResult = fetchCustomerStoreIn()
const customerStoreMoveResult = fetchCustomerStoreMove()
//! ----------------------------------注意：修改仓库、仓位、客户时需要重新获取-------------------------------------

export function customerStoreIn() {
  return customerStoreInResult
}

export function customerStoreOut() {
  return customerStoreOutResult
}

export function customerStoreOutOptions() {
  return customerStoreOutResult.then(res => {
    return res.rows.map(item => ({
      label: item.customerName,
      value: item.customerName
    }))
  })
}

export function customerStoreMove() {
  return customerStoreMoveResult
}

export function warehouseStoreIn() {
  return warehouseStoreInResult
}
export function warehouseStoreInOptions() {
  return warehouseStoreInResult.then(res => {
    return res.rows.map(item => ({
      label: item.warehouse,
      value: item.$warehouseId
    }))
  })
}

export function warehouseStoreOut() {
  return warehouseStoreOutResult
}

export function warehouseStoreOutOptions() {
  return warehouseStoreOutResult.then(res => {
    return res.data.map(item => ({
      label: item.warehouse,
      value: item.$warehouseId
    }))
  })
}

export function warehouseStoreMove() {
  return warehouseStoreMoveResult
}

export function warehouseStoreMoveOptions() {
  return warehouseStoreMoveResult.then(res => {
    return res.data.map(item => ({
      label: item.warehouse,
      value: item.$warehouseId
    }))
  })
}

export function positionsStoreIn(id) {
  return fetchPositionsStoreIn(id)
}

export function positionsStoreInOptions(id) {
  return fetchPositionsStoreIn(id).then(res => {
    return res.data.map(item => ({
      label: item.position,
      value: item.$positionId
    }))
  })
}

export function positionsStoreMove(id) {
  return fetchPositionsStoreMove(id)
}

export function getYarn() {
  return dropdown.then(res => {
    return res.data['a'].map(item => ({ label: item.Name, value: item.Name }))
  })
}
export function getTech() {
  return dropdown.then(res => {
    return res.data['b'].map(item => ({ label: item.Name, value: item.Name }))
  })
}
export function getProcess() {
  return dropdown.then(res => {
    return res.data['c'].map(item => ({ label: item.Name, value: item.Name }))
  })
}
export function getPurpose() {
  return dropdown.then(res => {
    return res.data['d'].map(item => ({ label: item.Name, value: item.Name }))
  })
}
export function getOrigin() {
  return dropdown.then(res => {
    return res.data['e'].map(item => ({ label: item.Name, value: item.Name }))
  })
}
export function getBleach() {
  return dropdown.then(res => {
    return res.data['f'].map(item => ({ label: item.Name, value: item.Name }))
  })
}
