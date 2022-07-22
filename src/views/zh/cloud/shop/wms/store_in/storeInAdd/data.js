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
    rule:[
      { required: true, message: '车牌不能为空', trigger: 'blur' },
      // { pattern:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/, message: '请输入正确的车牌号', trigger: 'blur' },
    ]
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
    //   pattern:/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/, message: '请输入正确的手机号', trigger: 'blur'
    // }
  },
  {
    key: 'identity',//!dzzy10
    label: '身份证',
    inputType:0,
    // rule:{
    //   pattern:/^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/, message: '请输入正确的身份证', trigger: 'blur'
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
    columnOrder:99,
    labelOrder:1000,
    // labelVisible:false,
    // columnVisible:false,
    error:true,
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
    columnOrder:93,
    labelOrder:990,
    renderGroup: '基本货物信息',
    rule:{
      required: true, message: '物品规格不能为空', trigger: 'blur'
    }
  },

   {
    key: '$batchNo',//!spbh
    label: '批号',
    align: 'left',
    fixed: false,
    inputType: 0,
    columnOrder:95,
    labelOrder:950,
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
    columnOrder:94,
    labelOrder:940,
    renderGroup: '基本货物信息',
    // rule:{
    //   required: true, message: '柜号不能为空', trigger: 'blur'
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
    columnOrder:98,
    labelOrder:980,
    renderGroup: '基本货物信息',
    rule:[
      {required: true, message: '件数不能为空', trigger: 'blur'},
      { pattern:/(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/, message: '件数必须为数字', trigger: 'blur' }
    ]
  },
  {
    key: 'pieceWeight',//!spjsl
    label: '单重',
    align: 'left',
    fixed: false,
    width: '180px',
    inputType: 0,
    unit:'kg',
    columnOrder:96,
    labelOrder:970,
    // filter(val){
    //   if(!Number(val)) return
    //   return Math.round(val * 100) / 100
    // },
    renderGroup: '基本货物信息',
    rule:[
      { required: true, message: '单重不能为空', trigger: 'blur'},
      { pattern:/(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/, message: '件数必须为数字', trigger: 'blur' }
    ]
  },
  {
    key: '$positionId',//spcwid
    label: '仓位',
    align: 'left',
    fixed: false,
    inputType: 1,
    columnOrder:92,
    labelOrder:930,
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
    columnOrder:97,
    labelOrder:960,
    computed(formData){
      const val = Number(formData.pieceWeight || 0) * Number(formData.number || 0) / 1000
      return Object.is(val,NaN) ? 0 : val.toFixed(4)
    },
    unit:'吨',
    // labelWidth:'200px',
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
    columnOrder:91,
    labelOrder:920,
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
    columnVisible:false,
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
    columnVisible:false,
    options:getTech()
  },
  {
    key: 'process',//!wpggC
    label: '工序',
    align: 'left',
    fixed: false,
    inputType: 1,
    renderGroup: '高级货物信息',
    columnVisible:false,
    options:getProcess()
  },
  {
    key: 'purpose',//!wpggD
    label: '用途',
    align: 'left',
    fixed: false,
    inputType: 1,
    renderGroup: '高级货物信息',
    columnVisible:false,
    options:getPurpose()
  },
  {
    key: 'origin',//!wpggE
    label: '产地',
    align: 'left',
    fixed: false,
    inputType: 1,
    renderGroup: '高级货物信息',
    columnVisible:false,
    options:getOrigin()
  },
  {
    key: 'bleach',//wpggF
    label: '漂染性',
    align: 'left',
    fixed: false,
    inputType: 0,
    renderGroup: '高级货物信息',
    columnVisible:false,
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
    valueFormat:'yyyy-MM-dd',
    columnVisible:false,
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
    columnVisible:false,
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
