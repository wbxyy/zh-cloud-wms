//!调仓下拉不知道用哪个
import { customerStoreOutOptions,warehouseStoreOutOptions } from '@api/wms/preFetch'

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

export const formLabel = [
  {
    key:'customerName',
    label:'客户',
    inputType:1,
    options:customerStoreOutOptions().then(res=>{
      return res
    }),
    filterable:true,
    error:'用的是出仓客户api'
  },
  {
    key:'warehouse',
    label:'仓库',
    inputType:1,
    options:warehouseStoreOutOptions().then(options=>{
      return options.map(item=>({
        label:item.label,
        value:item.label
      }))
    }),
    filterable:true,
    error:'搜到0的数据，是数据本身是小于10e-4，用的是出仓仓库api'
  },
  {
    key:'$shipNo',
    label:'柜号/批号',
    inputType:0,
    filterable:true,
  }
]
