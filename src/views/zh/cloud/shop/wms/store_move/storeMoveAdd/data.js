//todo 新仓库 spckidn<==>
//todo 新仓位 spcwidn<==>
//todo spckidis<==>
//todo spckidis<==>

export const formLabel = [
  {
    key:'customerName',
    label:'客户',
    inputType:3,
  },
  {
    key:'warehouse',
    label:'仓库',
  },
  {
    key:'position',
    label:'仓位',
    inputType:3,
    disabled(formData){
      return !Boolean(formData.customerName)
    }
  },
  {
    key:'stock',
    label:'库存',
    inputType:3,
    disabled(formData){
      return !Boolean(formData.position)
    },
    error:'无法传客户名和客户id到接口'
  },
  {
    key:'movingType',
    label:'调仓类型',
    inputType:1,
    options:[
      {
        label:'客户调仓',
        value:'客户调仓',
      },
      {
        label:'内部调仓',
        value:'内部调仓',
      },
    ]
  },
  {
    key:'billRemark',
    label:'备注',
    inputType:0
  }
]

export const tableColumns = [
  {
    key: 'customerName',
    label: '客户',
    align: 'left',
    width:'240px',
    columnOrder:1000,
    renderGroup: '概要',
  },
  {
    key: 'specification',//!spzs
    label: '物品规格',
    fixed: false,
    width: '120px',
    renderGroup: '基本货物信息',
  },
  {
    key: '$batchNo',//!spbh
    label: '批号',
    fixed: false,
    width: '100px',
    renderGroup: '基本货物信息',
  },
  {
    key: '$shipNo',//!spgh
    label: '柜号',
    fixed: false,
    width: '110px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'warehouse',
    label: '原仓库',
    align: 'left',
    fixed: false,
    width: '80px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'position',
    label: '原仓位',
    align: 'left',
    fixed: false,
    width: '60px',
    renderGroup: '基本货物信息',
  },
  {
    key: '$newPositionId',
    label: '选择新仓位',
    align: 'left',
    fixed: false,
    width: '60px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'number',
    label: '转移件数',
    align: 'left',
    fixed: false,
    inputType:0,
    width: '60px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'restNumber',
    label: '原库存件数',
    align: 'left',
    fixed: false,
    width: '60px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'pieceWeight',//!spjsl
    label: '单重',
    align: 'left',
    fixed: false,
    width: '100px',
    unit:'kg',
    renderGroup: '基本货物信息',
    filter(val){
      return Math.round(Number(val||0)*100)/100
    },
  },
  {
    key: 'totalWeight',//!spsl
    label: '重量',
    align: 'left',
    fixed: false,
    width: '100px',
    disabled:true,
    computed(formData){
      const val = Number(formData.pieceWeight || 0) * Number(formData.number || 0) / 1000
      return Object.is(val,NaN) ? 0 : val.toFixed(4)
    },
    unit:'吨',
    renderGroup: '基本货物信息',
  },
  {
    key: 'dischargeDate',//!ssrqidn在出仓单是出仓日期，但是在调仓单是入仓日期
    label: '入仓日期',
    fixed: false,
    width: '120px',
    valueFormat:'yyyy-MM-dd',
    renderGroup: '基本货物信息',
  },
  {
    key: 'date',
    label: '调仓日期',
    fixed: false,
    inputType: 2,
    valueFormat:'yyyy-MM-dd',
    renderGroup: '基本货物信息',
    width: '120px',
    rule:{
      required: true, message: '出仓日期不能为空', trigger: 'change'
    },
  },
  {
    key: 'days',//!days
    label: '天数',
    align: 'left',
    fixed: false,
    width: '80px',
    renderGroup: '基本货物信息',
  },
  {
    key: '$skuNo',
    label: '用户条码',
    align: 'left',
    fixed: false,
    width: '80px',
    renderGroup: '基本货物信息',
  },
  {
    key: '$warehouseNo',
    label: '仓库条码',
    align: 'left',
    fixed: false,
    width: '80px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'brand',//!spcd
    label: '品牌',
    align: 'left',
    fixed: false,
    width: '80px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'skuRemark',//!itbz
    label: '备注',
    align: 'left',
    fixed: false,
    width: '100px',
    renderGroup: '其他信息',
  }
]
