const tableColumns = [
  {
    key: 'ssrqid',
    label: '入仓日期',
    align: 'center',
    fixed: false,
    width: '150px',
    inputType: 2,
    renderGroup: '基本货物信息'
  },
  {
    key: 'spzs',
    label: '物品规格',
    align: 'center',
    fixed: false,
    width: '200px',
    inputType: 0,
    renderGroup: '基本货物信息'
  },
  {
    key: 'spbh',
    label: '批号',
    align: 'center',
    fixed: false,
    width: '120px',
    inputType: 0,
    renderGroup: '基本货物信息'
  },
  {
    key: 'spgh',
    label: '柜号',
    align: 'center',
    fixed: false,
    width: '120px',
    inputType: 0,
    renderGroup: '基本货物信息'
  },
  {
    key: 'spjs',
    label: '件数',
    align: 'center',
    fixed: false,
    width: '120px',
    inputType: 0,
    renderGroup: '基本货物信息'
  },
  {
    key: 'spjsl',
    label: '单重（kg）',
    align: 'center',
    fixed: false,
    width: '120px',
    inputType: 0,
    renderGroup: '基本货物信息'
  },
  {
    key: 'spsl',
    label: '重量（吨）',
    align: 'center',
    fixed: false,
    width: '120px',
    inputType: 0,
    renderGroup: '基本货物信息'
  },
  {
    key: 'spcd',
    label: '品牌',
    align: 'center',
    fixed: false,
    width: '120px',
    inputType: 0,
    renderGroup: '基本货物信息'
  },
  {
    key: 'spcwid',
    label: '仓位',
    align: 'center',
    fixed: false,
    width: '150px',
    inputType: 1,
    renderGroup: '基本货物信息',
    options: [
      { label: '哈哈', value: '哈哈' }
    ]
  },
  {
    key: 'wpggA',
    label: '纱支',
    align: 'center',
    fixed: false,
    width: '150px',
    inputType: 1,
    renderGroup: '高级货物信息'
  },
  {
    key: 'wpggB',
    label: '工艺',
    align: 'center',
    fixed: false,
    width: '150px',
    inputType: 1,
    renderGroup: '高级货物信息'
  },
  {
    key: 'wpggC',
    label: '工序',
    align: 'center',
    fixed: false,
    width: '150px',
    inputType: 1,
    renderGroup: '高级货物信息'
  },
  {
    key: 'wpggD',
    label: '用途',
    align: 'center',
    fixed: false,
    width: '150px',
    inputType: 1,
    renderGroup: '高级货物信息'
  },
  {
    key: 'wpggE',
    label: '产地',
    align: 'center',
    fixed: false,
    width: '150px',
    inputType: 1,
    renderGroup: '高级货物信息'
  },
  {
    key: 'wpggF',
    label: '漂白性',
    align: 'center',
    fixed: false,
    width: '150px',
    inputType: 0,
    renderGroup: '高级货物信息'
  },
  {
    key: 'wpggG',
    label: '生产日期',
    align: 'center',
    fixed: false,
    width: '150px',
    inputType: 2,
    renderGroup: '高级货物信息'
  },
  {
    key: 'wpggH',
    label: '颜色',
    align: 'center',
    fixed: false,
    width: '120px',
    inputType: 0,
    renderGroup: '高级货物信息'
  },
  {
    key: 'itbz',
    label: '备注',
    align: 'center',
    fixed: false,
    width: '200px',
    inputType: 0,
    renderGroup: '其他信息'
  }
]

const arr = tableColumns.map(item=>[item.key,undefined])
console.log(arr);
const result = Object.fromEntries(arr)
console.log(result);
