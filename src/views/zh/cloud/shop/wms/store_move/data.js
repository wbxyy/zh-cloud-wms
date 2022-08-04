//todo 单据类型 dzopmc <==> billType
//todo 调入件数 spjs <==> number
//todo 调入吨数 spsl <==> totalWeight
//todo 创建日期 prrq <==> createDate
//todo 制单人 rsopmc <==> creator
import moment from "moment"
import { getWarehouseOptions,getPositionsOptions } from "../store_in/data"
export const formLabel = [
    {
      key: '$billNo',
      label: '单号',
      inputType: 0,
    },
    {
      key: 'customerName',
      label: '客户',
      inputType:0
    },
    {
      key: '_movingDate',
      label: '调仓日期',
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
      filterable:true,
      options:getWarehouseOptions().then(data=>{
        return data.map(m=>({
          label:m.label,
          value:m.label,
          id:m.value
        }))
      }),
    },
    {
      key: 'position',
      label: '仓位',
      inputType:1,
      filterable:true,
      options:{
        trigger:'warehouse',
        resolve:function(id){
          if(_.get(id,'id')){
            return getPositionsOptions(id.id).then(data=>{
              return data.map(m=>({
                label:m.label,
                value:m.label
              }))
            })
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
]

export const tableColumns = [
  {
    label: '单号',
    key: '$billNo',
    width: '80px',
    align: 'center',
  },
  {
    label: '单据类型',
    key: 'billType',
    width: '100px',
    align: 'center',
  },
  {
    label: '客户',
    key: 'customerName',
    width: '240px',
    align: 'center',
  },
   {
    label: '调入件数',//!spjs
    key: 'number',
    width: '100px',
    align: 'center',
  },
  {
    label: '调入重量（吨）',//!spsl
    key: 'totalWeight',
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
    label: '创建人',//!rsopmc
    key: 'creator',
    width: '120px',
    align: 'center',
  },
  {
    label: '审核人',//!shrsmc
    key: 'approver',
    width: '120px',
    align: 'center',
  },
  {
    label: '审核日期',//!SHrqid
    key: 'verifyDate',
    width: '120px',
    align: 'center',
  },
  {
    label: '审核状态',//!shzt
    key: 'verify',
    width: '80px',
    align: 'center',
  },
  {
    label: '备注',
    key: 'billRemark',
    width: '200px',
    align: 'center',
  },
]
