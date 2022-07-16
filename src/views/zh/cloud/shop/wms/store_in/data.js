//? 定义inputType
//? undefined:text
//? 0:input
//? 1:select
//? 2:date-picker
//? 3:button
//? 4:switch
import _ from 'lodash'
import { warehouseList,warehousePositions } from '@/api/zh/cloud/wms/store_in'
// let warehouse = warehouseList()
export function getWarehouseOptions(){
  // return warehouse.then(res=>{
    return warehouseList().then(res=>{
    return res.rows.map(item=>({
      label:item.warehouse,
      value:item.$warehouseId
    }))
  })
}


export function getPositionsOptions(id){
  return warehousePositions(id).then(res => {
    return res.data.map(item=>({
      label: item.position,
      value: item.$positionId
    }))
  })
}


import { categoryDropdown } from '@api/wms/category'
let dropdown = categoryDropdown()


export function getYarn(){
  return dropdown.then(res=>{
    return res.data['a'].map(item=>({label:item.Name,value:item.Name}))
  })
}
export function getTech(){
  return dropdown.then(res=>{
    return res.data['b'].map(item=>({label:item.Name,value:item.Name}))
  })
}
export function getProcess(){
  return dropdown.then(res=>{
    return res.data['c'].map(item=>({label:item.Name,value:item.Name}))
  })
}
export function getPurpose(){
  return dropdown.then(res=>{
    return res.data['d'].map(item=>({label:item.Name,value:item.Name}))
  })
}
export function getOrigin(){
  return dropdown.then(res=>{
    return res.data['e'].map(item=>({label:item.Name,value:item.Name}))
  })
}
export function getBleach(){
  return dropdown.then(res=>{
    return res.data['f'].map(item=>({label:item.Name,value:item.Name}))
  })
}

//region
export const tableColumns = [
  {
    label: '打印次数',//!dzzy9
    prop: 'printCount',
    key: 'printCount',
    visible: true,
    width: '80px',
    align: 'center',
    tip: true,
    fixed: true
  },
  {
    label: '入仓日期',//!ssrqid
    prop: 'receiptDate',
    key: 'receiptDate',
    visible: true,
    width: '120px',
    align: 'center',
    tip: true
  },
  {
    label: '客户',//!khmc
    prop: 'customerName',
    key: 'customerName',
    visible: true,
    width: '240px',
    align: 'center',
    tip: true
  },
  {
    label: '入仓件数',//!spjs
    prop: 'number',
    key: 'number',
    visible: true,
    width: '80px',
    align: 'center',
    tip: true
  },
  {
    label: '入仓重量（吨）',//!spsl
    prop: 'totalWeight',
    key: 'totalWeight',
    visible: true,
    width: '120px',
    align: 'center',
    tip: true
  },
  {
    label: '物品规格',//!spzs
    prop: 'specification',
    key: 'specification',
    visible: true,
    width: '150px',
    align: 'center',
    tip: true
  },
  {
    label: '车牌',//!dzzy6
    prop: 'plateNumber',
    key: 'plateNumber',
    visible: true,
    width: '120px',
    align: 'center',
    tip: true
  },
  {
    label: '创建人',//!rsopmc
    prop: 'creator',
    key: 'creator',
    visible: true,
    width: '120px',
    align: 'center',
    tip: true
  },
  {
    label: '创建时间',//!prrq
    prop: 'createDate',
    key: 'createDate',
    visible: true,
    width: '120px',
    align: 'center',
    tip: true
  },
  {
    label: '审核日期',//!SHrqid
    prop: 'verifyDate',
    key: 'verifyDate',
    visible: true,
    width: '120px',
    align: 'center',
    tip: true
  },
  {
    label: '单证备注',//!dzbz
    prop: 'billRemark',
    key: 'billRemark',
    visible: true,
    width: '120px',
    align: 'center',
    tip: true
  },
  {
    label: '关联单号',//!yydh
    prop: '$relativeNo',
    key: '$relativeNo',
    visible: true,
    width: '80px',
    align: 'center',
    tip: true,
  },
  {
    label: '外部单号',//!wbdh
    prop: '$outerNo',
    key: '$outerNo',
    visible: true,
    width: '80px',
    align: 'center',
    tip: true
  },
  {
    label: '单号',//!pzbh
    prop: '$billNo',
    key: '$billNo',
    visible: true,
    width: '80px',
    align: 'center',
    tip: true
  },
  {
    label: '审核状态',//!shzt
    prop: 'verify',
    key: 'verify',
    visible: true,
    width: '80px',
    align: 'center',
    tip: true
  },
  {
    label: '实际结算方',//!dzzy12
    prop: 'realSettlement',
    key: 'realSettlement',
    visible: true,
    width: '120px',
    align: 'center',
    tip: true
  }
]
//endregion

export const formLabel = [
    {
      key: '$billNo',
      label: '单号',
      inputType: 0,
    },
    {
      key: '$relativeNo',
      label: '关联单号',
      inputType: 0,
    },
    {
      key: '$outerNo',
      label: '外部单号',
      inputType:0
    },
    {
      key: 'customerName',
      label: '客户',
      inputType:0
    },
    {
      key: '_receiptDate',
      label: '入仓日期',
      inputType:2,
      dateType:'daterange'
    },
    {
      key: '$skuNo',
      label: '条码',
      inputType:0,
    },
    {
      key: '$shipNo',
      label: '柜号/批号',
      inputType:0,
    },
    {
      key: 'warehouse',
      label: '仓库',
      inputType:1,
      options:{
        trigger:'immediately',
        resolve:getWarehouseOptions
      }
    },
    {
      key: 'position',
      label: '仓位',
      inputType:1,
      options:{
        trigger:'warehouse',
        resolve:function(id){
          if(_.get(id,'value')){
            return getPositionsOptions(id.value)
          }
        }
      }
    },
    {
      key: 'verify',
      label: '审核状态',
      inputType:1,
      options:[
        {
          label:'已审核',
          value:'已审核'
        },
        {
          label:'未审核',
          value:'未审核'
        }
      ]
    },
    {
      key: 'plateNumber',
      label: '车牌',
      inputType:0,
    },
]
