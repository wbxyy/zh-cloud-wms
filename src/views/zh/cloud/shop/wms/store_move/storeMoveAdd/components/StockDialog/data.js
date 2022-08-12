//sptm<==>$skuNo
//sptmc<==>$warehouseNo
//spckmc<==>warehouse
//ckcw<==>position
//spkhmc<==>customerName
//spjs2<==>restNumber(件数)
//spsl2<==>restWeight(重量)
//ssrqidn<==>dischargeDate(入仓日期)
//spdm未知，调仓单类别
//change<==>change货转次数
//spzs<==>specification(物品规格)
//spcd<==>brand(物品规格)
//spgh<==>$shipNo(柜号)
//spbh<==>$batchNo(批号)
//spjsz<==>pledgeNumber(质押件数)
//spslz<==>pledgeWeight(质押吨数)


export const tableColumns = [
  {
    key: '$skuNo',
    label: '客户条码',
    width:'100px',
  },
  {
    key: '$warehouseNo',
    label: '仓库条码',
    width:'100px',
  },
  {
    key: 'warehouse',
    label: '仓库',
    width: '120px',
  },
  {
    key: 'position',
    label: '仓位',
    width: '80px',
  },
  {
    key: 'customerName',//!spkhmc
    label: '客户',
    align: 'left',
    width:'280px',
  },
  {
    key: 'number_2',
    label: '件数',
    filter(val){
      return Math.round(Number(val||0)*100)/100
    }
  },
  {
    key: 'restWeight',
    label: '重量',
    unit:'吨',
    filter(val){
      return Math.round(Number(val||0)*100)/100
    }
  },
  {
    key: 'date_n',//!ssrqidn
    label: '入仓日期',
    width:'100px',
  },
  {
    key: 'specification',//!spzs
    label: '物品规格',
    width: '100px',
  },

   {
    key: '$batchNo',//!spbh
    label: '批号',
    width:'120px'
  },
  {
    key: '$shipNo',//!spgh
    label: '柜号',
    width:'120px'
  },
  {
    key: 'brand',//!spcd
    label: '品牌',
    width:'80px'
  },
  {
    key: 'yarn',//!wpggA
    label: '纱支',
    width:'80px'
  },
  {
    key: 'tech',//!wpggB
    label: '工艺',
    width:'80px'
  },
  {
    key: 'process',//!wpggC
    label: '工序',
    width:'80px'
  },
  {
    key: 'purpose',//!wpggD
    label: '用途',
    width:'80px'
  },
  {
    key: 'origin',//!wpggE
    label: '产地',
    width:'80px'
  },
  {
    key: 'bleach',//wpggF
    label: '漂染性',
    width:'80px'
  },
  {
    key: 'manufactureDate',//!wpggG
    label: '生产日期',
    width:'100px',
  },
  {
    key: 'color',//!wpggH
    label: '颜色',
    width:'80px'
  },
  {
    key: 'pledgeNumber',
    label: '质押件数',
    width:'100px',
    filter(val){
      return Math.round(Number(val||0)*100)/100
    }
  },
  {
    key: 'pledgeWeight',
    label: '质押重量(吨)',
    width:'100px',
    filter(val){
      return Math.round(Number(val||0)*100)/100
    }
  },
]



export const formLabel = [
  {
    key: '$skuNo',//!✔
    label: '条码',
    inputType:0,
  },
  {
    key: '$shipNo',//!✔
    label: '柜号',
    inputType:0,
  },
  {
    key: '$batchNo',//!✔
    label: '批号',
    inputType:0,
  },
  {
    key: 'specification',//!✔
    label: '物品规格',
    inputType:0,
  },
  {
    key: 'skuName',//!✔
    label: '物品名称',
    inputType:0,
  },
  {
    key: 'brand',//!✔
    label: '品牌',
    inputType:0,
  },
]
