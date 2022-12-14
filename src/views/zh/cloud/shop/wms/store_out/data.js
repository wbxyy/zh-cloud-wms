
import _ from 'lodash'
import {
  warehouseStoreInOptions,
  positionsStoreInOptions,
} from '@api/wms/preFetch'

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
    key: '_dischargeDate',
    label: '出仓日期',
    inputType:2,
    type:'daterange',
    startPlaceholder:"开始日期",
    endPlaceholder:"结束日期",
    rangeSeparator:"至",
    valueFormat:"yyyy-MM-dd",
    splitParams:['startDate','endDate']
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
    key: '$warehouseId',
    label: '仓库',
    inputType:1,
    options:{
      trigger:'immediately',
      resolve:warehouseStoreInOptions
    }
  },
  {
    key: '$positionId',
    label: '仓位',
    inputType:1,
    options:{
      trigger:'$warehouseId',
      resolve:function(id){
        if(_.get(id,'value')){
          return positionsStoreInOptions(id.value)
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

export const tableColumns = [
  {
    label: '打印次数',//!dzzy9
    key: 'printCount',
    visible: true,
    width: '80px',
    align: 'center',
    fixed: true
  },
  {
    label: '出仓日期',//!ssrqid
    key: 'date',
    visible: true,
    width: '120px',
    align: 'center',
  },
  {
    label: '客户',//!khmc
    key: 'customerName',
    visible: true,
    width: '240px',
    align: 'center',
  },
  {
    label: '出仓件数',//!spjs
    key: 'number',
    visible: true,
    width: '80px',
    align: 'center',
  },
  {
    label: '出仓重量（吨）',//!spsl
    key: 'totalWeight',
    visible: true,
    width: '120px',
    align: 'center',
  },
  {
    label: '物品规格',//!spzs
    key: 'specification',
    visible: true,
    width: '150px',
    align: 'center',
  },
  {
    label: '车牌',//!dzzy6
    key: 'plateNumber',
    visible: true,
    width: '120px',
    align: 'center',
  },
  {
    label: '创建人',//!rsopmc
    key: 'creator',
    visible: true,
    width: '120px',
    align: 'center',
  },
  {
    label: '创建时间',//!prrq
    key: 'createDate',
    visible: true,
    width: '120px',
    align: 'center',
  },
  {
    label: '审核日期',//!SHrqid
    key: 'verifyDate',
    visible: true,
    width: '120px',
    align: 'center',
  },
  {
    label: '审核状态',//!shzt
    key: 'verify',
    visible: true,
    width: '80px',
    align: 'center',
  },
  {
    label: '备注',//!dzbz
    key: 'billRemark',
    visible: true,
    width: '120px',
    align: 'center',
  },
  {
    label: '关联单号',//!yydh
    key: '$relativeNo',
    visible: true,
    width: '80px',
    align: 'center',
  },
  {
    label: '外部单号',//!wbdh
    key: '$outerNo',
    visible: true,
    width: '80px',
    align: 'center',
  },
  {
    label: '单号',//!pzbh
    key: '$billNo',
    visible: true,
    width: '80px',
    align: 'center',
  },

]
