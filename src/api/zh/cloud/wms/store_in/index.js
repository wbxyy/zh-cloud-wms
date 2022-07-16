import service from '@/utils/request'
import _ from 'lodash'
import { resMapping, reqMapping, transformData, transformSelect } from '@/utils/sugar'
import { schemaStoreInList,
  schemaDelStoreIn,
  schemaStoreIn,
  schemaUpdateStoreIn,
  schemaUpdateStoreInDetail,
  schemaWarehousePositions,
  schemaCreateStoreIn,
  schemaWarehouseList,
  schemaCustomerList } from './schema'
// 构造新实例
const request = service.create()

// 响应拦截器=》放在1号位
request.interceptors.response.use(res => {
  if (_.get(res.config.mapping, 'response')) {
    // console.log('响应转换前：', _.cloneDeep(res.data))
    res.data = resMapping(res.data, res.config.mapping.response)
    // console.log('响应转换后', _.cloneDeep(res.data))
  }
  return res
})

// 继承拦截器
request.interceptors.response.handlers = _.concat(request.interceptors.response.handlers, service.interceptors.response.handlers)
request.interceptors.request.handlers = _.concat(request.interceptors.request.handlers, service.interceptors.request.handlers)

// 请求拦截器=》放在1号位
// ?用来映射接口数据，添加幽灵字段
request.interceptors.request.use(config => {
  // ? 允许重复提交
  config.headers.repeatSubmit = false

  // 自带mapping,还是通用mapping
  if (_.get(config.mapping, 'request')) {
    config.data = reqMapping(config.data, config.mapping.request)
  }

  transformSelect(undefined, undefined, config.data)

  if (config.sample) {
    config.data = transformData(config.data, config.sample)
  }
  return config
})

// ? 货物入仓->入仓单table:查询入仓单列表
export function storeInList({ data, params }) {
  return request({
    url: '/storage/hwrc/list',
    method: 'post',
    data,
    params,
    mapping: schemaStoreInList
  })
}

// ?删除入仓单
export function delStoreIn(data) {
  return request({
    url: '/storage/hwrc/del',
    method: 'post',
    data,
    mapping: schemaDelStoreIn
  })
}

// ?获取入仓单详情
export function storeIn(dzid) {
  const shztn = 0
  return request({
    url: `/storage/hwrc/detail/${dzid}/${shztn}`,
    method: 'post',
    mapping: schemaStoreIn
  })
}

// ? 入仓单修改(外围)
export function updateStoreIn(data) {
  console.log(data)
  const sample = {
    'dzbz': '',
    'dzid': '',
    'dzzy10': '',
    'dzzy6': '',
    'dzzy7': '',
    'dzzy8': '',
    'iszxf': '',
    'iszyl': '',
    'wbdh': ''
  }
  return request({
    url: `/storage/hwrc/modifyInfo`,
    method: 'post',
    data,
    sample,
    mapping: schemaUpdateStoreIn
  })
}

// ?入仓单修改（明细）
export function updateStoreInDetail(data) {
  // todo 修改入仓单，接口需要字段
  // spdzld:条码id <==> $skuId
  // spdzid:单证id <==> $billId
  // spbhid:批号id <==> $batchId
  // spkhmcid:客户id <==> $customerId
  // spckid:仓库id <==> $warehouseId
  console.log('$skuId', data.$skuId)
  console.log('$billId', data.$billId)
  console.log('$batchId', data.$batchId)
  console.log('$customerId', data.$customerId)
  console.log('$warehouseId', data.$warehouseId)
  console.log('$positionId', data.$positionId)
  // #region
  const sample = {
    'dzid': 0,
    'itbz': '',
    'khmc': '',
    'khmcid': '',
    'spbh': '',
    'spbhid': '',
    'spcd': '',
    'spckid': '',
    'spckid1': '',
    'spcwid': '',
    'spcwid1': '',
    'spcwid3': '',
    'spdzld': 0,
    'spgh': '',
    'spjs': '',
    'spjs3': '',
    'spjsl': '',
    'spmc': '',
    'spsl': '',
    'spzs': '',
    'ssrqid': '',
    'ssrqid3': '',
    'wbdh': '',
    'wpggA': '',
    'wpggB': '',
    'wpggC': '',
    'wpggD': '',
    'wpggE': '',
    'wpggF': '',
    'wpggG': '',
    'wpggH': ''
  }
  // #endregion
  return request({
    url: `/storage/hwrc/modify`,
    method: 'post',
    data,
    sample,
    mapping: schemaUpdateStoreInDetail
  })
}

// ? 货物入仓->仓位下拉：根据仓库id获取仓位列表
export function warehousePositions(warehouseId) {
  return request({
    url: `/storage/category/selectPosition/${warehouseId}`,
    method: 'post',
    mapping: schemaWarehousePositions
  })
}

