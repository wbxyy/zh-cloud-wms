// ?✔
export const sampleCustomerStoreIn = {
  request: {
    'all': '',
    'isBa': '',
    'khmc': '',
    'khpb': 0,
    'name': '',
    'num': '',
    'shopId': 0,
    'spckid': '',
    'spckidis': []
  },
  response: {
    'total': 231,
    'rows': [
      {
        'khid': '26',
        'khmc': '中恒纺织交易市场（广东）有限公司',
        'zt': '启用状态',
        'jcl': '0E-10',
        // 'spkhmc': null,
        // 'spkhmcid': 0,
        'khlx': null,
        'spjs': 0,
        'spsl': 0,
        'jine1': 0,
        'jine2': 0,
        'jineb': null,
        'line': '0.00'
      }
    ],
    'code': 200,
    'msg': '查询成功'
  }
}

// ?现场出仓获取用户列表 ✔
export const sampleCustomerStoreOut = {
  request: {
    'isBa': '',
    'khmc': '',
    'khpb': 0,
    'shopId': 0,
    'spckid': '',
    'spckidis': []
  },
  response: {
    'code': 0,
    'msg': '',
    'rows': [
      {
        'ccpz': '',
        'ckccpz': '',
        'h2Jine': '',
        'hjine': '',
        'hwje': '',
        'khlx': '',
        'scx': '',
        'spjs': '',
        'spkhmc': '',
        'spkhmcid': '',
        'spsl': '',
        'tsje': ''
      }
    ],
    'total': 0
  }
}

// ? ✔
export const sampleCustomerStoreOutPlain = {
  response: {
    'msg': '操作成功',
    'code': 200,
    'data': [
      {
        'khmc': '11'
      }
    ]
  }
}

// ? ✔
export const sampleCustomerStoreMove = {
  request: {
    'isBa': '',
    'khmc': '',
    'khpb': 0,
    'shopId': 0,
    'spckidis': [],
    'spckmc': '',
    'spgh': ''
  },
  response: {
    'code': 0,
    'msg': '',
    'rows': [
      {
        'khid': '',
        'khlx': '',
        'khmc': '',
        'spckid': '',
        'spckmc': '',
        'spjs': '',
        'spsl': ''
      }
    ],
    'total': 0
  }
}
