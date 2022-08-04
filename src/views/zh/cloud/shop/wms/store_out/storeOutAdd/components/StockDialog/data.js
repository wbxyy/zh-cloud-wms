export const tableColumns = [
  {
    key: 'customerName',
    label: '客户',
    align: 'left',
    fixed: true,
    width: '250px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'specification',
    label: '物品规格',
    align: 'left',
    fixed: false,
    width: '100px',
    renderGroup: '基本货物信息',
  },
  {
    key: '$batchNo',
    label: '批号',
    align: 'left',
    fixed: false,
    width: '100px',
    renderGroup: '基本货物信息',
  },
  {
    key: '$shipNo',
    label: '柜号',
    align: 'left',
    fixed: false,
    width: '130px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'brand',
    label: '品牌',
    align: 'left',
    fixed: false,
    width: '80px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'restNumber',
    label: '剩余件数',
    align: 'left',
    fixed: false,
    width: '80px',
    renderGroup: '基本货物信息',
    filter(val){
      return Math.round(val*100)/100
    }
  },
  {
    key: 'pieceWeight',
    label: '单重(kg)',
    align: 'left',
    fixed: false,
    width: '80px',
    renderGroup: '基本货物信息',
    filter(val){
      return Math.round(val*100)/100
    }
  },
  {
    key: 'restWeight',
    label: '剩余重量(吨)',
    align: 'left',
    fixed: false,
    width: '100px',
    renderGroup: '基本货物信息',
    filter(val){
      return Math.round(val*100)/100
    }
  },
  {
    key: 'warehouse',
    label: '仓库',
    align: 'left',
    fixed: false,
    width: '100px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'position',
    label: '仓位',
    align: 'left',
    fixed: false,
    width: '80px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'date',
    label: '入仓日期',
    align: 'left',
    fixed: false,
    width: '100px',
    renderGroup: '基本货物信息',
  },
  {
    key: '$skuNo',
    label: '条码',
    align: 'left',
    fixed: false,
    width: '100px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'unitPrice',
    label: '估价单价',
    align: 'left',
    fixed: false,
    width: '80px',
    renderGroup: '基本货物信息',
    filter(val){
      return Math.round(val*100)/100
    }
  },
  {
    key: 'pledgeNumber',
    label: '质押件数',
    align: 'left',
    fixed: false,
    width: '80px',
    renderGroup: '基本货物信息',
    filter(val){
      return Math.round(val*100)/100
    }
  },
  {
    key: 'pledgeWeight',
    label: '质押重量(吨)',
    align: 'left',
    fixed: false,
    width: '100px',
    renderGroup: '基本货物信息',
    filter(val){
      return Math.round(val*100)/100
    }
  },
]

export const formLabel = [
  {
    key: '$skuNo',
    label: '条码',
    inputType:0,
  },
  {
    key: '$shipNo',
    label: '柜号',
    inputType:0,
  },
  {
    key: '$batchNo',
    label: '批号',
    inputType:0,
  },
  {
    key: 'warehouse',
    label: '仓库',
    inputType:0,
  },
  {
    key: 'position',
    label: '仓位',
    inputType:0,
  },
  {
    key: 'specification',
    label: '物品规格',
    inputType:0,
  },
  {
    key: 'skuName',
    label: '物品名称',
    inputType:0,
  },
  {
    key: 'brand',
    label: '品牌',
    inputType:0,
  },
]
