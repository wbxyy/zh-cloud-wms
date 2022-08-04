

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
    key: 'stock',//!spckmc
    label: '库存',
    inputType: 3,
    disabled(formData){
      return !Boolean(formData.customerName)
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
    ]
  },
  {
    key: 'linkman',//!dzzy7
    label: '联系人',
    inputType:0,
  },
  {
    key: 'phone',//!dzzy8
    label: '电话',
    inputType:0,
  },
  {
    key: 'identity',//!dzzy10
    label: '身份证',
    inputType:0,
  },
  {
    key: 'realSettlement',
    label: '配送方式',
    inputType:1,
    options:[
      {
        label:'客户自提',
        value:'客户自提'
      },
      {
        label:'货运配送出仓',
        value:'货运配送出仓'
      }
    ],
  },
  {
    key: '$outerNo',//!wbdh
    label: '外部单号',
    inputType:0,
  },
  {
    key: 'billRemark',//!dzbz
    label: '备注',
    inputType:0,
  },
]


export const tableColumns = [
  {
    key: 'specification',//!spzs
    label: '物品规格',
    fixed: false,
    width: '160px',
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
    key: 'restNumber',//!spjs2
    label: '结存件数',
    fixed: false,
    width: '100px',
    renderGroup: '基本货物信息',
    filter(val){
      return Math.round(Number(val||0)*100)/100
    },
    error:'能够检索结存件数为0的库存（德宝璞）'//能够检索结存件数为0的库存（德宝璞）
  },
  {
    key: 'number',//!spjs
    label: '出仓件数',
    fixed: false,
    inputType: 0,
    width: '100px',
    filter(val){
      return Math.round(Number(val||0)*100)/100 || undefined
    },

    renderGroup: '基本货物信息',
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
    }
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
    key: 'date',
    label: '入仓日期',
    fixed: false,
    width: '120px',
    valueFormat:'yyyy-MM-dd',
    renderGroup: '基本货物信息',
  },
  {
    key: 'dischargeDate',
    label: '出仓日期',
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
    key: 'brand',//!spcd
    label: '品牌',
    align: 'left',
    fixed: false,
    width: '80px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'warehouse',
    label: '仓库',
    align: 'left',
    fixed: false,
    width: '80px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'position',
    label: '仓位',
    align: 'left',
    fixed: false,
    width: '60px',
    renderGroup: '基本货物信息',
  },
  {
    key: '$skuNo',
    label: '条码',
    align: 'left',
    fixed: false,
    width: '80px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'modifiedDate',
    label: '修改日期',
    align: 'left',
    fixed: false,
    width: '120px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'unitPrice',
    label: '估价单价',
    align: 'left',
    fixed: false,
    width: '100px',
    renderGroup: '基本货物信息',
    filter(val){
      return Number(val).toFixed(2)
    },
  },
  {
    key: 'totalPrice',
    label: '估价金额',
    align: 'left',
    fixed: false,
    width: '100px',
    renderGroup: '基本货物信息',
    filter(val){
      return Number(val).toFixed(2)
    },
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
