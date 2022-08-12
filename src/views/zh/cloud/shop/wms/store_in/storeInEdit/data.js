import _ from 'lodash'
import {
  warehouseStoreInOptions,
  positionsStoreInOptions,
  getYarn,
  getTech,
  getPurpose,
  getProcess,
  getOrigin,
  getBleach
} from '@api/wms/preFetch'

export const formLabel = [
  {
    key: '$billNo',
    label: '单号',
  },
  {
    key: '$outerNo',
    label: '外部单号',
    inputType:0,
  },
  {
    key: 'plateNumber',
    label: '车牌',
    inputType:0,
    rule:[
      { required: true, message: '车牌不能为空', trigger: 'blur' },
      // { pattern:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/, message: '请输入正确的车牌号', trigger: 'blur' },
    ]
  },
   {
    key: 'linkman',
    label: '联系人',
    inputType:0,

  },
  {
    key: 'phone',
    label: '联系电话',
    inputType:0,
    // rule:{
    //   pattern:/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/, message: '请输入正确的手机号', trigger: 'blur'
    // }
  },
   {
    key: 'identity',
    label: '身份证',
    inputType:0,
  },
   {
    key: 'billRemark',
    label: '备注',
    inputType:0,
  },
  {
    key: 'stevedorage',
    label: '装卸费',
    inputType:4,
    activeValue:`0`,
    inactiveValue:`1`
  },
  {
    key: 'workingOut',
    label: '作业量',
    inputType:4,
    activeValue:`0`,
    inactiveValue:`1`
  },
]

