import _ from 'lodash'
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
   {
    key: 'customerName',
    label: '客户',
    align: 'left',
    width:'240px',
    columnOrder:1000,
    renderGroup: '概要',
  },
  {
    key: 'dischargeDate',
    label: '出仓日期',
    columnOrder:1040,
    inputType: 2,
    valueFormat:'yyyy-MM-dd',
    renderGroup: '出仓信息',
    rule:{
      required: true, message: '出仓日期不能为空', trigger: 'change'
    },
  },
  {
    key: 'restNumber',
    label: '剩余件数',
    columnOrder:1030,
    renderGroup: '出仓信息',
    rule:{
      required: true, message: '出仓日期不能为空', trigger: 'change'
    },
    unit:'件',
    filter(val){
      return Math.round(Number(val||0)*100)/100
    },
  },
   {
    key: 'number',
    label: '出仓件数',
    align: 'left',
    columnOrder:1020,
    inputType: 0,
    unit:'件',
    filter(val){
      return Math.round(Number(val||0)*100)/100
    },
    renderGroup: '出仓信息',
    rule(formData){
      return [
        {required: true, message: '件数不能为空', trigger: 'blur'},
        { pattern:/(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/, message: '件数必须为数字(最多2位小数)', trigger: 'blur' },
        {
          validator(rule, value, callback) {
            if(value > formData.restNumber){
              callback(new Error('件数超过了剩余库存'))
            }
            callback()
          },
        },
      ]
    },
  },
  {
    key: 'specification',
    label: '物品规格',
    align: 'left',
    columnOrder:920,
    width: '150px',
    renderGroup: '基本货物信息',
  },
  {
    key: '$batchNo',
    label: '批号',
    align: 'left',
    columnOrder:940,
    renderGroup: '基本货物信息',
  },
  {
    key: '$shipNo',
    label: '柜号',
    align: 'left',
    columnOrder:930,
    renderGroup: '基本货物信息',
  },
  {
    key: 'pieceWeight',//!spjsl
    label: '单重',
    align: 'left',
    columnOrder:900,
    width: '120px',
    unit:'kg',
    filter(val){
      return Number(val).toFixed(2)
    },
    renderGroup: '基本货物信息',
  },
  {
    key: 'totalWeight',
    label: '重量',
    align: 'left',
    columnOrder:950,
    width: '120px',
    computed(formData){
      const val = Number(formData.pieceWeight || 0) * Number(formData.number || 0) / 1000
      return Object.is(val,NaN) ? 0 : val.toFixed(4)
    },
    disabled:true,
    unit:'吨',
    renderGroup: '基本货物信息',
  },
  {
    key: 'date',//!ssrqid
    label: '入仓日期',
    columnOrder:1010,
    width:'100px',
    valueFormat:'yyyy-MM-dd',
    renderGroup: '基本货物信息',
  },
  {
    key: 'brand',//!spcd
    label: '品牌',
    align: 'left',
    columnOrder:910,
    // inputType: 0,
    renderGroup: '基本货物信息',
  },
  {
    key: 'warehouse',
    label: '仓库',
    align: 'left',
    columnVisible:false,
    width: '180px',
    renderGroup: '概要',
  },
  {
    key: 'position',
    label: '仓位',
    align: 'left',
    columnVisible:false,
    renderGroup: '概要',
  },
  {
    key: '$skuId',
    label: '客户条码',
    align: 'left',
    width:'100px',
    columnOrder:880,
    renderGroup: '基本货物信息',
  },
  {
    key: '$warehouseNo',
    label: '仓库条码',
    align: 'left',
    width:'100px',
    columnOrder:880,
    renderGroup: '基本货物信息',
  },
  {
    key: 'billType',
    label: '单据类别',
    align: 'left',
    width: '120px',
    renderGroup: '概要',
  },
  {
    key: 'skuRemark',
    label: '备注',
    align: 'left',
    width: '150px',
    renderGroup: '其他信息',
  },

]
