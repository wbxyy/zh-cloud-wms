import _ from 'lodash'
import { getWarehouseOptions,getPositionsOptions,getYarn,getTech,getPurpose,getProcess,getOrigin,getBleach } from '../data'
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
   //!入仓日期
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
  //!物品规格
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
  //!批号
  {
    key: '$batchNo',//!spbh
    label: '批号',
    align: 'left',
    fixed: false,
    inputType: 0,
    width: '200px',
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
    inputType: 0,
    width: '200px',
    renderGroup: '基本货物信息',
    // rule:{
    //   required: true, message: '柜号可以为空', trigger: 'blur'
    // }
  },
  //!件数
  {
    key: 'number',//!spjs
    label: '件数',
    align: 'left',
    fixed: false,
    inputType: 0,
    filter(val){
      return Number(val).toFixed(2)
    },
    renderGroup: '基本货物信息',
    rule:{
      required: true, message: '件数不能为空', trigger: 'blur'
    },
  },
  //!单重
  {
    key: 'pieceWeight',//!spjsl
    label: '单重',
    align: 'left',
    fixed: false,
    width: '180px',
    inputType: 0,
    unit:'kg',
    filter(val){
      return Number(val).toFixed(2)
    },
    renderGroup: '基本货物信息',
    rule:{
      required: true, message: '单重不能为空', trigger: 'blur'
    },
  },
  //!重量
  {
    key: 'totalWeight',//!spsl
    label: '重量',
    align: 'left',
    fixed: false,
    width: '180px',
    inputType: 0,
    computed(formData){
      const val = Number(formData.pieceWeight || 0) * Number(formData.number || 0) / 1000
      return val.toFixed(4)
    },
    disabled:true,
    unit:'吨',
    labelWidth:'200px',
    renderGroup: '基本货物信息',
  },
  //!品牌
  {
    key: 'brand',//!spcd
    label: '品牌',
    align: 'left',
    fixed: false,
    inputType: 0,
    renderGroup: '基本货物信息',
  },
  //!仓库
  {
    key: 'warehouse',//spckmc
    label: '原仓库',
    align: 'left',
    fixed: false,
    // disabled:true,
    width: '180px',
    renderGroup: '基本货物信息',
  },
  {
    key: '$newWarehouseId',
    label: '仓库',
    align: 'left',
    fixed: false,
    width: '180px',
    inputType: 1,
    // options:getWarehouseOptions(),
    options:{
      resolve(){
        console.log('拿仓库拿了几次');
        return getWarehouseOptions()
      }
    },
    renderGroup: '基本货物信息',
    rule:{
      required: true, message: '仓库不能为空', trigger: 'change'
    },
  },
  //!仓位
  {
    key: 'position',//!ckcw
    label: '原仓位',
    align: 'left',
    fixed: false,
    disabled:true,
    inputType: undefined,
    renderGroup: '基本货物信息',
  },
  {
    key: '$newPositionId',//!ckcw
    label: '仓位',
    align: 'left',
    fixed: false,
    inputType: 1,
    renderGroup: '基本货物信息',
     options:{
      trigger:'$newWarehouseId',
      resolve(id){
        console.log('拿仓位执行了几次');
        if(_.get(id,'value')){
          return getPositionsOptions(id.value)
        }
      }
    },
    rule:{
      required: true, message: '仓位不能为空', trigger: 'change'
    },
  },
  //!客户
  {
    key: 'customerName',//!spkhmc
    label: '客户',
    align: 'left',
    width:'320px',
    fixed: false,
    inputType: undefined,
    renderGroup: '基本货物信息',
  },
  //!备注
  {
    key: 'skuRemark',//!spbz
    label: '备注',
    align: 'left',
    fixed: false,
    width: '200px',
    inputType: 0,
    renderGroup: '其他信息',
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
    key: 'bleach',//!wpggF
    label: '漂白性',
    align: 'left',
    fixed: false,
    inputType: 0,
    renderGroup: '高级货物信息',
    options:getBleach()

  },
  {
    key: 'manufactureDate',//!wpggG
    label: '生产日期',
    align: 'center',
    fixed: false,
    inputType: 2,
    renderGroup: '高级货物信息',

  },
  {
    key: 'color',//!wgppH
    label: '颜色',
    align: 'left',
    fixed: false,
    inputType: 0,
    renderGroup: '高级货物信息',

  },
   //!拆分件数
  {
    key: 'splitNumber',//!spjs3
    label: '拆分件数',
    align: 'left',
    fixed: false,
    inputType: 0,
    renderGroup: '拆单信息',
  },
  //!拆分重量
  {
    key: 'splitWeight',
    label: '拆分重量',
    align: 'left',
    fixed: false,
    disabled:true,
    computed(formData){
      const val = Number(formData.pieceWeight || 0) * Number(formData.splitNumber || 0) / 1000
      return val.toFixed(4)
    },
    unit:'吨',
    inputType: 0,
    renderGroup: '拆单信息',
  },
  //!拆分入仓日期
  {
    key: 'splitDate',//!ssrqid3
    label: '拆分入仓日期',
    align: 'center',
    fixed: false,
    inputType: 2,
    renderGroup: '拆单信息',
  },
  {
    key: '$splitPositionId',
    label: '新仓位',
    align: 'center',
    fixed: false,
    inputType: 1,
    options:[],
    renderGroup: '拆单信息',
  },
  {
    key: '$warehouseId',
    label: '原仓库id',
    align: 'left',
    fixed: false,
    hidden:true,
    inputType: 1,
    options:getWarehouseOptions(),
    renderGroup: '基本货物信息',
    rule:{
      required: true, message: '原仓库id不能为空', trigger: 'change'
    },
  },
  {
    key: '$positionId',
    label: '原仓位id',
    align: 'left',
    fixed: false,
    hidden:true,
    inputType: 1,
    renderGroup: '基本货物信息',
    rule:{
      required: true, message: '原仓位id不能为空', trigger: 'change'
    },
  },
]
