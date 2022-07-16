import { getYarn,getTech,getPurpose,getProcess,getOrigin,getBleach,getPositionsOptions } from "../data"

export const formLabel = [
  {
    key: 'customerName',//!khmc
    label: '客户',
    inputType: 3,
    rule:{
      required: true, message: '客户不能为空', trigger: 'blur'
    }
  },
  {
    key: 'warehouse',//!spckmc
    label: '仓库',
    inputType: 3,
    rule:{
      required: true, message: '仓库不能为空', trigger: 'blur'
    }
  },
  {
    key: 'stevedorage',//!iszxf
    label: '装卸费',
    inputType:4,
    activeValue:`0`,
    inactiveValue:`1`
  },
  {
    key: 'workingOut',//!iszyl
    label: '作业量',
    inputType:4,
    activeValue:`0`,
    inactiveValue:`1`
  },
  {
    key: 'plateNumber',//!dzzy6
    label: '车牌',
    inputType:0,
    // rule:{
    //   required: true, message: '车牌不能为空', trigger: 'blur'
    // }
  },
  {
    key: 'linkman',//!dzzy7
    label: '联系人',
    inputType:0,
    // rule:{
    //   required: true, message: '联系人不能为空', trigger: 'blur'
    // }
  },
  {
    key: 'phone',//!dzzy8
    label: '电话',
    inputType:0,
    // rule:{
    //   required: true, message: '电话不能为空', trigger: 'blur'
    // }
  },
  {
    key: 'identity',//!dzzy10
    label: '身份证',
    inputType:0,
    // rule:{
    //   required: true, message: '身份证不能为空', trigger: 'blur'
    // }
  },
  {
    key: 'realSettlement',//!szkhmc
    label: '实际结算方',
    inputType:0,
    labelWidth:'95px',
    // rule:{
    //   required: true, message: '实际结算方不能为空', trigger: 'blur'
    // }
  },
  {
    key: '$outerNo',//!wbdh
    label: '外部单号',
    inputType:0,
    // rule:{
    //   required: true, message: '外部单号不能为空', trigger: 'blur'
    // }
  },
  {
    key: 'billRemark',//!dzbz
    label: '备注',
    inputType:0,
    // rule:{
    //   required: true, message: '备注不能为空', trigger: 'blur'
    // }
  },

]


export const tableColumns = [
  {
    key: 'receiptDate',//!ssrqid
    label: '入仓日期',
    align: 'center',
    fixed: false,
    inputType: 2,
    valueFormat:'yyyy-MM-dd',
    renderGroup: '基本货物信息',
    rule:{
      required: true, message: '入仓日期不能为空', trigger: 'change'
    },
  },
  {
    key: 'specification',//!spzs
    label: '物品规格',
    align: 'left',
    fixed: false,
    width: '200px',
    inputType: 0,
    renderGroup: '基本货物信息',
    rule:{
      required: true, message: '物品规格可以为空', trigger: 'blur'
    }
  },

   {
    key: '$batchNo',//!spbh
    label: '批号',
    align: 'left',
    fixed: false,
    inputType: 0,
    renderGroup: '基本货物信息',
    rule:{
      required: true, message: '批号不能为空', trigger: 'blur'
    },
  },
  {
    key: '$shipNo',//!spgh
    label: '柜号',
    align: 'left',
    fixed: false,
    inputType: 0,
    renderGroup: '基本货物信息',
    // rule:{
    //   required: true, message: '柜号可以为空', trigger: 'blur'
    // }
  },
   {
    key: 'number',//!spjs
    label: '件数',
    align: 'left',
    fixed: false,
    inputType: 0,
    // filter(val){
    //   return Math.round(Number(val || 0) * 100) / 100
    // },
    renderGroup: '基本货物信息',
    rule:{
      required: true, message: '件数不能为空', trigger: 'blur'
    },
  },
  {
    key: 'pieceWeight',//!spjsl
    label: '单重',
    align: 'left',
    fixed: false,
    width: '180px',
    inputType: 0,
    unit:'kg',
    // filter(val){
    //   if(!Number(val)) return
    //   return Math.round(val * 100) / 100
    // },
    renderGroup: '基本货物信息',
    rule:{
      required: true, message: '单重不能为空', trigger: 'blur'
    },
  },
  {
    key: 'position',//spcwid
    label: '仓位',
    align: 'left',
    fixed: false,
    inputType: 1,
    renderGroup: '基本货物信息',
    options: [],
    rule:{
      required: true, message: '仓位不能为空', trigger: 'change'
    },
  },
  {
    key: 'totalWeight',//!spsl
    label: '重量',
    align: 'left',
    fixed: false,
    width: '180px',
    inputType: 0,
    disabled:true,
    computed(formData){
       const val = Number(formData.pieceWeight || 0) * Number(formData.number || 0) / 1000
      return val.toFixed(4)
    },
    unit:'吨',
    labelWidth:'200px',
    renderGroup: '基本货物信息',
    // rule:{
    //   required: true, message: '重量是自动计算的，不用填', trigger: 'blur'
    // }
  },
  {
    key: 'brand',//!spcd
    label: '品牌',
    align: 'left',
    fixed: false,
    inputType: 0,
    renderGroup: '基本货物信息',
    // rule:{
    //   required: true, message: '品牌不能为空', trigger: 'blur'
    // }
  },
  {
    key: 'yarn',//!wpggA
    label: '纱支',
    align: 'left',
    fixed: false,
    inputType: 1,
    renderGroup: '高级货物信息',
    options:getYarn()
    // rule:{
    //   required: true, message: '入仓日期不能为空', trigger: 'blur'
    // }
  },
  {
    key: 'tech',//!wpggB
    label: '工艺',
    align: 'left',
    fixed: false,
    inputType: 1,
    renderGroup: '高级货物信息',
    options:getTech()
  },
  {
    key: 'process',//!wpggC
    label: '工序',
    align: 'left',
    fixed: false,
    inputType: 1,
    renderGroup: '高级货物信息',
    options:getProcess()
  },
  {
    key: 'purpose',//!wpggD
    label: '用途',
    align: 'left',
    fixed: false,
    inputType: 1,
    renderGroup: '高级货物信息',
    options:getPurpose()
  },
  {
    key: 'origin',//!wpggE
    label: '产地',
    align: 'left',
    fixed: false,
    inputType: 1,
    renderGroup: '高级货物信息',
    options:getOrigin()
  },
  {
    key: 'bleach',//wpggF
    label: '漂白性',
    align: 'left',
    fixed: false,
    inputType: 0,
    renderGroup: '高级货物信息',
    options:getBleach()
    // rule:{
    //   required: true, message: '漂白性不能为空', trigger: 'blur'
    // }
  },
  {
    key: 'manufactureDate',//!wpggG
    label: '生产日期',
    align: 'center',
    fixed: false,
    inputType: 2,
    renderGroup: '高级货物信息',
    // rule:{
    //   required: true, message: '生产日期不能为空', trigger: 'change'
    // }
  },
  {
    key: 'color',//!wpggH
    label: '颜色',
    align: 'left',
    fixed: false,
    inputType: 0,
    renderGroup: '高级货物信息',
    // rule:{
    //   required: true, message: '颜色不能为空', trigger: 'blur'
    // }
  },
  {
    key: 'skuRemark',//!itbz
    label: '备注',
    align: 'left',
    fixed: false,
    width: '200px',
    inputType: 0,
    renderGroup: '其他信息',
    // rule:{
    //   required: true, message: '备注不能为空', trigger: 'blur'
    // }
  }
]
