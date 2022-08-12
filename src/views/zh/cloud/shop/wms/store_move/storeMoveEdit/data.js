
import _ from 'lodash'
export const formLabel = [
  {
    key:'$billNo',
    label:"单号"
  },
  {
    key:'billType',
    label:"单据类型"
  }
]

export const dialogFormLabel = [
  {
    key:'$warehouseNo',
    label:'旧仓库条码'
  },
  {
    key:'$warehouseNo_2',
    label:'新仓库条码'
  },
  {
    label:'初次日期'
  },
  {
    key:'specification',
    label:'物品规格',
  },
  {
    key:'$shipNo',
    label:'柜号',
  },
  {
    key:'$batchNo',
    label:'批号',
  },
  {
    key:'warehouse_o',
    label:'旧仓库',
  },
  {
    key:'position_o',
    label:'旧仓位',
  },
  {
    key:'warehouse_n',
    label:'新仓库',
  },
  {
    key:'position_n',
    label:'新仓位',
    inputType:1,
    options:[]
  },
  {
    key:'number',//!✔
    label:'调入件数',
    inputType:0,
    filter(val){
      return Math.round(Number(val||0)*100)/100
    },
  },
  {
    key:'pieceWeight',
    label:'单重',
    unit:'kg'
  },
  {
    key:'totalWeight',
    label:'调入重量',
    unit:'吨',
    computed(formData){
      const val = Number(formData.pieceWeight || 0) * Number(formData.splitNumber || 0) / 1000
      return Object.is(val,NaN)? 0 : val.toFixed(4)
    }
  },
  {
    key:'date',//!✔
    label:'调仓日期',
    inputType:2,
    valueFormat:'yyyy-MM-dd',
    rule:{
      required: true, message: '调仓日期不能为空', trigger: 'change'
    },
  },
   {
    key:'skuRemark',
    label:'备注',
  },
  {
    key:'$skuNo',
    label:'客户条码'
  },
]



export const tableColumns = [
  {
    key:'$warehouseNo',
    label:'旧仓库条码'
  },
  {
    key:'$warehouseNo_2',
    label:'新仓库条码'
  },
  {
    key:'$skuNo',
    label:'客户条码'
  },
  {
    key:'number',//!✔
    label:'调入件数',
    inputType:0,
    filter(val){
      return Math.round(Number(val||0)*100)/100
    },
  },
  {
    key:'pieceWeight',
    label:'单重',
    unit:'kg'
  },
  {
    key:'totalWeight',
    label:'调入重量',
    unit:'吨',
    computed(formData){
      const val = Number(formData.pieceWeight || 0) * Number(formData.splitNumber || 0) / 1000
      return Object.is(val,NaN)? 0 : val.toFixed(4)
    }
  },
  {
    key:'date',//!✔
    label:'调仓日期',
    inputType:2,
    valueFormat:'yyyy-MM-dd',
    rule:{
      required: true, message: '调仓日期不能为空', trigger: 'change'
    },
  },
  {
    key:'warehouse_o',
    label:'原仓库',
  },
  {
    key:'position_o',
    label:'原仓位',
  },
  {
    key:'warehouse_n',//!✔
    label:'新仓库',
    inputType:1,
    options:[],
    rule:{
      required: true, message: '仓库不能为空', trigger: 'change'
    },
  },
  {
    key:'position_n',//!✔
    label:'新仓位',
    inputType:1,
    options:[],
    rule:{
      required: true, message: '仓位不能为空', trigger: 'change'
    },
  },
  {
    key:'skuRemark',
    label:'备注',
  },
  {
    key:'specification',
    label:'物品规格',
  },
  {
    key:'$shipNo',
    label:'柜号',
  },
  {
    key:'$batchNo',
    label:'批号',
  },
  {
    key:'skuName',
    label:'物品名称',
  },
  {
    key:'brand',
    label:'品牌',
  },
  {
    key:'customerName',
    label:'客户',
  },
  {
    key: 'yarn',//!wpggA
    label: '纱支',
  },
  {
    key: 'tech',//!wpggB
    label: '工艺',
  },
  {
    key: 'process',//!wpggC
    label: '工序',
  },
  {
    key: 'purpose',//!wpggD
    label: '用途',
  },
  {
    key: 'origin',//!wpggE
    label: '产地',
  },
  {
    key: 'bleach',//wpggF
    label: '漂染性',
  },
  {
    key: 'manufactureDate',//!wpggG
    label: '生产日期',
  },
  {
    key: 'color',//!wpggH
    label: '颜色',
  },
]
