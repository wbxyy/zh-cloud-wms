// ?接口的字段很混乱，如果按接口的字段渲染表单，也会十分混乱
// ? 尝试编解码器的思想，自己前端做一套字段，建立map来映射接口的字段

// ?查询需要
// 单号，关联单号，外部单号，客户，入仓日期，条码，批号/柜号，仓库，仓位，审核状态，车牌
// ?自己命名
// 单号（$billNo）,关联单号（$relativeNo）,条码（$skuNo）,审核状态（verify）

// ?入仓需要
// 客户名，仓库名，外部单号，车牌，联系人，电话，身份证，实际结算方，单证备注，装卸费，作业量
// ?自己命名
// 客户名（customerName）/仓库名(warehouseName)/外部单号($outerNo)/车牌（plateNumber）
// 联系人(linkman)/电话（phone）/身份证（identity）/实际结算方(realSettlement)
// 单证备注（billRemark）//装卸费(stevedorage)//作业量(workingOut)

// ?明细需要
// 入仓日期，物品规格，批号，柜号，件数，单重，仓位，重量，品牌，纱支，工艺，工序，用途，产地
// 漂白性，生产日期，颜色，条码备注
// ?自己命名
// 入仓日期（receiptDate）,物品规格（specification），批号（$batchNo）,柜号（$shipNo），
// 件数（number），单重(pieceWeight),仓位（position）,重量（totalWeight）,品牌(brand)，
// 纱支（yarn）,工艺（tech），工序（process），用途（purpose），产地(origin)，
// 漂染性（bleach）,生产日期（manufactureDate）,颜色（color），条码备注(skuRemark)
//

// ?改单需要
// 改后仓库，改后仓位
// 拆单仓位，拆单入仓日期，拆单件数

// todo 本地字段<==>接口字段 的映射关系
// todo 客户名 customerName <==> khmc,spkhmc
// todo 仓库名 warehouseName <==> spckmc
// todo 外部单号 $outerNo <==> wbdh
// todo 车牌 plateNumber <==> dzzy6
// todo 联系人 linkman <==> dzzy7
// todo 电话 phone <==> dzzy8
// todo 身份证 identity <==> dzzy10
// todo 实际结算方 realSettlement <==> szkhmc
// todo 单证备注 billRemark <==> dzbz
// todo 装卸费 stevedorage <==> iszxf
// todo 作业量 workingOut <==> iszyl

// todo 打印次数 printCount <==> dzzy9
// todo 创建人 creator <==> rsopmc
// todo 创建时间 createDate <==> prrq
// todo 审核日期 verifyDate <==> SHrqid
// todo 入仓日期 receiptDate <==>  ssrqid，rqid1,rqid2
// todo 物品规格 specification <==> spzs
// todo 批号 $batchNo <==> spbh
// todo 柜号 $shipNo <==> spgh
// todo 件数 number <==> spjs
// todo 单重 pieceWeight <==> spjsl
// todo 仓位 position <==> ckcw,spcwid
// todo 重量 totalWeight <==> spsl
// todo 品牌 brand <==> spcd
// todo 纱支 yarn <==> wpggA
// todo 工艺 tech <==> wpggB
// todo 工序 process <==> wpggC
// todo 用途 purpose <==> wpggD
// todo 产地 origin <==> wpggE
// todo 漂染性 bleach <==> wpggF
// todo 生产日期 manufactureDate <==> wpggG
// todo 颜色 color <==> wpggH
// todo 条码备注 skuRemark <==> itbz,spbz

// todo 单号 $billNo <==> pzbh
// todo 关联单号 $relativeNo <==> pzbh1,yydh
// todo 外部单号 $outerNo <==> wbdh
// todo 客户名 customerName <==> khmc
// todo 入仓日期 receiptDate <==>  ssrqid，rqid1,rqid2
// todo 起始日期 <==> rqid1
// todo 结束日期 <==> rqid2
// todo 条码 $skuNo <==> sptm
// todo 柜号 $shipNo <==> spgh
// todo 仓库名 warehouseName <==> spckmc
// todo 仓位 position <==> ckcw,spcwid
// todo 审核状态 verify <==> shzt
// todo 车牌 plateNumber <==> dzzy6

// todo 拆分件数 splitNumber <==> spjs3
// todo 拆分重量 splitWeight <==> 不用传
// todo 拆分日期 splitDate <==> ssrqid3

// todo 单证id $billId <==> dzid，spdzid
// todo 客户id $customerId <==> khmcid,khid,spkhmcid
// todo 仓库id $warehouseId <==> Spckid
// todo 仓位id $positionId <==> Spckid
// todo 批号id $batchId <==> spbhid
// todo 入仓单详情表的主键id $skuId <==> spdzld

// todo 仓库条码 $warehouseNo <==> sptmc
// todo 商城 shop <==> khlx

// todo 审核人 approver <==> shrsmc
// todo 审核人id  $approverId <==> shrsmcid
