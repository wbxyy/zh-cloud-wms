export const schemaStoreInList = {
  request: {
    $billNo: 'pzbh',
    $relativeNo: 'pzbh1',
    $outerNo: 'wbdh',
    customerName: 'khmc',
    startDate: 'rqid1',
    endDate: 'rqid2',
    $skuNo: 'sptm',
    $shipNo: 'spgh',
    warehouse: 'spckmc',
    position: 'ckcw',
    verify: 'shzt',
    plateNumber: 'dzzy6'
  },
  response: {
    billRemark: 'dzbz',
    $billId: 'dzid',
    plateNumber: 'dzzy6',
    linkman: 'dzzy7',
    phone: 'dzzy8',
    identity: 'dzzy10',
    printCount: 'dzzy9',
    realSettlement: 'dzzy12',
    stevedorage: 'iszxf',
    workingOut: 'iszyl',
    shop: 'khlx',
    customerName: 'khmc',
    $customerId: 'khmcid',
    createDate: 'prrq',
    $billNo: 'pzbh',
    creator: 'rsopmc',
    $creatorId: 'rsopmcid',
    verifyDate: 'shrqid',
    verify: 'shzt',
    approver: 'shrsmc',
    $approverId: 'shrsmcid',
    number: 'spjs',
    totalWeight: 'spsl',
    specification: 'spzs',
    receiptDate: 'ssrqid',
    $outerNo: 'wbdh',
    $relativeNo: 'yydh'
  }
}
export const schemaDelStoreIn = {

}
export const schemaStoreIn = {
  response: {
    receiptDate: 'ssrqid',
    specification: 'spzs',
    $batchNo: 'spbh',
    $shipNo: 'spgh',
    number: 'spjs',
    pieceWeight: 'spjsl',
    totalWeight: 'spsl',
    brand: 'spcd',
    warehouse: 'spckmc',
    position: 'ckcw',
    customerName: 'spkhmc',
    $skuNo: 'sptm',
    $warehouseNo: 'sptmc',
    skuRemark: 'spbz',
    $skuId: 'spdzld',
    $billId: 'spdzid',
    $batchId: 'spbhid',
    shop: 'khlx',
    yarn: 'wpggA',
    tech: 'wpggB',
    process: 'wpggC',
    purpose: 'wpggD',
    origin: 'wpggE',
    bleach: 'wpggF',
    manufactureDate: 'wpggG',
    color: 'wpggH',
    $customerId: 'spkhmcid',
    $warehouseId: 'spckid',
    $positionId: 'spcwid',
    realSettlement: 'szkhmc',
    verify: 'shzt'
  }
}
export const schemaUpdateStoreIn = {
  request: {
    billRemark: 'dzbz',
    $billId: 'dzid',
    plateNumber: 'dzzy6',
    linkman: 'dzzy7',
    phone: 'dzzy8',
    identity: 'dzzy10',
    stevedorage: 'iszxf',
    workingOut: 'iszyl',
    $outerNo: 'wbdh'
  }

}
export const schemaUpdateStoreInDetail = {
  request: {
    $billId: 'dzid',
    skuRemark: 'itbz',
    customerName: 'khmc',
    $customerId: 'khmcid',
    $batchNo: 'spbh',
    $batchId: 'spbhid',
    brand: 'spcd',
    $warehouseId: 'spckid',
    $newWarehouseId: 'spckid1',
    $positionId: 'spcwid',
    $newPositionId: 'spcwid1',
    $splitPositionId: 'spcwid3',
    $skuId: 'spdzld',
    $shipNo: 'spgh',
    number: 'spjs',
    splitNumber: 'spjs3',
    pieceWeight: 'spjsl',
    totalWeight: 'spsl',
    specification: 'spzs',
    receiptDate: 'ssrqid',
    splitDate: 'ssrqid3',
    $outerNo: 'wbdh',
    yarn: 'wpggA',
    tech: 'wpggB',
    process: 'wpggC',
    purpose: 'wpggD',
    origin: 'wpggE',
    bleach: 'wpggF',
    manufactureDate: 'wpggG',
    color: 'wpggH'
  }

}
export const schemaWarehousePositions = {
  response: {
    position: 'ckcw',
    $positionId: 'liid'
  }
}
export const schemaCreateStoreIn = {
  request: {
    billRemark: 'dzbz',
    $billId: 'dzid',
    plateNumber: 'dzzy6',
    linkman: 'dzzy7',
    phone: 'dzzy8',
    identity: 'dzzy10',
    list: 'inp',
    skuRemark: 'itbz',
    $batchNo: 'spbh',
    brand: 'spcd',
    position: 'spcwid',
    $shipNo: 'spgh',
    number: 'spjs',
    pieceWeight: 'spjsl',
    totalWeight: 'spsl',
    specification: 'spzs',
    receiptDate: 'ssrqid',
    yarn: 'wpggA',
    tech: 'wpggB',
    process: 'wpggC',
    purpose: 'wpggD',
    origin: 'wpggE',
    bleach: 'wpggF',
    manufactureDate: 'wpggG',
    color: 'wpggH',
    stevedorage: 'iszxf',
    workingOut: 'iszyl',
    shop: 'khlx',
    customerName: 'khmc',
    $customerId: 'khmcid',
    $warehouseId: 'spckid',
    warehouse: 'spckmc',
    realSettlement: 'szkhmc',
    $outerNo: 'wbdh'
  }

}
export const schemaWarehouseList = {
  response: {
    warehouse: 'spckmc',
    $warehouseId: 'spckid',
    legal: 'litter',
    stock: 'stock',
    area: 'area',
    rest: 'shengyu'
  }

}
export const schemaCustomerList = {
  response: {
    customerName: 'khmc',
    $customerId: 'khid'
  }
}