// ? 货物入仓->添加入仓单
export function createStoreIn(data) {
  // #region
  const sample = {
    'dzbz': '',
    'dzid': 0,
    'dzzy10': '',
    'dzzy6': '',
    'dzzy7': '',
    'dzzy8': '',
    'inp': [
      {
        'itbz': '',
        'spbh': '',
        'spcd': '',
        'spcwid': '',
        'spgh': '',
        'spjs': '',
        'spjsl': '',
        'spmc': '',
        'spsl': '',
        'spzs': '',
        'ssrqid': '',
        'wpggA': '',
        'wpggB': '',
        'wpggC': '',
        'wpggD': '',
        'wpggE': '',
        'wpggF': '',
        'wpggG': '',
        'wpggH': ''
      }
    ],
    'iszxf': '',
    'iszyl': '',
    'khlx': '',
    'khmc': '',
    'khmcid': '',
    'spckid': '',
    'spckmc': '',
    'szkhmc': '',
    'wbdh': ''
  }
  // #endregion
  return request({
    url: `/storage/hwrc/add`,
    method: 'post',
    data,
    sample,
    mapping: schemaCreateStoreIn
  })
}

// ? 货物入仓->仓库下拉/选择仓库：获取仓库列表
//! 设置默认值防止解构undefined报错
export function warehouseList({ data, params } = {}) {
  const _data = {
    'all': '',
    'khmc': '',
    'khpb': 0,
    'name': '',
    'num': '',
    'shopId': 0,
    'spckid': '',
    'spckidis': []
  }
  const _params = {
    pageNum: 1,
    pageSize: 100000
  }
  return request({
    url: `/storage/zdspck/selectWarehouse1`,
    method: 'post',
    data: Object.assign(_data, data),
    params: Object.assign(_params, params),
    mapping: schemaWarehouseList
  })
}
// ? 货物入仓->添加入仓单：获取客户列表
export function customerList({ data, params } = {}) {
  const _data = {
    'all': '',
    'khmc': '',
    'khpb': 0,
    'name': '',
    'num': '',
    'shopId': 0,
    'spckid': '',
    'spckidis': []
  }
  const _params = {
    pageNum: 1,
    pageSize: 100000
  }
  return request({
    url: '/storage/shop/selectCustomer',
    method: 'post',
    data: Object.assign(_data, data),
    params: Object.assign(_params, params),
    mapping: schemaCustomerList
  })
}

// const commonIdMapping = {
//   $customerId: 'khid',
//   $warehouseId: 'spckid',
//   $billId: 'dzid',
//   $positionId: 'liid',
//   $skuId: 'spdzld',
//   $batchId: 'spbhid'
// }
// const commonMapping = {
//   customerName: 'khmc',
//   warehouse: 'spckmc',
//   receiptDate: 'ssrqid',
//   specification: 'spzs',
//   $batchNo: 'spbh',
//   $shipNo: 'spgh',
//   $skuNo: 'sptm',
//   number: 'spjs',
//   pieceWeight: 'spjsl',
//   totalWeight: 'spsl',
//   brand: 'spcd',
//   position: 'ckcw',
//   creator: 'rsopmc',
//   createDate: 'prrq',
//   verifyDate: 'shrqid',
//   skuRemark: 'spbz',
//   billRemark: 'dzbz',
//   $relativeNo: 'pzbh1',
//   $outerNo: 'wbdh',
//   $billNo: 'pzbh',
//   verify: 'shzt',
//   yarn: 'wpggA',
//   tech: 'wpggB',
//   process: 'wpggC',
//   purpose: 'wpggD',
//   origin: 'wpggE',
//   bleach: 'wpggF',
//   manufactureDate: 'wpggG',
//   color: 'wpggH',
//   plateNumber: 'dzzy6',
//   linkman: 'dzzy7',
//   phone: 'dzzy8',
//   printCount: 'dzzy9',
//   identity: 'dzzy10',
//   realSettlement: 'dzzy12',
//   stevedorage: 'iszxf',
//   workingOut: 'iszyl',
//   list: 'inp',
//   splitNumber: 'spjs3',
//   splitDate: 'ssrqid3'
// }

// export const receiveMapping = Object.assign({}, commonIdMapping, commonMapping)
// export const publishMapping = Object.assign({}, commonIdMapping, commonMapping, {
//   customerName: 'spkhmc',
//   position: 'spcwid',
//   startDate: 'rqid1',
//   endDate: 'rqid2',
//   skuRemark: 'itbz',

//   // 仓库id
//   $warehouseId: 'spckid', // ✔
//   // 仓位id
//   $positionId: 'spcwid', // ✔
//   // 客户id
//   $customerId: 'khmcid', // ✔

//   // skuId
//   $skuId: 'spdzld', // ✔
//   // dzid
//   $billId: 'dzid', // ✔
//   // 批号id
//   $batchId: 'spbhid'// ✔

// })

// ?这个后端的接口对不上，心很累，一堆属性，没有中文字段，一个id三种属性名

// ?做了字段映射，还是对不上，频繁的未响应
