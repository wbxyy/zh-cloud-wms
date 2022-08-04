//? 定义inputType
//? undefined:text
//? 0:input
//? 1:select
//? 2:date-picker
//? 3:button
//? 4:switch
import moment from 'moment'
import _ from 'lodash'
import { warehouseList,warehousePositions } from '@/api/zh/cloud/wms/store_in'
let warehouse = warehouseList()
export function getWarehouseOptions(){
  return warehouse.then(res=>{
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

//#region
export const tableColumns = [
  {
    label: '打印次数',//!dzzy9
    key: 'printCount',
    width: '80px',
    align: 'center',
    fixed: true
  },
  {
    label: '入仓日期',//!ssrqid
    key: 'date',
    width: '120px',
    align: 'center',
  },
  {
    label: '客户',//!khmc
    key: 'customerName',
    width: '240px',
    align: 'center',
  },
  {
    label: '入仓件数',//!spjs
    key: 'number',
    width: '80px',
    align: 'center',
    //!接口数据是带逗号的字符串
    // filter(val){
    //   console.log(val,Number(val||0));
    //   return Math.round(Number(val||0)*100)/100
    // },
  },
  {
    label: '入仓重量（吨）',//!spsl
    key: 'totalWeight',
    width: '120px',
    align: 'center',
    // filter(val){
    //   return Math.round(Number(val||0)*100)/100
    // },
  },
  {
    label: '物品规格',//!spzs
    key: 'specification',
    width: '150px',
    align: 'center',
  },
  {
    label: '车牌',//!dzzy6
    key: 'plateNumber',
    width: '120px',
    align: 'center',
  },
  {
    label: '创建人',//!rsopmc
    key: 'creator',
    width: '120px',
    align: 'center',
  },
  {
    label: '创建时间',//!prrq
    key: 'createDate',
    width: '120px',
    align: 'center',
    filter(val){
      return moment(val).format('YYYY-MM-DD')
    }
  },
  {
    label: '审核日期',//!SHrqid
    key: 'verifyDate',
    width: '120px',
    align: 'center',
  },
  {
    label: '单证备注',//!dzbz
    key: 'billRemark',
    width: '120px',
    align: 'center',
  },
  {
    label: '关联单号',//!yydh
    key: '$relativeNo',
    width: '80px',
    align: 'center',
  },
  {
    label: '外部单号',//!wbdh
    key: '$outerNo',
    width: '80px',
    align: 'center',
  },
  {
    label: '单号',//!pzbh
    key: '$billNo',
    width: '80px',
    align: 'center',
  },
  {
    label: '审核状态',//!shzt
    key: 'verify',
    width: '80px',
    align: 'center',
  },
  {
    label: '实际结算方',//!dzzy12
    key: 'realSettlement',
    width: '120px',
    align: 'center',
  }
]
//#endregion

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
      type:'daterange',
      startPlaceholder:"开始日期",
      endPlaceholder:"结束日期",
      rangeSeparator:"至",
      valueFormat:"yyyy-MM-dd"
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
      error:'sql错误'
    },
]
