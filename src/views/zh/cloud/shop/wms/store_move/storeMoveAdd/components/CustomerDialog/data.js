export const tableColumns = [
  {
    key: 'customerName',
    label: '客户',
    width: '280px',
  },
  {
    key: 'warehouse',
    label: '仓库',
    width: '180px',
  },
  {
    key: 'number',
    label: '剩余件数',
    width: '120px',
    filter(val){
      return Math.round(Number(val||0)*100)/100
    }
  },
  {
    key: 'totalWeight',
    label: '剩余吨数(吨)',
    width: '120px',
    filter(val){
      return Math.round(Number(val||0)*100)/100
    }
  },
]

import {optionsCustomer,optionsWarehouse} from '@api/wms/store_out'
const customerOptions = optionsCustomer().then(res=>{
  const options = res.data.map(m=>({
    label:m.customerName,
    value:m.customerName
  }))
  return options
})

const warehouseOptions = optionsWarehouse().then(res=>{
  console.log(res);
  const options = res.data.map(m=>({
    label:m.warehouse,
    value:m.warehouse
  }))
  return options
})
export const formLabel = [
  {
    key:'customerName',
    label:'客户',
    inputType:1,
    options:customerOptions,
    filterable:true,
  },
  {
    key:'warehouse',
    label:'仓库',
    inputType:1,
    options:warehouseOptions.then(options=>{
      return options.map(m=>({
        label:m.label,
        value:m.label
      }))
    }),
    filterable:true,
    error:'搜到0的数据，是数据本身是小于10e-4'
  },
  {
    key:'$shipNo',
    label:'柜号/批号',
    inputType:0,
    filterable:true,
  }
]