export const tableColumns = [
  //!客户
  {
    key: 'customerName',//!spkhmc
    label: '客户',
    align: 'left',
    width:'240px',
    fixed: false,
    columnOrder:1000,
    labelOrder:1000,
    renderGroup: '概要',
  },
  {
    key: 'warehouse',//spckmc
    label: '原仓库',
    align: 'left',
    fixed: false,
    columnVisible:false,
    width: '180px',
    renderGroup: '概要',
  },
  {
    key: 'position',//!ckcw
    label: '原仓位',
    align: 'left',
    fixed: false,
    columnVisible:false,
    renderGroup: '概要',
  },
   //!备注
  {
    key: 'skuRemark',//!spbz
    label: '备注',
    align: 'left',
    fixed: false,
    width: '200px',
    inputType: 0,
    renderGroup: '概要',
  },
  {
    key: 'number',//!spjs
    label: '件数',
    align: 'left',
    fixed: false,
    columnOrder:960,
    inputType: 0,
    filter(val){
      return Math.round(Number(val||0)*100)/100
    },
    renderGroup: '基本货物信息',
    rule:[
      {required: true, message: '件数不能为空', trigger: 'blur'},
      { pattern:/(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/, message: '件数必须为数字', trigger: 'blur' }
    ]
  },

  //!重量
  {
    key: 'totalWeight',//!spsl
    label: '重量',
    align: 'left',
    fixed: false,
    columnOrder:950,
    width: '120px',
    inputType: 0,
    computed(formData){
      const val = Number(formData.pieceWeight || 0) * Number(formData.number || 0) / 1000
      return Object.is(val,NaN) ? 0 : val.toFixed(4)
    },
    disabled:true,
    unit:'吨',
    // labelWidth:'200px',
    renderGroup: '基本货物信息',
  },
  {
    key: '$warehouseId_1',
    label: '仓库',
    align: 'left',
    fixed: false,
    columnOrder:990,
    width: '100px',
    inputType: 1,
    // options:getWarehouseOptions(),
    options:{
      resolve(){
        return warehouseStoreInOptions()
      }
    },
    renderGroup: '基本货物信息',
    rule:{
      required: true, message: '仓库不能为空', trigger: 'change'
    },
  },
   {
    key: 'date',//!ssrqid
    label: '入仓日期',
    fixed: false,
    columnOrder:1010,
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
    columnOrder:920,
    width: '150px',
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
    columnOrder:940,
    inputType: 0,
    width: '100px',
    renderGroup: '基本货物信息',
    rule:{
      required: true, message: '批号不能为空', trigger: 'blur'
    },
  },
   //!柜号
    {
    key: '$shipNo',//!spgh
    label: '柜号',
    align: 'left',
    fixed: false,
    columnOrder:930,
    inputType: 0,
    width: '100px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'brand',//!spcd
    label: '品牌',
    align: 'left',
    fixed: false,
    columnOrder:910,
    inputType: 0,
    renderGroup: '基本货物信息',
  },
  {
    key: 'pieceWeight',//!spjsl
    label: '单重',
    align: 'left',
    fixed: false,
    columnOrder:900,
    width: '180px',
    inputType: 0,
    unit:'kg',
    filter(val){
      return Math.round(Number(val||0)*100)/100
    },
    renderGroup: '基本货物信息',
    rule:[
      { required: true, message: '单重不能为空', trigger: 'blur'},
      { pattern:/(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/, message: '件数必须为数字', trigger: 'blur' }
    ]
  },

  {
    key: '$positionId_1',//!ckcw
    label: '仓位',
    align: 'left',
    fixed: false,
    columnOrder:890,
    inputType: 1,
    renderGroup: '基本货物信息',
     options:{
      trigger:'$newWarehouseId',
      resolve(id){
        if(_.get(id,'value')){
          return positionsStoreInOptions(id.value)
        }
      }
    },
    rule:{
      required: true, message: '仓位不能为空', trigger: 'change'
    },
  },
  {
    key: '$skuNo',
    label: '客户条码',
    align: 'left',
    fixed: false,
    width:'100px',
    columnOrder:880,
    labelOrder:990,
    renderGroup: '概要',
  },
  {
    key: '$warehouseNo',
    label: '仓库条码',
    align: 'left',
    fixed: false,
    width:'100px',
    columnVisible:false,
    labelOrder:989,
    renderGroup: '概要',
  },
   //!拆分件数
  {
    key: 'number_3',//!spjs3
    label: '拆分件数',
    align: 'left',
    fixed: false,
    inputType: 0,
    columnVisible:false,
    renderGroup: '拆单信息',
  },
  //!拆分重量
  {
    key: 'splitWeight',
    label: '拆分重量',
    align: 'left',
    fixed: false,
    disabled:true,
    columnVisible:false,
    computed(formData){
      const val = Number(formData.pieceWeight || 0) * Number(formData.splitNumber || 0) / 1000
      return Object.is(val,NaN)? 0 : val.toFixed(4)
    },
    unit:'吨',
    inputType: 0,
    renderGroup: '拆单信息',
  },
  //!拆分入仓日期
  {
    key: 'date_3',//!ssrqid3
    label: '拆分入仓日期',
    fixed: false,
    columnVisible:false,
    inputType: 2,
    renderGroup: '拆单信息',
  },
  {
    key: '$positionId_3',
    label: '新仓位',
    columnVisible:false,
    fixed: false,
    inputType: 1,
    options:[],
    renderGroup: '拆单信息',
  },


  //!纱支
  //!产地
  //!工艺
  //!漂染性
  //!工序
  //!生产日期
  //!用途
  //!颜色
  {
    key: 'yarn',//!wpggA
    label: '纱支',
    align: 'left',
    fixed: false,
    columnVisible:false,
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
    columnVisible:false,
    inputType: 1,
    renderGroup: '高级货物信息',
    options:getTech()
  },
  {
    key: 'process',//!wpggC
    label: '工序',
    align: 'left',
    fixed: false,
    columnVisible:false,
    inputType: 1,
    renderGroup: '高级货物信息',
    options:getProcess()
  },
  {
    key: 'purpose',//!wpggD
    label: '用途',
    align: 'left',
    fixed: false,
    columnVisible:false,
    inputType: 1,
    renderGroup: '高级货物信息',
    options:getPurpose()
  },
  {
    key: 'origin',//!wpggE
    label: '产地',
    align: 'left',
    fixed: false,
    columnVisible:false,
    inputType: 1,
    renderGroup: '高级货物信息',
    options:getOrigin()
  },
  {
    key: 'bleach',//!wpggF
    label: '漂白性',
    align: 'left',
    fixed: false,
    columnVisible:false,
    inputType: 0,
    renderGroup: '高级货物信息',
    options:getBleach()

  },
  {
    key: 'manufactureDate',//!wpggG
    label: '生产日期',
    fixed: false,
    columnVisible:false,
    inputType: 2,
    renderGroup: '高级货物信息',

  },
  {
    key: 'color',//!wgppH
    label: '颜色',
    align: 'left',
    columnVisible:false,
    fixed: false,
    inputType: 0,
    renderGroup: '高级货物信息',

  },

]
