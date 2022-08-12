// samplePositionStoreIn
export const samplePositionsStoreIn = {
  response: {
    'msg': '操作成功',
    'code': 200,
    'data': [
      {
        'ckcw': 'DTS',
        'liid': 168
      }
    ]
  }
}

// sampleWarehouseStoreIn
export const sampleWarehouseStoreIn = {
  request: {
    'isBa': '',
    'khmcid': '',
    'khpb': 0,
    'shopId': 0,
    'spckidis': [],
    'spckmc': ''
  },
  response: {
    'code': 0,
    'msg': '',
    'rows': [
      {
        'area': '',
        'litter': '',
        'shengyu': '',
        'spckbz': '',
        'spckid': '',
        'spckmc': '',
        'stock': ''
      }
    ],
    'total': 0
  }
}

export const sampleWarehouseStoreMove = {
  response: {
    'msg': '操作成功',
    'code': 200,
    'data': [
      {
        'spckid': 55,
        'spckmc': '罗村邦诚仓'
      }
    ]
  }
}

export const sampleWarehouseStoreOut = {
  response:
  {
    'msg': '操作成功',
    'code': 200,
    'data': [
      {
        'spckid': 53,
        'spckmc': '兆发'
      }
    ]
  }
}

export const samplePositionsStoreMove = {
  response: {
    'total': 279,
    'rows': [
      {
        'shengyu': '超出0.0010000888',
        'ckcw': 'DTS',
        'cwbz': '',
        'spckid': 55,
        'liid': 165,
        'spckbz': '',
        'spckmc': '罗村邦诚仓'
      }
    ],
    'code': 200,
    'msg': '查询成功'
  }
}
