// <!--printNeed 新模版名称类型接口字段-->
export const PurchaseIn = {
  Name: '采购入库单',
  Type: 'PurchaseIn',
  isEnable: true,
  TemplateType: '2009',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true, isAloneRow: false, isQrCode: true },
      { keyName: 'purchaseInboundOrder', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'purchaseRequestOrder', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'warehouseCode', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'callInArea', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'stateIn', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'createName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'deptName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'purchaseCreateDate', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'note', isChecked: true, isHeader: false, isAloneRow: false }
    ],
    tbodyInfo: [
      { keyName: 'materialNo', isChecked: true },
      { keyName: 'materialName', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'price', isChecked: true },
      { keyName: 'purchaseInQty', isChecked: true },
      { keyName: 'sendQty', isChecked: true },
      { keyName: 'purchaseInQtyIn', isChecked: true },
      { keyName: 'realAmount', isChecked: true },
      { keyName: 'statusShow', isChecked: true }
    ]
  },
  printTempBdDiction: {
    materialNo: {
      Id: 'materialNo',
      Key: 'materialNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'materialNo',
      widthRate: 1,
      testValue: 1
    },
    materialName: {
      Id: 'materialName',
      Key: 'materialName',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'materialName',
      widthRate: 1,
      testValue: 1
    },
    unit: {
      Id: 'unit',
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'unit',
      widthRate: 4,
      testValue: '单位'
    },
    price: {
      Id: 'price',
      Key: 'price',
      Name: '单价',
      Alias: '',
      IsChecked: false,
      Value: 'price',
      widthRate: 1,
      testValue: '1'
    },
    purchaseInQty: {
      Id: 'purchaseInQty',
      Key: 'purchaseInQty',
      Name: '订单总数',
      Alias: '',
      IsChecked: false,
      Value: 'qty',
      widthRate: 1,
      testValue: '1'
    },
    sendQty: {
      Id: 'sendQty',
      Key: 'sendQty',
      Name: '已发数量',
      Alias: '',
      IsChecked: false,
      Value: 'sendQty',
      widthRate: 1,
      testValue: '1'
    },
    purchaseInQtyIn: {
      Id: 'purchaseInQtyIn',
      Key: 'purchaseInQtyIn',
      Name: '入库数量',
      Alias: '',
      IsChecked: false,
      Value: 'amount',
      widthRate: 1,
      testValue: '1'
    },
    realAmount: {
      Id: 'realAmount',
      Key: 'realAmount',
      Name: '实际入库数量',
      Alias: '',
      IsChecked: false,
      Value: 'realAmount',
      widthRate: 1,
      testValue: '1'
    },
    statusShow: {
      Id: 'statusShow',
      Key: 'statusShow',
      Name: '入库状态',
      Alias: '',
      IsChecked: false,
      Value: 'status',
      widthRate: 1,
      testValue: '1'
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'purchaseInboundOrder'
    },
    purchaseInboundOrder: {
      Key: 'purchaseInboundOrder',
      Name: '采购入库单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'purchaseInboundOrder'
    },
    purchaseRequestOrder: {
      Key: 'purchaseRequestOrder',
      Name: '采购订单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'purchaseRequestOrder'
    },
    warehouseCode: {
      Key: 'warehouseCode',
      Name: '调入仓库',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'warehouseCode'
    },
    callInArea: {
      Key: 'callInArea',
      Name: '调入库区',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'inArea'
    },
    stateIn: {
      Key: 'stateIn',
      Name: '入库状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'status'
    },
    createName: {
      Key: 'createName',
      Name: '制单人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'createName'
    },
    deptName: {
      Key: 'deptName',
      Name: '制单部门',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'deptName'
    },
    purchaseCreateDate: {
      Key: 'purchaseCreateDate',
      Name: '制单时间',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'createDate'
    },
    note: {
      Key: 'note',
      Name: '备注',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'note'
    }
  },
  testData: {
    headerInfo: {
      qrcode: '1111111111111',
      purchaseInboundOrder: '12345678901234455667',
      purchaseRequestOrder: '99999999999999999999',
      warehouseCode: '0000001',
      inArea: '0001kuqu',
      status: 2,
      createName: '测试人员',
      deptName: '测试部',
      createDate: 1529913429589,
      note: '备注12345'
    },
    dataList: [{
      materialNo: '95386',
      materialName: '测试物料1',
      unit: '个',
      price: 100,
      qty: 100,
      sendQty: 100,
      amount: 100,
      realAmount: 100,
      status: 2
    }, {
      materialNo: '910006',
      materialName: '测试物料2',
      unit: '箱',
      price: 200,
      qty: 200,
      sendQty: 200,
      amount: 200,
      realAmount: 200,
      status: 2
    }]
  }
};
export const SaleOrder = {
  Name: '发货通知单',
  Type: 'SaleOrder',
  isEnable: false,
  Interface: '/deliveryNote/itemList',
  TemplateUrl: 'view/print/templateTable.html',
  TemplateType: '1002',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true },
      { keyName: 'reverseOrder', isChecked: true, isHeader: true },
      { keyName: 'deliveryNo', isChecked: true, isHeader: true },
      { keyName: 'customerName', isChecked: true, isHeader: true },
      { keyName: 'warehouseNumber', isChecked: true, isHeader: true },
      { keyName: 'isPostingAccount', isChecked: true, isHeader: true },
      { keyName: 'auditUserName', isChecked: true, isHeader: true },
      { keyName: 'auditStatus', isChecked: true, isHeader: true },
      { keyName: 'auditDate', isChecked: true, isHeader: true },
      { keyName: 'auditOpinion', isChecked: true, isHeader: true },
      { keyName: 'note', isChecked: true, isHeader: true }
    ],
    tbodyInfo: [
      { keyName: 'materialNo', isChecked: true },
      { keyName: 'materialName', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'applyDeliverQty', isChecked: true },
      { keyName: 'realDeliverQty', isChecked: true },
      { keyName: 'planQtyIn', isChecked: true },
      { keyName: 'realQtyIn', isChecked: true },
      { keyName: 'statusShow', isChecked: true }
    ]
  },
  cacheHeaderFootDiction: {
    deliveryNo: {
      Key: 'deliveryNo',
      Name: '发货通知单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.deliveryNo'
    },
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'Item.headerInfo.qrcode'
    },
    purchaseUnit: {
      Key: 'purchaseUnit',
      Name: '客户名称',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.purchaseOrgName'
    },
    saleNo: {
      Key: 'saleNo',
      Name: '销售意向单',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.saleNo'
    },
    purchaseNo: {
      Key: 'purchaseNo',
      Name: '采购单号',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.purchaseNo'
    },
    sapOutNo: {
      Key: 'sapOutNo',
      Name: 'sap关联单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.sapOutNo'
    },
    sapSaleOrder: {
      Key: 'sapSaleOrder',
      Name: 'SAP销售订单',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.sapSaleOrder'
    },
    sapOutBill: {
      Key: 'sapOutBill',
      Name: 'SAP外向发货单',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.sapOutBill'
    },
    materialsNo: {
      Key: 'materialsNo',
      Name: '物料凭证',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.materialsNo'
    },
    purchaseLevelName: {
      Key: 'purchaseLevelName',
      Name: '采购级别',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.purchaseLevelName'
    },
    purchaseOrgId: {
      Key: 'purchaseOrgId',
      Name: '售达方',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.purchaseOrgId'
    },
    deliveryOrgId: {
      Key: 'deliveryOrgId',
      Name: '送达方',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.purchaseOrgId' // 送达方和售达方目前字段值一样
    },
    customerPurchaseCode: {
      Key: 'customerPurchaseCode',
      Name: '采购订单编号',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.customerPurchaseCode'
    },
    distributionChannelName: {
      Key: 'distributionChannelName',
      Name: '分销渠道',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.distributionChannelName'
    },
    payConditionName: {
      Key: 'payConditionName',
      Name: '付款条件',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.payConditionName'
    },
    orderType: {
      Key: 'orderType',
      Name: '订单类型',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.orderType'
    },
    deliveryTypeName: {
      Key: 'deliveryTypeName',
      Name: '发运方式',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.deliveryTypeName'
    },
    settleTypeName: {
      Key: 'settleTypeName',
      Name: '结算方式',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.settleTypeName'
    },
    outLocation: {
      Key: 'outLocation',
      Name: '发出仓库',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.outLocation'
    },
    outArea: {
      Key: 'outArea',
      Name: '发出库区',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.outArea'
    },
    receiverName: {
      Key: 'receiverName',
      Name: '收货人',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.receiverName'
    },
    receiverPhone: {
      Key: 'receiverPhone',
      Name: '联系方式',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.receiverPhone'
    },
    receiverFax: {
      Key: 'receiverFax',
      Name: '传真',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.receiverFax'
    },
    address: {
      Key: 'address',
      Name: '收货地址',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.address'
    },
    note: {
      Key: 'note',
      Name: '备注',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: false,
      Value: 'Item.headerInfo.note'
    },
    applyName: {
      Key: 'applyName',
      Name: '申请人',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: false,
      Value: 'Item.headerInfo.createName'
    },
    createDate: {
      Key: 'createDate',
      Name: '申请日期',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: false,
      Value: 'Item.headerInfo.createDate'
    },
    printDate: {
      Key: 'printDate',
      Name: '打印日期',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: false,
      Value: 'Item.headerInfo.printDate'
    },
    totalPrice: {
      Key: 'totalPrice',
      Name: '总价',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: false,
      Value: 'Item.headerInfo.totalDiscountPrice'
    }
  },
  printTempBdDiction: {
    materialsNo: {
      Key: 'materialsNo',
      Name: '物料编号',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialsNo',
      widthRate: 1
    },
    materialsDes: {
      Key: 'materialsDes',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialsDes',
      widthRate: 4
    },
    unit: {
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'pro.unit',
      widthRate: 2.5
    },
    unitPriceAfterAdjust: {
      Key: 'unitPriceAfterAdjust',
      Name: '单价',
      Alias: '',
      IsChecked: true,
      Value: 'pro.unitPriceAfterAdjust',
      widthRate: 2.5
    },
    amountAfterAdjust: {
      Key: 'amountAfterAdjust',
      Name: '订单总数',
      Alias: '',
      IsChecked: false,
      Value: 'pro.amountAfterAdjust',
      widthRate: 2
    },
    sendQty: {
      Key: 'sendQty',
      Name: '已发数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.sendQty',
      widthRate: 1
    },
    deliveryQty: {
      Key: 'deliveryQty',
      Name: '本次发货',
      Alias: '',
      IsChecked: false,
      Value: 'pro.deliveryQty',
      widthRate: 2
    },
    defaultLocation: {
      Key: 'defaultLocation',
      Name: '默认储位',
      Alias: '',
      IsChecked: false,
      Value: 'pro.stockLocation',
      widthRate: 2
    },
    totalPrice: {
      Key: 'totalPrice',
      Name: '总价',
      Alias: '',
      IsChecked: false,
      Value: 'pro.totalPriceAfterAdjust',
      widthRate: 2
    },
    priceGroup: {
      Key: 'priceGroup',
      Name: '价格组',
      Alias: '',
      IsChecked: false,
      Value: 'pro.priceGroup',
      widthRate: 2
    },
    otherRemark: {
      Key: 'otherRemark',
      Name: '其它',
      Alias: '',
      IsChecked: false,
      Value: 'pro.otherRemark',
      widthRate: 2
    }

  },

};
/**
 * 其它出库单 2001
 * **/
export const UnusualOut = {
  Name: '其它出库单',
  Type: 'UnusualOut',
  isEnable: true,
  Interface: '/abnormalOut/item',
  TemplateType: '2001',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true, isAloneRow: false, isQrCode: true },
      { keyName: 'abnormalNo', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'type', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'innerOrder', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'innerOrderNote', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'reasonName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'outLocation', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'outArea', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'logistics', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'logisticsPerson', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'logisticsPhone', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'agentName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'deliveryTypeName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'settleTypeName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'receiverName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'receiverPhone', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'receiverFax', isChecked: true, isHeader: false, isAloneRow: false },
      { keyName: 'address', isChecked: true, isHeader: false, isAloneRow: false },
      { keyName: 'note', isChecked: true, isHeader: false, isAloneRow: false },
      { keyName: 'status', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'barcodeFlag', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'createName', isChecked: true, isHeader: false, isAloneRow: false },
      { keyName: 'dept', isChecked: true, isHeader: false, isAloneRow: false },
      { keyName: 'applicationDate', isChecked: true, isHeader: false, isAloneRow: false }
    ],
    tbodyInfo: [
      { keyName: 'materialsNo', isChecked: true },
      { keyName: 'materialsDes', isChecked: true },
      { keyName: 'materialsType', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'locationCode', isChecked: true },
      { keyName: 'enableNum', isChecked: true },
      { keyName: 'qty', isChecked: true },
      { keyName: 'realQty', isChecked: true },
      { keyName: 'status', isChecked: true }
    ]
  },
  TemplateUrl: 'view/print/templateTable.html',
  printTempBdDiction: {
    materialsNo: {
      Id: 'materialsNo',
      Key: 'materialsNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'materialsNo',
      widthRate: 1,
      testValue: 1
    },
    materialsDes: {
      Id: 'materialsDes',
      Key: 'materialsDes',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'materialsDes',
      widthRate: 4,
      testValue: '齿轮'
    },
    materialsType: {
      Id: 'materialsType',
      Key: 'materialsType',
      Name: '物料分类',
      Alias: '',
      IsChecked: false,
      Value: 'materialsType',
      widthRate: 2.5,
      testValue: 'A分类'
    },
    unit: {
      Id: 'unit',
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'unit',
      widthRate: 2,
      testValue: 'EA'
    },
    locationCode: {
      Id: 'loactionCode',
      Key: 'loactionCode',
      Name: '默认储位',
      Alias: '',
      IsChecked: false,
      Value: 'locationCode',
      widthRate: 1
    },
    enableNum: {
      Id: 'enableNum',
      Key: 'enableNum',
      Name: '可用库存',
      Alias: '',
      IsChecked: false,
      Value: 'enableNum',
      widthRate: 1
    },
    qty: {
      Id: 'qty',
      Key: 'qty',
      Name: '出库数量',
      Alias: '',
      IsChecked: false,
      Value: 'qty',
      widthRate: 1,
      testValue: '1'
    },
    realQty: {
      Id: 'realQty',
      Key: 'realQty',
      Name: '实际出库数量',
      Alias: '',
      IsChecked: false,
      Value: 'realQty',
      widthRate: 2,
      testValue: '1'
    },
    status: {
      Id: 'status',
      Key: 'status',
      Name: '出库状态',
      Alias: '',
      IsChecked: false,
      Value: 'status',
      widthRate: 2,
      testValue: '20180101',
      pipe: 'stockOutStatus'
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'qrcode'
    },
    abnormalNo: {
      Key: 'abnormalNo',
      Name: '出库单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'abnormalNo'
    },
    type: {
      Key: 'type',
      Name: '出库类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'type'
    },
    innerOrder: {
      Key: 'innerOrder',
      Name: '内部订单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'innerOrder'
    },
    innerOrderNote: {
      Key: 'innerOrderNote',
      Name: '内部订单号说明',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'innerOrderNote'
    },
    reasonName: {
      Key: 'reasonName',
      Name: '产生原因',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'reasonName'
    },
    outLocation: {
      Key: 'outLocation',
      Name: '调出仓库',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'outLocation'
    },
    outArea: {
      Key: 'outArea',
      Name: '调出库区',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'outArea'
    },
    logistics: {
      Key: 'logistics',
      Name: '承运物流',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'logistics'
    },
    logisticsPerson: {
      Key: 'logisticsPerson',
      Name: '承运人',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'logisticsPerson'
    },
    logisticsPhone: {
      Key: 'logisticsPhone',
      Name: '联系方式',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'logisticsPhone'
    },
    agentName: {
      Key: 'agentName',
      Name: '客户',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'agentName'
    },
    deliveryTypeName: {
      Key: 'deliveryTypeName',
      Name: '发运方式',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'deliveryTypeName'
    },
    settleTypeName: {
      Key: 'settleTypeName',
      Name: '运费结算方式',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'settleTypeName'
    },
    receiverName: {
      Key: 'receiverName',
      Name: '收货人',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'receiverName'
    },
    receiverPhone: {
      Key: 'receiverPhone',
      Name: '收货人联系方式',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'receiverPhone'
    },
    receiverFax: {
      Key: 'receiverFax',
      Name: '传真',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'receiverFax'
    },
    address: {
      Key: 'address',
      Name: '收货地址',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'address'
    },
    note: {
      Key: 'note',
      Name: '备注',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'note'
    },
    status: {
      Key: 'status',
      Name: '出库状态',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'status',
      pipe: 'stockOutStatus'
    },
    barcodeFlag: {
      Key: 'barcodeFlag',
      Name: '是否条码管理',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'barcodeFlag',
      pipe: 'barcodeManage'
    },
    createName: {
      Key: 'createName',
      Name: '制单人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'createName'
    },
    dept: {
      Key: 'dept',
      Name: '制单部门',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'dept'
    },
    applicationDate: {
      Key: 'applicationDate',
      Name: '制单时间',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'applicationDate',
      pipe: 'date: yyyy-MM-dd HH:mm'
    }
  },
  testData: {
    headerInfo: {
      qrcode: '1111111111111',
      abnormalNo: '12345678901234455667',
      type: '99999999999999999999',
      innerOrder: '0000001',
      innerOrderNote: 'ooo',
      reasonName: '否',
      outLocation: '调出仓库',
      outArea: '调出库区',
      status: 2,
      logistics: '否',
      logisticsPerson: '否',
      logisticsPhone: '1588878',
      agentName: '测试人员',
      deliveryTypeName: '测试人员',
      settleTypeName: '测试人员',
      receiverName: '测试人员',
      receiverPhone: '测试人员',
      receiverFax: '测试人员',
      address: '测试部',
      note: '备注12345',
      createName: '测试部',
      dept: '测试部',
      applicationDate: 1529913429589,
      barcodeFlag: 1,
    },
    dataList: [{
      materialsNo: '95386',
      materialsDes: '测试物料1',
      materialsType: '分类1',
      unit: '个',
      locationCode: '1-2-3',
      enableNum: 22,
      qty: 100,
      realQty: 100,
      status: 2
    }, {
      materialsNo: '910006',
      materialsDes: '测试物料2',
      materialsType: '分类2',
      unit: '箱',
      locationCode: '1-2-3',
      enableNum: 22,
      qty: 200,
      realQty: 200,
      status: 2
    }]
  }
};
/**
 * 其它入库单 2003
 * **/
export const UnusualIn = {
  Name: '其它入库单',
  Type: 'UnusualIn',
  isEnable: true,
  Interface: '/abnormalIn/item',
  TemplateType: '2003',
  TemplateUrl: 'view/print/templateTable.html',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true, isQrCode: true,  isAloneRow: false },
      { keyName: 'abnormalNo', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'type', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'innerOrder', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'innerOrderNote', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'sapOrderDesc', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'inLocation', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'inArea', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'state', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'barcodeFlag', isChecked: true, isHeader: false, isAloneRow: false },
      { keyName: 'note', isChecked: true, isHeader: false, isAloneRow: false },
      { keyName: 'createName', isChecked: true, isHeader: false, isAloneRow: false },
      { keyName: 'dept', isChecked: true, isHeader: false, isAloneRow: false },
      { keyName: 'applicationDate', isChecked: true, isHeader: false, isAloneRow: false }

    ],
    tbodyInfo: [
      { keyName: 'materialsNo', isChecked: true },
      { keyName: 'materialsDes', isChecked: true },
      { keyName: 'materialsType', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'qty', isChecked: true },
      { keyName: 'realQty', isChecked: true },
      { keyName: 'state', isChecked: true }
    ]
  },
  printTempBdDiction: {
    materialsNo: {
      Id: 'materialsNo',
      Key: 'materialsNo',
      Name: '物料编号',
      Alias: '',
      IsChecked: false,
      Value: 'materialsNo',
      widthRate: 1,
      testValue: 1
    },
    materialsDes: {
      Id: 'materialsDes',
      Key: 'materialsDes',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'materialsDes',
      widthRate: 2,
      testValue: '齿轮'
    },
    materialsType: {
      Id: 'materialsType',
      Key: 'materialsType',
      Name: '物料分类',
      Alias: '',
      IsChecked: false,
      Value: 'materialsType',
      widthRate: 2,
      testValue: 'A分类'
    },
    unit: {
      Id: 'unit',
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'unit',
      widthRate: 1,
      testValue: 'EA'
    },
    qty: {
      Id: 'qty',
      Key: 'qty',
      Name: '入库数量',
      Alias: '',
      IsChecked: false,
      Value: 'qty',
      widthRate: 1,
      testValue: '1'
    },
    realQty: {
      Id: 'realQty',
      Key: 'realQty',
      Name: '实际入库数量',
      Alias: '',
      IsChecked: false,
      Value: 'realQty',
      widthRate: 2,
      testValue: '1'
    },
    state: {
      Id: 'state',
      Key: 'state',
      Name: '入库状态',
      Alias: '',
      IsChecked: false,
      Value: 'state',
      widthRate: 1,
      testValue: '20180101',
      pipe: 'inventoryType'
    },
    remark: {
      Key: 'remark',
      Name: '备注',
      Alias: '',
      IsChecked: false,
      widthRate: 1,
      testValue: '备注'
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'qrcode'
    },
    abnormalNo: {
      Key: 'abnormalNo',
      Name: '申请单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'abnormalNo'
    },
    type: {
      Key: 'type',
      Name: '入库类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'type',
    },
    innerOrder: {
      Key: 'innerOrder',
      Name: '内部订单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'innerOrder'
    },
    innerOrderNote: {
      Key: 'innerOrderNote',
      Name: '内部订单号说明',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'innerOrderNote'
    },
    sapOrderDesc: {
      Key: 'sapOrderDesc',
      Name: '同步状态',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'sapOrderDesc'
    },
    note: {
      Key: 'note',
      Name: '原因',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'note'
    },
    inLocation: {
      Key: 'inLocation',
      Name: '领入仓库',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'inLocation'
    },
    inArea: {
      Key: 'inArea',
      Name: '领入库区',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'inArea'
    },
    state: {
      Key: 'state',
      Name: '入库状态',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'state',
      pipe: 'inventoryType'
    },
    barcodeFlag: {
      Key: 'barcodeFlag',
      Name: '是否条码管理',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'barcodeFlag',
      pipe: 'barcodeManage'
    },
    createName: {
      Key: 'createName',
      Name: '制单人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'createName'
    },
    dept: {
      Key: 'dept',
      Name: '制单部门',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'dept'
    },
    applicationDate: {
      Key: 'applicationDate',
      Name: '制单时间',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'applicationDate',
      pipe: 'date: yyyy-MM-dd HH:mm'
    }
  },
  testData: {
    headerInfo: {
      qrcode: '1111111111111',
      abnormalNo: '12345678901234455667',
      type: '99999999999999999999',
      innerOrder: '0000001',
      innerOrderNote: 'ooo',
      synsapStatus: '否',
      inLocation: '调出仓库',
      inArea: '调出库区',
      state: 2,
      barcodeFlag: 1,
      note: '否',
      createName: '测试人员',
      dept: '测试人员',
      applicationDate: new Date(),
    },
    dataList: [{
      materialsNo: '95386',
      materialsDes: '测试物料1',
      materialsType: '分类1',
      unit: '个',
      qty: 100,
      realQty: 100,
      state: 1
    }, {
      materialsNo: '910006',
      materialsDes: '测试物料2',
      materialsType: '分类2',
      unit: '吨',
      qty: 300,
      realQty: 200,
      state: 2
    }]
  }
};
export const Handover = {
  Name: '发运交接单',
  Type: 'Handover',
  isEnable: false,
  Interface: '/deliveryReceipt/item',
  TemplateType: '3001',
  TemplateUrl: 'view/print/templateTable.html',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'handBillNo', isChecked: true, isHeader: true },
      { keyName: 'qrcode', isChecked: true, isHeader: true },
      { keyName: 'dealerOrgName', isChecked: false, isHeader: true },
      { keyName: 'createDate', isChecked: false, isHeader: true },
      { keyName: 'createName', isChecked: false, isHeader: true },
      { keyName: 'salesType', isChecked: false, isHeader: true },
      { keyName: 'orgName', isChecked: true, isHeader: true },
      { keyName: 'shippingMethod', isChecked: true, isHeader: true },
      { keyName: 'settlementDesc', isChecked: false, isHeader: true },
      { keyName: 'receiverName', isChecked: false, isHeader: true },
      { keyName: 'deliveryNOs', isChecked: false, isHeader: true },
      { keyName: 'boxList', isChecked: false, isHeader: true },
      { keyName: 'receiverTel', isChecked: false, isHeader: false },
      { keyName: 'receiverFax', isChecked: false, isHeader: false },
      { keyName: 'receiverAddress', isChecked: false, isHeader: false },
      { keyName: 'deliveryDate', isChecked: false, isHeader: false },
      { keyName: 'carrierAmount', isChecked: false, isHeader: false },
      { keyName: 'carrierOrgName', isChecked: false, isHeader: false },
      { keyName: 'carrierUserName', isChecked: false, isHeader: false },
      { keyName: 'carrierCar', isChecked: false, isHeader: false },
      { keyName: 'freightNo', isChecked: false, isHeader: false }
    ],
    tbodyInfo: [
      { keyName: 'materialsNo', isChecked: true },
      { keyName: 'materialsDes', isChecked: true },
      { keyName: 'boxupNo', isChecked: true },
      { keyName: 'deliveryNoteNo', isChecked: true },
      { keyName: 'qtyHand', isChecked: true }
    ]
  },
  printTempBdDiction: {
    materialsNo: {
      Id: 'materialsNo',
      Key: 'materialsNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialsNo',
      widthRate: 1,
      testValue: 1
    },
    materialsDes: {
      Id: 'materialsDes',
      Key: 'materialsDes',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialsDes',
      widthRate: 4,
      testValue: '齿轮'
    },
    boxupNo: {
      Id: 'boxupNo',
      Key: 'boxupNo',
      Name: '装箱清单号',
      Alias: '',
      IsChecked: false,
      Value: 'pro.boxupNo',
      widthRate: 2,
      testValue: '1'
    },
    deliveryNoteNo: {
      Id: 'deliveryNoteNo',
      Key: 'deliveryNoteNo',
      Name: '业务单据号',
      Alias: '',
      IsChecked: false,
      Value: 'pro.deliveryNoteNo',
      widthRate: 2,
      testValue: 'EA'
    },
    qty: {
      Id: 'qty',
      Key: 'qtyHand',
      Name: '数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.qty',
      widthRate: 1,
      testValue: '1'
    }
  },
  cacheHeaderFootDiction: {
    billNo: {
      Key: 'handBillNo',
      Name: '发运单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.billNo'

    },
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.qrcode'
    },
    dealerOrgName: {
      Key: 'dealerOrgName',
      Name: '客户名称',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.dealerOrgName'
    },
    createDate: {
      Key: 'createDate',
      Name: '申请日期',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.createDate'
    },
    createName: {
      Key: 'createName',
      Name: '制单人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.createName'
    },
    salesType: {
      Key: 'salesType',
      Name: '销售类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.salesType'
    },
    orgName: {
      Key: 'orgName',
      Name: '工厂名称',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.orgName'
    },
    shippingMethod: {
      Key: 'shippingMethod',
      Name: '运输方式',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.shippingMethod'
    },
    settlementDesc: {
      Key: 'settlementDesc',
      Name: '结算方式',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.settlementDesc'
    },
    receiverName: {
      Key: 'receiverName',
      Name: '收货人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.receiverName'
    },
    receiverTel: {
      Key: 'receiverTel',
      Name: '联系方式',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.receiverTel'
    },
    receiverFax: {
      Key: 'receiverFax',
      Name: '传真',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.receiverFax'
    },
    receiverAddress: {
      Key: 'receiverAddress',
      Name: '收货地址',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.receiverAddress'
    },
    deliveryDate: {
      Key: 'deliveryDate',
      Name: '发货日期',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.deliveryDate'
    },
    carrierAmount: {
      Key: 'carrierAmount',
      Name: '费用',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.carrierAmount'
    },
    carrierOrgName: {
      Key: 'carrierOrgName',
      Name: '承运商',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.carrierOrgName'
    },
    carrierUserName: {
      Key: 'carrierUserName',
      Name: '承运人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.carrierUserName'
    },
    carrierCar: {
      Key: 'carrierCar',
      Name: '承运车辆',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.carrierCar'
    },
    freightNo: {
      Key: 'freightNo',
      Name: '物流单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.freightNo'
    },
    deliveryNOs: {
      Key: 'deliveryNOs',
      Name: '业务单号',
      IsAloneRow: true,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.deliveryNOs'

    },
    boxList: {
      Key: 'boxList',
      Name: '装箱信息',
      IsAloneRow: true,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.boxList'

    },
    receiverSite: {
      Id: 'receiverSite',
      Key: 'receiverSite',
      Name: '收货站点',
      IsChecked: true,
      Value: 'Item.headerInfo.receiverSite',
      IsHeader: true
    }
  }
};
export const GuaranteesOut = {
  Name: '三包出库单',
  Type: 'GuaranteesOut',
  isEnable: false,
  Interface: '/threeGuaranteesOut/item',
  TemplateType: '2002',
  TemplateUrl: 'view/print/templateTable.html',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'guaranteesOutNo', isChecked: true, isHeader: true },
      { keyName: 'qrcode', isChecked: true, isHeader: true },
      { keyName: 'guaranteesTypeName', isChecked: true, isHeader: true },
      { keyName: 'guaPurchaseNo', isChecked: true, isHeader: true },
      { keyName: 'createName', isChecked: true, isHeader: true },
      { keyName: 'createPartName', isChecked: true, isHeader: true },
      { keyName: 'createDateGua', isChecked: true, isHeader: false },
      { keyName: 'callOutLocation', isChecked: true, isHeader: true },
      { keyName: 'callOutArea', isChecked: true, isHeader: true },
      { keyName: 'sapName', isChecked: true, isHeader: true },
      { keyName: 'sapTypeName', isChecked: true, isHeader: true },
      { keyName: 'outStatus', isChecked: true, isHeader: true },
      { keyName: 'note', isChecked: true, isHeader: true }
    ],
    tbodyInfo: [
      { keyName: 'materialsNo', isChecked: true },
      { keyName: 'materialsDesc', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'qtyGuaOutTotal', isChecked: true },
      { keyName: 'outQty', isChecked: true },
      { keyName: 'guaDeliveryQty', isChecked: true },
      { keyName: 'realOutQty', isChecked: true },
      { keyName: 'guaOutStatus', isChecked: true }
    ]
  },
  printTempBdDiction: {
    materialsNo: {
      Id: 'materialsNo',
      Key: 'materialsNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialsNo',
      widthRate: 1,
      testValue: 1
    },
    materialsDesc: {
      Id: 'materialsDesc',
      Key: 'materialsDesc',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialsDesc',
      widthRate: 4,
      testValue: '齿轮'
    },
    unit: {
      Id: 'unit',
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'pro.unit',
      widthRate: 2,
      testValue: 'EA'
    },
    qty: {
      Id: 'qty',
      Key: 'qtyGuaOutTotal',
      Name: '订单总数',
      Alias: '',
      IsChecked: false,
      Value: 'pro.qty',
      widthRate: 1,
      testValue: '1'
    },
    outQty: {
      Id: 'outQty',
      Key: 'outQty',
      Name: '已发数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.outQty',
      widthRate: 1,
      testValue: '1'
    },
    deliveryQty: {
      Id: 'deliveryQty',
      Key: 'guaDeliveryQty',
      Name: '出库数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.deliveryQty',
      widthRate: 1,
      testValue: '1'
    },
    realOutQty: {
      Id: 'realOutQty',
      Key: 'realOutQty',
      Name: '实际出库数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.realOutQty',
      widthRate: 1,
      testValue: '1'
    },
    status: {
      Id: 'status',
      Key: 'guaOutStatus',
      Name: '出库状态',
      Alias: '',
      IsChecked: false,
      Value: 'pro.status',
      widthRate: 1,
      testValue: '未出库'
    },
    loactionCode: {
      Id: 'loactionCode',
      Key: 'loactionCode',
      Name: '储位',
      Alias: '',
      IsChecked: false,
      Value: 'pro.locationCode',
      widthRate: 1
    }
  },
  cacheHeaderFootDiction: {
    guaranteesOutNo: {
      Key: 'guaranteesOutNo',
      Name: '三包出库单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.guaranteesOutNo'
    },
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.qrcode'
    },
    guaranteesTypeName: {
      Key: 'guaranteesTypeName',
      Name: '单据类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.guaranteesTypeName'
    },
    purchaseNo: {
      Key: 'guaPurchaseNo',
      Name: '三包申请单号',
      IsAloneRow: false,
      IsChecked: false,
      IsHeader: true,
      Value: 'Item.headerInfo.purchaseNo'
    },
    createName: {
      Key: 'createName',
      Name: '制单人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.createName'

    },
    createPartName: {
      Key: 'createPartName',
      Name: '制单部门',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.createPartName'
    },
    createDate: {
      Key: 'createDateGua',
      Name: '制单时间',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.createDate',
      pipe: 'date: yyyy-MM-dd HH:mm'
    },
    callOutLocation: {
      Key: 'callOutLocation',
      Name: '调出仓库',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.outLocation'
    },
    callOutArea: {
      Key: 'callOutArea',
      Name: '调出库区',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.outArea'
    },
    sapName: {
      Key: 'sapName',
      Name: 'SAP内部订单',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.sapName'
    },
    sapTypeName: {
      Key: 'sapTypeName',
      Name: '移动类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.sapTypeName'
    },
    outStatus: {
      Key: 'outStatus',
      Name: '出库状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.outLocationStatus'
    },
    note: {
      Key: 'note',
      Name: '备注',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.note'
    },
    sapOrder: {
      Key: 'sapOrder',
      Name: '预留单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.sapOrder'
    }
  }
};
export const Allocation = {
  Name: '客户间调拨单',
  Type: 'Allocation',
  isEnable: false,
  Interface: '/agentAllot/item',
  TemplateType: '1001',
  TemplateUrl: 'view/print/templateTable.html',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'allotOrder', isChecked: true, isHeader: true },
      { keyName: 'qrcode', isChecked: true, isHeader: true },
      { keyName: 'deptName', isChecked: true, isHeader: true },
      { keyName: 'createName', isChecked: true, isHeader: true },
      { keyName: 'createDate', isChecked: true, isHeader: true },
      { keyName: 'outAgentName', isChecked: true, isHeader: true },
      { keyName: 'outAgentContact', isChecked: true, isHeader: true },
      { keyName: 'outAgentPhone', isChecked: true, isHeader: true },
      { keyName: 'inAgentName', isChecked: true, isHeader: true },
      { keyName: 'inAgentContact', isChecked: true, isHeader: true },
      { keyName: 'inAgentPhone', isChecked: true, isHeader: true },
      { keyName: 'inAddress', isChecked: true, isHeader: true },
      { keyName: 'logisCom', isChecked: true, isHeader: true },
      { keyName: 'logisOrder', isChecked: true, isHeader: true },
      { keyName: 'carrier', isChecked: true, isHeader: true },
      { keyName: 'carrierPhone', isChecked: true, isHeader: true },
      { keyName: 'deliveryDate', isChecked: true, isHeader: true },
      { keyName: 'auditUserName', isChecked: true, isHeader: true },
      { keyName: 'auditStatus', isChecked: true, isHeader: true },
      { keyName: 'auditDate', isChecked: true, isHeader: true },
      { keyName: 'auditOpinion', isChecked: true, isHeader: true }
    ],
    tbodyInfo: [
      { keyName: 'materialNo', isChecked: true },
      { keyName: 'materialName', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'amount', isChecked: true }
    ]
  },
  printTempBdDiction: {
    materialNo: {
      Id: 'materialNo',
      Key: 'materialNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialNo',
      widthRate: 1,
      testValue: 1
    },
    materialName: {
      Id: 'materialName',
      Key: 'materialName',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialName',
      widthRate: 4,
      testValue: '齿轮'
    },
    unit: {
      Id: 'unit',
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'pro.unit',
      widthRate: 2,
      testValue: 'EA'
    },
    amount: {
      Id: 'amount',
      Key: 'amount',
      Name: '申请数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.amount',
      widthRate: 1,
      testValue: '1'
    }
  },
  cacheHeaderFootDiction: {
    allotOrder: {
      Key: 'allotOrder',
      Name: '调拨单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.allotOrder'
    },
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.qrcode'
    },
    deptName: {
      Key: 'deptName',
      Name: '制单部门',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.deptName'
    },
    createName: {
      Key: 'createName',
      Name: '制单人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.createName'
    },
    createDate: {
      Key: 'createDate',
      Name: '制单日期',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.createDate'
    },
    outAgentName: {
      Key: 'outAgentName',
      Name: '调出客户',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.outAgentName'
    },
    outAgentContact: {
      Key: 'outAgentContact',
      Name: '调出联系人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.outAgentContact'
    },
    outAgentPhone: {
      Key: 'outAgentPhone',
      Name: '调出联系方式',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.outAgentPhone'
    },
    inAgentName: {
      Key: 'inAgentName',
      Name: '调入客户',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.inAgentName'
    },
    inAgentContact: {
      Key: 'inAgentContact',
      Name: '调入联系人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.inAgentContact'
    },
    inAgentPhone: {
      Key: 'inAgentPhone',
      Name: '调入联系方式',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.inAgentPhone'
    },
    inAddress: {
      Key: 'inAddress',
      Name: '调入地址',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.inAddress'
    },
    logisCom: {
      Key: 'logisCom',
      Name: '物流公司',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.logisCom'
    },
    logisOrder: {
      Key: 'logisOrder',
      Name: '物流单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.logisOrder'
    },
    carrier: {
      Key: 'carrier',
      Name: '承运人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.carrier'
    },
    carrierPhone: {
      Key: 'carrierPhone',
      Name: '承运人联系方式',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.carrierPhone'
    },
    deliveryDate: {
      Key: 'deliveryDate',
      Name: '发货日期',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.deliveryDate'
    },
    auditUserName: {
      Key: 'auditUserName',
      Name: '审核人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.auditUserName'
    },
    auditStatus: {
      Key: 'auditStatus',
      Name: '审核状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.verifyState'
    },
    auditDate: {
      Key: 'auditDate',
      Name: '审核日期',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.auditDate'
    },
    auditOpinion: {
      Key: 'auditOpinion',
      Name: '审核意见',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.note'
    }
  }
};
export const ReturnApply = {
  Name: '退货申请单',
  Type: 'ReturnApply',
  isEnable: false,
  Interface: '/returnApply/item',
  TemplateType: '3002',
  TemplateUrl: 'view/print/templateTable.html',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'applyNo', isChecked: true, isHeader: true },
      { keyName: 'qrcode', isChecked: true, isHeader: true },
      { keyName: 'saleNoRet', isChecked: false, isHeader: true },
      { keyName: 'purchaseOrgNameRet', isChecked: false, isHeader: true },
      { keyName: 'buyerName', isChecked: false, isHeader: true },
      { keyName: 'supplierOrgName', isChecked: false, isHeader: true },
      { keyName: 'salesmanName', isChecked: true, isHeader: true },
      { keyName: 'createDate', isChecked: true, isHeader: true },
      { keyName: 'isReturnDesc', isChecked: false, isHeader: true },
      { keyName: 'remark', isChecked: false, isHeader: true }
    ],
    tbodyInfo: [
      { keyName: 'materialsNo', isChecked: true },
      { keyName: 'materialsDes', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'retPurQty', isChecked: true },
      { keyName: 'returnApplyAmount', isChecked: true },
      { keyName: 'retApplyQty', isChecked: true }
    ]
  },
  printTempBdDiction: {

    materialsNo: {
      Id: 'materialsNo',
      Key: 'materialsNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialsNo',
      widthRate: 1,
      testValue: 1
    },
    materialsDes: {
      Id: 'materialsDes',
      Key: 'materialsDes',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialsDes',
      widthRate: 4,
      testValue: '齿轮'
    },
    unit: {
      Id: 'unit',
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'pro.unit',
      widthRate: 1,
      testValue: 'EA'
    },
    qty: {
      Id: 'qty',
      Key: 'retPurQty',
      Name: '采购数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.qty',
      widthRate: 1,
      testValue: '1'
    },
    returnApplyAmount: {
      Id: 'returnApplyAmount',
      Key: 'returnApplyAmount',
      Name: '已退货数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.returnApplyAmount',
      widthRate: 1,
      testValue: '1'
    },
    applyQty: {
      Id: 'applyQty',
      Key: 'retApplyQty',
      Name: '退货数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.applyQty',
      widthRate: 1,
      testValue: '1'
    }
  },
  cacheHeaderFootDiction: {
    createName: {
      Id: 'createName',
      Key: 'createName',
      Name: '创建人',
      IsChecked: false,
      Value: 'Item.headerInfo.createName',
    },
    applyNo: {
      Key: 'applyNo',
      Name: '申请单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.applyNo'
    },
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.qrcode'
    },
    saleNo: {
      Key: 'saleNoRet',
      Name: '采购单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.saleNo'
    },
    purchaseOrgName: {
      Key: 'purchaseOrgNameRet',
      Name: '采购公司',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.purchaseOrgName'
    },
    /*buyerName:{
     Key:'buyerName',
     Name:'采购员',
     IsAloneRow:false,
     IsChecked:true,
     IsHeader:true,
     Value:'Item.headerInfo.buyerName'
     },*/
    supplierOrgName: {
      Key: 'supplierOrgName',
      Name: '备件公司',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.supplierOrgName'
    },
    salesmanName: {
      Key: 'salesmanName',
      Name: '销售员',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.salesmanName'
    },
    createDate: {
      Key: 'createDate',
      Name: '申请日期',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'Item.headerInfo.createDate'
    },
    isReturnDesc: {
      Key: 'isReturnDesc',
      Name: '退货状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.isReturnDesc'
    },
    remark: {
      Key: 'remark',
      Name: '备注',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'Item.headerInfo.remark'
    }
  }
};
export const PickingIn = {
  Name: '领料单入库单',
  Type: 'PickingIn',
  isEnable: false,
  Interface: '/materialsSchedule/item',
  TemplateType: '2006',
  TemplateUrl: 'view/print/templateTable.html',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true },
      { keyName: 'requisitionNo', isChecked: true, isHeader: true },
      { keyName: 'documentName', isChecked: true, isHeader: true },
      { keyName: 'statusIn', isChecked: true, isHeader: true },
      { keyName: 'voucherInNo', isChecked: true, isHeader: true },
      { keyName: 'voucherInStatus', isChecked: true, isHeader: true },
      { keyName: 'createName', isChecked: true, isHeader: true },
      { keyName: 'sapType', isChecked: true, isHeader: true },
      { keyName: 'createDateGua', isChecked: true, isHeader: false },
      { keyName: 'createPartName', isChecked: true, isHeader: false },
      { keyName: 'note', isChecked: true, isHeader: false }
    ],
    tbodyInfo: [
      { keyName: 'materialsNo', isChecked: true },
      { keyName: 'materialsDes', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'outLocation', isChecked: true },
      { keyName: 'inLocation', isChecked: true },
      { keyName: 'inLocationArea', isChecked: true },
      { keyName: 'amountPicking', isChecked: true },
      { keyName: 'realAmount', isChecked: true },
      { keyName: 'statusShow', isChecked: true }
    ]
  },
  printTempBdDiction: {
    materialsNo: {
      Id: 'materialsNo',
      Key: 'materialsNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialsNo',
      widthRate: 1,
      testValue: 1
    },
    materialsDes: {
      Id: 'materialsDes',
      Key: 'materialsDes',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialsDes',
      widthRate: 4,
      testValue: '齿轮'
    },
    unit: {
      Id: 'unit',
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'pro.unit',
      widthRate: 2,
      testValue: 'EA'
    },
    outLocation: {
      Id: 'outLocation',
      Key: 'outLocation',
      Name: '领出仓库',
      Alias: '',
      IsChecked: false,
      Value: 'pro.outLocation',
      widthRate: 1,
      testValue: '1'
    },
    inLocation: {
      Id: 'inLocation',
      Key: 'inLocation',
      Name: '领入仓库',
      Alias: '',
      IsChecked: false,
      Value: 'pro.inLocation',
      widthRate: 1,
      testValue: '1'
    },
    inLocationArea: {
      Id: 'inLocationArea',
      Key: 'inLocationArea',
      Name: '领入库区',
      Alias: '',
      IsChecked: false,
      Value: 'pro.inArea',
      widthRate: 1,
      testValue: '1'
    },
    amount: {
      Id: 'amount',
      Key: 'amountPicking',
      Name: '领料数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.amount',
      widthRate: 1,
      testValue: '1'
    },
    realAmount: {
      Id: 'realAmount',
      Key: 'realAmount',
      Name: '实际入库数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.realAmount',
      widthRate: 1,
      testValue: '1'
    },
    statusShow: {
      Id: 'statusShow',
      Key: 'statusShow',
      Name: '入库状态',
      Alias: '',
      IsChecked: false,
      Value: 'pro.status',
      widthRate: 1,
      testValue: '1'
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'Item.headerInfo.qrcode'
    },
    requisitionNo: {
      Key: 'requisitionNo',
      Name: '领料单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.requisitionNo'
    },
    documentName: {
      Key: 'documentName',
      Name: '单据类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.documentName'
    },
    voucherInNo: {
      Key: 'voucherInNo',
      Name: '领入物料凭证',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.voucherInNo'
    },
    voucherInStatus: {
      Key: 'voucherInStatus',
      Name: '领入过账状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.voucherInStatus'
    },
    status: {
      Key: 'statusIn',
      Name: '入库状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.status'
    },
    createName: {
      Key: 'createName',
      Name: '制单人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.createName'
    },
    sapType: {
      Key: 'sapType',
      Name: '移动类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.sapType'
    },
    createDate: {
      Key: 'createDateGua',
      Name: '制单时间',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'Item.headerInfo.createDate',
      pipe: 'date: yyyy-MM-dd HH:mm'
    },
    createPartName: {
      Key: 'createPartName',
      Name: '制单部门',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'Item.headerInfo.createPartName'
    },
    note: {
      Key: 'note',
      Name: '备注',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'Item.headerInfo.note'
    }
  }
};
export const PickingOut = {
  Name: '领料单出库单',
  Type: 'PickingOut',
  isEnable: false,
  Interface: '/materialsSchedule/item',
  TemplateType: '2007',
  TemplateUrl: 'view/print/templateTable.html',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true },
      { keyName: 'requisitionNo', isChecked: true, isHeader: true },
      { keyName: 'documentName', isChecked: true, isHeader: true },
      { keyName: 'statusIn', isChecked: true, isHeader: true },
      { keyName: 'voucherOutNo', isChecked: true, isHeader: true },
      { keyName: 'voucherOutStatus', isChecked: true, isHeader: true },
      { keyName: 'createName', isChecked: true, isHeader: true },
      { keyName: 'sapType', isChecked: true, isHeader: true },
      { keyName: 'createDateGua', isChecked: true, isHeader: false },
      { keyName: 'createPartName', isChecked: true, isHeader: false },
      { keyName: 'note', isChecked: true, isHeader: false }
    ],
    tbodyInfo: [
      { keyName: 'materialsNo', isChecked: true },
      { keyName: 'materialsDes', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'outLocation', isChecked: true },
      { keyName: 'outLocationArea', isChecked: true },
      { keyName: 'inLocation', isChecked: true },
      { keyName: 'amountPicking', isChecked: true },
      { keyName: 'realOutQty', isChecked: true },
      { keyName: 'outStatus', isChecked: true }
    ]
  },
  printTempBdDiction: {
    materialsNo: {
      Id: 'materialsNo',
      Key: 'materialsNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialsNo',
      widthRate: 1,
      testValue: 1
    },
    materialsDes: {
      Id: 'materialsDes',
      Key: 'materialsDes',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialsDes',
      widthRate: 4,
      testValue: '齿轮'
    },
    unit: {
      Id: 'unit',
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'pro.unit',
      widthRate: 2,
      testValue: 'EA'
    },
    outLocation: {
      Id: 'outLocation',
      Key: 'outLocation',
      Name: '领出仓库',
      Alias: '',
      IsChecked: false,
      Value: 'pro.outLocation',
      widthRate: 1,
      testValue: '1'
    },
    outLocationArea: {
      Id: 'outLocationArea',
      Key: 'outLocationArea',
      Name: '领出库区',
      Alias: '',
      IsChecked: false,
      Value: 'pro.outArea',
      widthRate: 1,
      testValue: '1'
    },
    inLocation: {
      Id: 'inLocation',
      Key: 'inLocation',
      Name: '领入仓库',
      Alias: '',
      IsChecked: false,
      Value: 'pro.inLocation',
      widthRate: 1,
      testValue: '1'
    },
    amount: {
      Id: 'amount',
      Key: 'amountPicking',
      Name: '领料数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.amount',
      widthRate: 1,
      testValue: '1'
    },
    realOutQty: {
      Id: 'realOutQty',
      Key: 'realOutQty',
      Name: '实际出库数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.realAmount',
      widthRate: 1,
      testValue: '1'
    },
    outStatus: {
      Id: 'outStatus',
      Key: 'outStatus',
      Name: '出库状态',
      Alias: '',
      IsChecked: false,
      Value: 'pro.status',
      widthRate: 1,
      testValue: '1'
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'Item.headerInfo.qrcode'
    },
    requisitionNo: {
      Key: 'requisitionNo',
      Name: '领料单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.requisitionNo'
    },
    documentName: {
      Key: 'documentName',
      Name: '单据类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.documentName'
    },
    status: {
      Key: 'status',
      Name: '出库状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.status'
    },
    voucherOutNo: {
      Key: 'voucherOutNo',
      Name: '领出物料凭证',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.voucherOutNo'
    },
    voucherOutStatus: {
      Key: 'voucherOutStatus',
      Name: '领出过账状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.voucherOutStatus'
    },
    createName: {
      Key: 'createName',
      Name: '制单人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.createName'
    },
    sapType: {
      Key: 'sapType',
      Name: '移动类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.sapType'
    },
    createDate: {
      Key: 'createDateGua',
      Name: '制单时间',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'Item.headerInfo.createDate',
      pipe: 'date: yyyy-MM-dd HH:mm'
    },
    createPartName: {
      Key: 'createPartName',
      Name: '制单部门',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'Item.headerInfo.createPartName'
    },
    note: {
      Key: 'note',
      Name: '备注',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'Item.headerInfo.note'
    }
  }
};
/**
 * 盘点单 2008
 * **/
export const Inventory = {
  Name: '盘点单',
  Type: 'Inventory',
  isEnable: true,
  Interface: '/inventoryCheck/printItem',
  TemplateType: '2008',
  TemplateUrl: 'view/print/templateTable.html',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true, isQrCode: true },
      { keyName: 'checkOrderNo', isChecked: true, isHeader: true },
      { keyName: 'checkType', isChecked: true, isHeader: true },
      { keyName: 'warehouseCode', isChecked: true, isHeader: true },
      { keyName: 'locationCodesStr', isChecked: true, isHeader: true },
      { keyName: 'custodian', isChecked: true, isHeader: true },
      { keyName: 'checkOrderDes', isChecked: true, isHeader: true },
      { keyName: 'status', isChecked: true, isHeader: true },
      { keyName: 'plannedDate', isChecked: true, isHeader: true },
      { keyName: 'createName', isChecked: true, isHeader: true },
      { keyName: 'createDate', isChecked: true, isHeader: true },
      { keyName: 'startName', isChecked: true, isHeader: true },

    ],
    tbodyInfo: [
      { keyName: 'barCode', isChecked: true },
      { keyName: 'materialsNo', isChecked: true },
      { keyName: 'materialsDes', isChecked: true },
      { keyName: 'loactionCode', isChecked: true },
      { keyName: 'sysAmount', isChecked: true },
      { keyName: 'actAmount', isChecked: true },
      { keyName: 'depositaryName', isChecked: true },
      { keyName: 'state', isChecked: true },
      { keyName: 'inventoryUserName', isChecked: true }
    ]
  },
  printTempBdDiction: {
    barCode: {
      Id: 'barCode',
      Key: 'barCode',
      Name: '盘点条码',
      Alias: '',
      IsChecked: false,
      Value: 'barCode',
      widthRate: 1
    },
    materialsNo: {
      Id: 'materialsNo',
      Key: 'materialsNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'materialsNo',
      widthRate: 1
    },
    materialsDes: {
      Id: 'materialsDes',
      Key: 'materialsDes',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'materialsDes',
      widthRate: 4
    },
    loactionCode: {
      Id: 'loactionCode',
      Key: 'loactionCode',
      Name: '储位',
      Alias: '',
      IsChecked: false,
      Value: 'loactionCode',
      widthRate: 1
    },
    sysAmount: {
      Id: 'sysAmount',
      Key: 'sysAmount',
      Name: '原始数量',
      Alias: '',
      IsChecked: false,
      Value: 'sysAmount',
      widthRate: 1
    },
    actAmount: {
      Id: 'actAmount',
      Key: 'actAmount',
      Name: '盘点数量',
      Alias: '',
      IsChecked: false,
      Value: 'actAmount',
      widthRate: 1
    },
    depositaryName: {
      Id: 'depositaryName',
      Key: 'depositaryName',
      Name: '保管员',
      Alias: '',
      IsChecked: false,
      Value: 'depositaryName',
      widthRate: 1
    },
    state: {
      Id: 'state',
      Key: 'state',
      Name: '盘点状态',
      Alias: '',
      IsChecked: false,
      Value: 'state',
      pipe: 'inventoryState',
      widthRate: 1
    },
    inventoryUserName: {
      Id: 'inventoryUserName',
      Key: 'inventoryUserName',
      Name: '盘点人',
      Alias: '',
      IsChecked: false,
      Value: 'inventoryUserName',
      widthRate: 1
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'qrcode'
    },
    checkOrderNo: {
      Key: 'checkOrderNo',
      Name: '盘点单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'checkOrderNo'
    },
    checkType: {
      Key: 'checkType',
      Name: '盘点类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'checkType',
      pipe: 'checkType'
    },
    warehouseCode: {
      Key: 'warehouseCode',
      Name: '仓库',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'warehouseCode'
    },
    locationCodesStr: {
      Key: 'locationCodesStr',
      Name: '库区',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'locationCodesStr'
    },
    custodian: {
      Key: 'custodian',
      Name: '保管员',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'custodian'
    },
    checkOrderDes: {
      Key: 'checkOrderDes',
      Name: '盘点描述',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'checkOrderDes'
    },
    status: {
      Key: 'status',
      Name: '盘点状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'status',
      pipe: 'inventoryState'
    },
    plannedDate: {
      Key: 'plannedDate',
      Name: '计划盘点日期',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'plannedDate',
      pipe: 'date:yyyy-MM-dd'
    },
    createName: {
      Key: 'createName',
      Name: '创建人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'createName'
    },
    createDate: {
      Key: 'createDate',
      Name: '创建日期',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'createDate',
      pipe: 'date:yyyy-MM-dd HH:mm'
    },
    startName: {
      Key: 'startName',
      Name: '启动人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'startName'
    }
  },
  testData: {
    headerInfo: {
      qrcode: '1111111111111',
      checkOrderNo: '12345678901234455667',
      checkType: '1',
      warehouseCode: '99999999999999999999',
      locationCodesStr: '0000001',
      custodian: '保管员',
      checkOrderDes: '盘点描述',
      status: '1',
      plannedDate: '11111111',
      createName: '15515515151515',
      createDate: '155151515115',
      startName: '启动人'
    },
    dataList: [{
      barCode: '95386',
      materialsNo: '测试物料1',
      materialsDes: '分类1',
      loactionCode: '个',
      sysAmount: 100,
      actAmount: 100,
      depositaryName: 1,
      state: 2,
      inventoryUserName: 3,
    }, {
      barCode: '910006',
      materialsNo: '测试物料2',
      materialsDes: '分类2',
      loactionCode: '吨',
      sysAmount: 300,
      actAmount: 200,
      depositaryName: 2,
      state: 2,
      inventoryUserName: 3,
    }]
  }
};
/**
 * 期初入库单 2010
 * **/
export const BeginningIn = {
  Name: '期初入库单',
  Type: 'BeginningIn',
  isEnable: true,
  Interface: '/initialInventory/item',
  TemplateType: '2010',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true, isQrCode: true },
      { keyName: 'billNo', isChecked: true, isHeader: true },
      { keyName: 'inLocation', isChecked: true, isHeader: true },
      { keyName: 'inArea', isChecked: true, isHeader: true },
      { keyName: 'state', isChecked: true, isHeader: true },
      { keyName: 'dept', isChecked: true, isHeader: true },
      { keyName: 'createName', isChecked: true, isHeader: true },
      { keyName: 'createDate', isChecked: true, isHeader: true }
    ],
    tbodyInfo: [
      { keyName: 'materialsNo', isChecked: true },
      { keyName: 'materialsDes', isChecked: true },
      { keyName: 'totalQty', isChecked: true },
      { keyName: 'minPackQty', isChecked: true },
      { keyName: 'inNum', isChecked: true },
      { keyName: 'orawyd', isChecked: true },
      { keyName: 'vinId', isChecked: true },
      { keyName: 'state', isChecked: true }
    ]
  },
  printTempBdDiction: {
    materialsNo: {
      Id: 'materialsNo',
      Key: 'materialsNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'materialsNo',
      widthRate: 1,
      testValue: '1'
    },
    materialsDes: {
      Id: 'materialsDes',
      Key: 'materialsDes',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'materialsDes',
      widthRate: 1,
      testValue: '1'
    },
    totalQty: {
      Id: 'totalQty',
      Key: 'totalQty',
      Name: '入库总数量',
      Alias: '',
      IsChecked: false,
      Value: 'totalQty',
      widthRate: 4,
      testValue: '1'
    },
    minPackQty: {
      Id: 'minPackQty',
      Key: 'minPackQty',
      Name: '最小包装',
      Alias: '',
      IsChecked: false,
      Value: 'minPackQty',
      widthRate: 1,
      testValue: '1'
    },
    inNum: {
      Id: 'inNum',
      Key: 'inNum',
      Name: '实际入库数',
      Alias: '',
      IsChecked: false,
      Value: 'inNum',
      widthRate: 1,
      testValue: '1'
    },
    orawyd: {
      Id: 'orawyd',
      Key: 'orawyd',
      Name: '图号',
      Alias: '',
      IsChecked: false,
      Value: 'orawyd',
      widthRate: 1,
      testValue: '1'
    },
    vinId: {
      Id: 'vinId',
      Key: 'vinId',
      Name: 'VIN号',
      Alias: '',
      IsChecked: false,
      Value: 'vinid',
      widthRate: 1,
      testValue: '1'
    },
    state: {
      Id: 'state',
      Key: 'state',
      Name: '入库状态',
      Alias: '',
      IsChecked: false,
      Value: 'state',
      widthRate: 1,
      testValue: '1',
      pipe: 'inventoryType'
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'qrcode'
    },
    billNo: {
      Key: 'billNo',
      Name: '入库单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'billNo'
    },
    inLocation: {
      Key: 'inLocation',
      Name: '仓库编号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'inLocation'
    },
    inArea: {
      Key: 'inArea',
      Name: '库区编号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'inArea'
    },
    state: {
      Key: 'state',
      Name: '入库状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'state',
      pipe: 'inventoryType'
    },
    createName: {
      Key: 'createName',
      Name: '制单人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'createName'
    },
    dept: {
      Key: 'dept',
      Name: '制单部门',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'dept'
    },
    createDate: {
      Key: 'createDate',
      Name: '制单时间',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'createDate',
      pipe: 'date: yyyy-MM-dd HH:mm'
    }
  },
  testData: {
    headerInfo: {
      qrcode: '1111111111111',
      billNo: '12345678901234455667',
      inLocation: '0001cangku',
      inArea: '0001kuqu',
      state: 0,
      createName: 1529913429589,
      dept: '测试部',
      createDate: new Date(),
    },
    dataList: [{
      materialsNo: '95386',
      materialsDes: '测试物料1',
      totalQty: 10,
      minPackQty: 10,
      inNum: 22,
      orawyd: 100,
      vinid: 100,
      state: 0
    }, {
      materialsNo: '95386',
      materialsDes: '测试物料1',
      totalQty: 10,
      minPackQty: 10,
      inNum: 22,
      orawyd: 100,
      vinid: 100,
      state: 0
    }]
  }
};
export const ReturnIn = {
  Name: '退货入库单',
  Type: 'ReturnIn',
  isEnable: false,
  Interface: '/returnIn/item',
  TemplateType: '2004',
  TemplateUrl: 'view/print/templateTable.html',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true },
      { keyName: 'returnInNo', isChecked: true, isHeader: true },
      { keyName: 'returnInBillTypeName', isChecked: true, isHeader: true },
      { keyName: 'returnApplyNo', isChecked: true, isHeader: true },
      { keyName: 'createName', isChecked: true, isHeader: true },
      { keyName: 'deptName', isChecked: true, isHeader: true },
      { keyName: 'createBillDate', isChecked: true, isHeader: true },
      { keyName: 'warehouseCode', isChecked: true, isHeader: true },
      { keyName: 'callInArea', isChecked: true, isHeader: true },
      { keyName: 'stateIn', isChecked: true, isHeader: true },
      { keyName: 'note', isChecked: true, isHeader: false }
    ],
    tbodyInfo: [
      { keyName: 'materialNo', isChecked: true },
      { keyName: 'materialName', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'returnOutTotal', isChecked: true },
      { keyName: 'appliedQtyIn', isChecked: true },
      { keyName: 'qtyIn', isChecked: true },
      { keyName: 'realQtyIn', isChecked: true },
      { keyName: 'statusShow', isChecked: true }
    ]
  },
  printTempBdDiction: {
    materialNo: {
      Id: 'materialNo',
      Key: 'materialNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialsNo',
      widthRate: 1,
      testValue: '1'
    },
    materialName: {
      Id: 'materialName',
      Key: 'materialName',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialsDes',
      widthRate: 1,
      testValue: '1'
    },
    unit: {
      Id: 'unit',
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'pro.unit',
      widthRate: 4,
      testValue: '1'
    },
    returnOutTotal: {
      Id: 'returnOutTotal',
      Key: 'returnOutTotal',
      Name: '退货总数',
      Alias: '',
      IsChecked: false,
      Value: 'pro.applyQty',
      widthRate: 1,
      testValue: '1'
    },
    appliedQtyIn: {
      Id: 'appliedQtyIn',
      Key: 'appliedQtyIn',
      Name: '已申请入库数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.returnQty',
      widthRate: 1,
      testValue: '1'
    },
    qty: {
      Id: 'qtyIn',
      Key: 'qty',
      Name: '入库数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.thisReturn',
      widthRate: 1,
      testValue: '1'
    },
    realQty: {
      Id: 'realQtyIn',
      Key: 'realQtyIn',
      Name: '实际入库数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.inQty',
      widthRate: 1,
      testValue: '1'
    },
    statusShow: {
      Id: 'statusShow',
      Key: 'statusShow',
      Name: '入库状态',
      Alias: '',
      IsChecked: false,
      Value: 'pro.statusShow',
      widthRate: 1,
      testValue: '1'
    },
    loactionCode: {
      Id: 'loactionCode',
      Key: 'loactionCode',
      Name: '储位',
      Alias: '',
      IsChecked: false,
      Value: 'pro.stockLocation',
      widthRate: 1
    }
  },
  cacheHeaderFootDiction: {

    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'Item.headerInfo.qrcode'
    },
    returnInNo: {
      Key: 'returnInNo',
      Name: '退货入库单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'Item.headerInfo.returnNo'
    },
    returnInBillTypeName: {
      Key: 'returnInBillTypeName',
      Name: '单据类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.billTypeName'
    },
    returnApplyNo: {
      Key: 'returnApplyNo',
      Name: '退货申请单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.applyNo'
    },
    createName: {
      Key: 'createName',
      Name: '制单人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'Item.headerInfo.createName'
    },
    deptName: {
      Key: 'deptName',
      Name: '制单部门',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.dept'
    },
    createBillDate: {
      Key: 'createBillDate',
      Name: '制单时间',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.createTime',
      pipe: 'date: yyyy-MM-dd HH:mm'
    },
    warehouseCode: {
      Key: 'warehouseCode',
      Name: '调入仓库',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.warehouseCode'
    },
    callInArea: {
      Key: 'callInArea',
      Name: '调入库区',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.areaCode'
    },
    state: {
      Key: 'stateIn',
      Name: '入库状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.inStatus'
    },
    note: {
      Key: 'note',
      Name: '备注',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'Item.headerInfo.remark'
    },
    loactionCode: {
      Id: 'loactionCode',
      Key: 'loactionCode',
      Name: '储位',
      Alias: '',
      IsChecked: false,
      Value: 'pro.stockLocation',
      widthRate: 1,
      testValue: 'EA'
    }
  }
};
export const DepotAllocation = {
  Name: '区域调拨单',
  Type: 'DepotAllocation',
  isEnable: false,
  Interface: '/regionAllot/item',
  TemplateType: '2005',
  TemplateUrl: 'view/print/templateTable.html',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true },
      { keyName: 'allotOrder', isChecked: true, isHeader: true },
      { keyName: 'createName', isChecked: true, isHeader: true },
      { keyName: 'deptName', isChecked: true, isHeader: true },
      { keyName: 'createBillDate', isChecked: true, isHeader: true },
      { keyName: 'callOutLocation', isChecked: true, isHeader: true },
      { keyName: 'callOutArea', isChecked: true, isHeader: true },
      { keyName: 'callInLocation', isChecked: true, isHeader: true },
      { keyName: 'callInArea', isChecked: true, isHeader: true },
      { keyName: 'sapTypeName', isChecked: true, isHeader: true }
    ],
    tbodyInfo: [
      { keyName: 'materialNo', isChecked: true },
      { keyName: 'materialName', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'amount', isChecked: true },
      { keyName: 'callOutCompleteQty', isChecked: true },
      { keyName: 'callInCompleteQty', isChecked: true }
    ]
  },
  printTempBdDiction: {
    materialNo: {
      Id: 'materialNo',
      Key: 'materialNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialNo',
      widthRate: 1,
      testValue: '1'
    },
    materialName: {
      Id: 'materialName',
      Key: 'materialName',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialName',
      widthRate: 1,
      testValue: '1'
    },
    unit: {
      Id: 'unit',
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'pro.unit',
      widthRate: 4,
      testValue: '1'
    },
    amount: {
      Id: 'amount',
      Key: 'amount',
      Name: '申请数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.amount',
      widthRate: 1,
      testValue: '1'
    },
    callOutCompleteQty: {
      Id: 'callOutCompleteQty',
      Key: 'callOutCompleteQty',
      Name: '调出完成数',
      Alias: '',
      IsChecked: false,
      Value: 'pro.outAmount',
      widthRate: 1,
      testValue: '1'
    },
    callInCompleteQty: {
      Id: 'callInCompleteQty',
      Key: 'callInCompleteQty',
      Name: '调入完成数',
      Alias: '',
      IsChecked: false,
      Value: 'pro.inAmount',
      widthRate: 1,
      testValue: '1'
    },
    loactionCode: {
      Id: 'loactionCode',
      Key: 'loactionCode',
      Name: '储位',
      Alias: '',
      IsChecked: false,
      Value: 'pro.locationCode',
      widthRate: 1
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'Item.headerInfo.qrcode'
    },
    allotOrder: {
      Key: 'allotOrder',
      Name: '调拨单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'Item.headerInfo.allotOrder'
    },
    createName: {
      Key: 'createName',
      Name: '制单人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'Item.headerInfo.createName'
    },
    deptName: {
      Key: 'deptName',
      Name: '制单部门',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.deptName'
    },
    createBillDate: {
      Key: 'createBillDate',
      Name: '制单日期',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.createDate'
    },
    callOutLocation: {
      Key: 'callOutLocation',
      Name: '调出仓库',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.outLocation'
    },
    callOutArea: {
      Key: 'callOutArea',
      Name: '调出库区',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.outArea'
    },
    callInLocation: {
      Key: 'callInLocation',
      Name: '调入仓库',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.inLocation'
    },
    callInArea: {
      Key: 'callInArea',
      Name: '调入库区',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.inArea'
    },
    sapTypeName: {
      Key: 'sapTypeName',
      Name: '移动类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.moveType'
    },
    sapInOrder: {
      Key: 'sapInOrder',
      Name: '领入预留单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.sapInOrder'
    },
    sapOutOrder: {
      Key: 'sapOutOrder',
      Name: '领出预留单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.sapOutOrder'
    }
  }
};
export const DeliveryOrderIn = {
  Name: '配送指令入库单',
  Type: 'DeliveryOrderIn',
  isEnable: false,
  Interface: '/deliveryInstruction/item',
  TemplateType: '2011',
  TemplateUrl: 'view/print/templateTable.html',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true },
      { keyName: 'deliveryOrder', isChecked: true, isHeader: true },
      { keyName: 'deliveryInstructionNo', isChecked: true, isHeader: true },
      { keyName: 'locationCode', isChecked: true, isHeader: true },
      { keyName: 'createName', isChecked: true, isHeader: true },
      { keyName: 'createBillDate', isChecked: true, isHeader: true },
      { keyName: 'stateIn', isChecked: true, isHeader: true },
      { keyName: 'postingStateShow', isChecked: true, isHeader: true }
    ],
    tbodyInfo: [
      { keyName: 'materialNo', isChecked: true },
      { keyName: 'materialName', isChecked: true },
      { keyName: 'rowNo', isChecked: true },
      { keyName: 'qtyIn', isChecked: true },
      { keyName: 'realQtyIn', isChecked: true },
      { keyName: 'statusShow', isChecked: true },
      { keyName: 'postingStateShow', isChecked: true }
    ]
  },
  printTempBdDiction: {
    materialNo: {
      Id: 'materialNo',
      Key: 'materialNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialNo',
      widthRate: 1,
      testValue: '1'
    },
    materialName: {
      Id: 'materialName',
      Key: 'materialName',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialName',
      widthRate: 1,
      testValue: '1'
    },
    rowNo: {
      Id: 'rowNo',
      Key: 'rowNo',
      Name: '行号',
      Alias: '',
      IsChecked: false,
      Value: 'pro.rowNo',
      widthRate: 4,
      testValue: '1'
    },
    qty: {
      Id: 'qty',
      Key: 'qtyIn',
      Name: '入库数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.amount',
      widthRate: 1,
      testValue: '1'
    },
    realQty: {
      Id: 'realQtyIn',
      Key: 'realQtyIn',
      Name: '实际入库数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.realAmount',
      widthRate: 1,
      testValue: '1'
    },
    statusShow: {
      Id: 'statusShow',
      Key: 'statusShow',
      Name: '入库状态',
      Alias: '',
      IsChecked: false,
      Value: 'pro.state',
      widthRate: 1,
      testValue: '1'
    },
    postingStateShow: {
      Id: 'postingStateShow',
      Key: 'postingStateShow',
      Name: '过账状态',
      Alias: '',
      IsChecked: false,
      Value: 'pro.postingState',
      widthRate: 1,
      testValue: '1'
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'Item.headerInfo.qrcode'
    },
    deliveryOrder: {
      Key: 'deliveryOrder',
      Name: '入库单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'Item.headerInfo.deliveryOrder'
    },
    deliveryInstructionNo: {
      Key: 'deliveryInstructionNo',
      Name: '配送指令',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.deliveryInstructionNo'
    },
    locationCode: {
      Key: 'locationCode',
      Name: '仓库编码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.warehouseCode'
    },
    createName: {
      Key: 'createName',
      Name: '制单人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'Item.headerInfo.createName'
    },
    createBillDate: {
      Key: 'createBillDate',
      Name: '制单时间',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.createDate',
      pipe: 'date: yyyy-MM-dd HH:mm'
    },
    state: {
      Key: 'stateIn',
      Name: '入库状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.state'
    },
    postingStateShow: {
      Key: 'postingStateShow',
      Name: '过账状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.postingState'
    }
  }
};
export const SaleOffset = {
  Name: '销售冲销单',
  Type: 'SaleOffset',
  isEnable: false,
  Interface: '/saleReverse/item',
  TemplateType: '1003',
  TemplateUrl: 'view/print/templateTable.html',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true },
      { keyName: 'reverseOrder', isChecked: true, isHeader: true },
      { keyName: 'deliveryNo', isChecked: true, isHeader: true },
      { keyName: 'customerName', isChecked: true, isHeader: true },
      { keyName: 'warehouseNumber', isChecked: true, isHeader: true },
      { keyName: 'isPostingAccount', isChecked: true, isHeader: true },
      { keyName: 'auditUserName', isChecked: true, isHeader: true },
      { keyName: 'auditStatus', isChecked: true, isHeader: true },
      { keyName: 'auditDate', isChecked: true, isHeader: true },
      { keyName: 'auditOpinion', isChecked: true, isHeader: true },
      { keyName: 'note', isChecked: true, isHeader: true }
    ],
    tbodyInfo: [
      { keyName: 'materialNo', isChecked: true },
      { keyName: 'materialName', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'applyDeliverQty', isChecked: true },
      { keyName: 'realDeliverQty', isChecked: true },
      { keyName: 'planQtyIn', isChecked: true },
      { keyName: 'realQtyIn', isChecked: true },
      { keyName: 'statusShow', isChecked: true }
    ]
  },
  printTempBdDiction: {
    materialNo: {
      Id: 'materialNo',
      Key: 'materialNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialNo',
      widthRate: 1,
      testValue: '1'
    },
    materialName: {
      Id: 'materialName',
      Key: 'materialName',
      Name: '物料描述',
      Alias: '',
      IsChecked: false,
      Value: 'pro.materialName',
      widthRate: 2,
      testValue: '1'
    },
    unit: {
      Id: 'unit',
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'pro.unit',
      widthRate: 1,
      testValue: 'EA'
    },
    applyDeliverQty: {
      Id: 'applyDeliverQty',
      Key: 'applyDeliverQty',
      Name: '申请发货数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.deliveryQty',
      widthRate: 2,
      testValue: '1'
    },
    realDeliverQty: {
      Id: 'realDeliverQty',
      Key: 'realDeliverQty',
      Name: '实际发货数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.realQty',
      widthRate: 2,
      testValue: '1'
    },
    planQtyIn: {
      Id: 'planQtyIn',
      Key: 'planQtyIn',
      Name: '计划入库数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.amount',
      widthRate: 2,
      testValue: '1'
    },
    realQty: {
      Id: 'realQtyIn',
      Key: 'realQtyIn',
      Name: '实际入库数量',
      Alias: '',
      IsChecked: false,
      Value: 'pro.realAmount',
      widthRate: 2,
      testValue: '1'
    },
    statusShow: {
      Id: 'statusShow',
      Key: 'statusShow',
      Name: '入库状态',
      Alias: '',
      IsChecked: false,
      Value: 'pro.stateShow',
      widthRate: 1,
      testValue: '1'
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'Item.headerInfo.qrcode'
    },
    reverseOrder: {
      Key: 'reverseOrder',
      Name: '销售冲销单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      IsQrCode: true,
      Value: 'Item.headerInfo.reverseOrder'
    },
    deliveryNo: {
      Key: 'deliveryNo',
      Name: '发货通知单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.deliveryNoteOrder'
    },
    customerName: {
      Key: 'customerName',
      Name: '客户名称',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.agentName'
    },
    warehouseNumber: {
      Key: 'warehouseNumber',
      Name: '仓库编码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: false,
      Value: 'Item.headerInfo.warehouseCode'
    },
    isPostingAccount: {
      Key: 'isPostingAccount',
      Name: '是否过账',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.isPosting'
    },
    auditUserName: {
      Key: 'auditUserName',
      Name: '审核人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.auditUserName'
    },
    auditStatus: {
      Key: 'auditStatus',
      Name: '审核状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.auditState'
    },
    auditDate: {
      Key: 'auditDate',
      Name: '审核日期',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.auditDate'
    },
    auditOpinion: {
      Key: 'auditOpinion',
      Name: '审核意见',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.auditNote'
    },
    note: {
      Key: 'note',
      Name: '备注',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'Item.headerInfo.note'
    }
  }
};
export const InvoiceContact = {
  Name: '发票联系单',
  Type: 'InvoiceContact',
  isEnable: true,
  Interface: '/invoice/view',
  TemplateType: '3005',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true, isAloneRow: false, isQrCode: true },
      { keyName: 'id', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'supplierName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'invoiceBillId', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'billNum', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'billAmount', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'rowAmount', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'taxAmount', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'billAccountNo', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'billBank', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'billBankAddress', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'transportFees', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'prepayments', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'warranty', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'deduction', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'billCreateDate', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'warranty', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'description', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'approver', isChecked: true, isHeader: true, isAloneRow: false },
    ],
    tbodyInfo: [
      { keyName: 'rowNo', isChecked: true },
      { keyName: 'purchaseType', isChecked: true },
      { keyName: 'purchaseNo', isChecked: true },
      { keyName: 'materialsNo', isChecked: true },
      { keyName: 'materialsName', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'quantity', isChecked: true },
      { keyName: 'toMatchQuantity', isChecked: true },
      { keyName: 'billWithoutaxPrice', isChecked: true },
      { keyName: 'rowAmount', isChecked: true },
      { keyName: 'taxCode', isChecked: true },
      { keyName: 'taxAmount', isChecked: true },
      { keyName: 'currencyType', isChecked: true },
      { keyName: 'unitPriceWithtax', isChecked: true },
      { keyName: 'totalAmount', isChecked: true },
      { keyName: 'unitPriceWithouttax', isChecked: true },
      { keyName: 'processor', isChecked: true },
    ]
  },
  printTempBdDiction: {
    rowNo: {
      Id: 'rowNo',
      Key: 'rowNo',
      Name: ' 行号',
      Alias: '',
      IsChecked: false,
      Value: 'rowNo',
      widthRate: 1
    },
    purchaseType: {
      Id: 'purchaseType',
      Key: 'purchaseType',
      Name: ' 类型',
      Alias: '',
      IsChecked: false,
      Value: 'VO_purchaseType',
      widthRate: 1
    },
    purchaseNo: {
      Id: 'purchaseNo',
      Key: 'purchaseNo',
      Name: ' 采购订单号',
      Alias: '',
      IsChecked: false,
      Value: 'VO_purchaseNo',
      widthRate: 1
    },
    materialsNo: {
      Id: 'materialsNo',
      Key: 'materialsNo',
      Name: ' 物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'VO_materialsNo',
      widthRate: 1
    },
    materialsName: {
      Id: 'materialsName',
      Key: 'materialsName',
      Name: '物料说明',
      Alias: '',
      IsChecked: false,
      Value: 'VO_materialsName',
      widthRate: 1
    },
    unit: {
      Id: 'unit',
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'VO_unit',
      widthRate: 1
    },
    quantity: {
      Id: 'quantity',
      Key: 'quantity',
      Name: '入库数量',
      Alias: '',
      IsChecked: false,
      Value: 'VO_quantity',
      widthRate: 1
    },
    toMatchQuantity: {
      Id: 'toMatchQuantity',
      Key: 'toMatchQuantity',
      Name: '本次开票数量',
      Alias: '',
      IsChecked: false,
      Value: 'VO_toMatchQuantity',
      widthRate: 1
    },
    billWithoutaxPrice: {
      Id: 'billWithoutaxPrice',
      Key: 'billWithoutaxPrice',
      Name: '开票不含税单价',
      Alias: '',
      IsChecked: false,
      Value: 'billWithoutaxPrice',
      widthRate: 1
    },
    rowAmount: {
      Id: 'rowAmount',
      Key: 'rowAmount',
      Name: '行金额',
      Alias: '',
      IsChecked: false,
      Value: 'rowAmount',
      widthRate: 1
    },
    taxCode: {
      Id: 'taxCode',
      Key: 'taxCode',
      Name: '税码',
      Alias: '',
      IsChecked: false,
      Value: 'VO_taxCode',
      widthRate: 1
    },
    taxAmount: {
      Id: 'taxAmount',
      Key: 'taxAmount',
      Name: '税额',
      Alias: '',
      IsChecked: false,
      Value: 'taxAmount',
      widthRate: 1
    },
    currencyType: {
      Id: 'currencyType',
      Key: 'currencyType',
      Name: '币种',
      Alias: '',
      IsChecked: false,
      Value: 'VO_currencyType',
      widthRate: 1
    },
    unitPriceWithtax: {
      Id: 'unitPriceWithtax',
      Key: 'unitPriceWithtax',
      Name: '实际开票含税单价',
      Alias: '',
      IsChecked: false,
      Value: 'unitPriceWithtax',
      widthRate: 1
    },
    totalAmount: {
      Id: 'totalAmount',
      Key: 'totalAmount',
      Name: '总金额',
      Alias: '',
      IsChecked: false,
      Value: 'totalAmount',
      widthRate: 1
    },
    unitPriceWithouttax: {
      Id: 'unitPriceWithouttax',
      Key: 'unitPriceWithouttax',
      Name: '采购订单单价',
      Alias: '',
      IsChecked: false,
      Value: 'VO_unitPriceWithouttax',
      widthRate: 1
    },
    processor: {
      Id: 'processor',
      Key: 'processor',
      Name: '采购业务员',
      Alias: '',
      IsChecked: false,
      Value: 'VO_processor',
      widthRate: 1
    },
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'qrcode'
    },
    id: {
      Key: 'id',
      Name: '发票联系单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'id'
    },
    supplierName: {
      Key: 'supplierName',
      Name: '供应商',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'supplierName'
    },
    invoiceBillId: {
      Key: 'invoiceBillId',
      Name: '发票编号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'invoiceBillId'
    },
    billNum: {
      Key: 'billNum',
      Name: '发票张数',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'billNum'
    },
    billAmount: {
      Key: 'billAmount',
      Name: '发票金额',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'billAmount'
    },
    rowAmount: {
      Key: 'rowAmount',
      Name: '发票行金额合计',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'rowAmount'
    },
    taxAmount: {
      Key: 'taxAmount',
      Name: '发票税额合计',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'taxAmount'
    },
    billAccountNo: {
      Key: 'billAccountNo',
      Name: '收款单位账号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'billAccountNo'
    },
    billBank: {
      Key: 'billBank',
      Name: '收款单位开户行',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'billBank'
    },
    billBankAddress: {
      Key: 'billBankAddress',
      Name: '收款单位开户行地址',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'billBankAddress'
    },
    transportFees: {
      Key: 'transportFees',
      Name: '运杂费',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'transportFees'
    },
    prepayments: {
      Key: 'prepayments',
      Name: '减：预付款',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'prepayments'
    },
    warranty: {
      Key: 'warranty',
      Name: '暂扣：质保金',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'warranty'
    },
    deduction: {
      Key: 'deduction',
      Name: '减：扣款项',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'deduction'
    },
    billCreateDate: {
      Key: 'billCreateDate',
      Name: '发票日期',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'billCreateDate'
    },
    approver: {
      Key: 'approver',
      Name: '待审批人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'approver'
    },
    description: {
      Key: 'description',
      Name: '描述 ',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'description'
    },
  },
  testData: {
    headerInfo: {
      qrcode: '1111111111111',
      id: '123456789',
      supplierName: '公司',
      invoiceBillId: '3333333333333333',
      billNum: 55,
      billAmount: 9999,
      rowAmount: 1000,
      taxAmount: 100,
      billAccountNo: '999999999999999',
      billBank: '中国银行',
      billBankAddress: '南京',
      transportFees: 1000,
      prepayments: 5000,
      warranty: 2000,
      deduction: 10,
      billCreateDate: 1533626253246,
      description: '描述',
      approver: '测试',
    },
    dataList: [{
      rowNo: '95386',
      purchaseType: '111',
      purchaseNo: '接收单',
      materialsNo: 100,
      materialsName: '22222222222222',
      unit: '333333333333',
      quantity: 11,
      toMatchQuantity: 100,
      billWithoutaxPrice: 2,
      rowAmount: 100,
      taxCode: '1111',
      taxAmount: '1111',
      currencyType: '1111',
      unitPriceWithtax: '1111',
      totalAmount: '1111',
      unitPriceWithouttax: '1111',
      processor: '1111',
    }, {
      rowNo: '95386',
      purchaseType: '111',
      purchaseNo: '接收单',
      materialsNo: 100,
      materialsName: '22222222222222',
      unit: '333333333333',
      quantity: 11,
      toMatchQuantity: 100,
      billWithoutaxPrice: 2,
      rowAmount: 100,
      taxCode: '1111',
      taxAmount: '1111',
      currencyType: '1111',
      unitPriceWithtax: '1111',
      totalAmount: '1111',
      unitPriceWithouttax: '1111',
      processor: '1111',
    }]
  }
};
/**
 * 发货单 3100
 * **/
export const DispatchBill = {
  Name: '发货单',
  Type: 'DispatchBill',
  isEnable: true,
  Interface: '/warehouseInvoice/view',
  TemplateType: '3100',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true, isAloneRow: false, isQrCode: true },
      { keyName: 'invoiceNo', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'deliveryType', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'purchaseNo', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'supplierName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'goodsReceivor', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'contractType', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'consignee', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'deliveryPhone', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'deliveryAddress', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'logisticsNo', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'logisticsCompany', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'deliveryDate', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'logisticsContact', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'logisticsPhone', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'licensePlate', isChecked: true, isHeader: true, isAloneRow: false }
    ],
    tbodyInfo: [
      { keyName: 'lineNum', isChecked: true },
      { keyName: 'materialsNo', isChecked: true },
      { keyName: 'materialsName', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'ifCodeManage', isChecked: true },
      { keyName: 'deliveryCount', isChecked: true }
    ]
  },
  printTempBdDiction: {
    lineNum: {
      Key: 'lineNum',
      Name: '行号',
      Alias: '',
      IsChecked: false,
      Value: 'lineNum',
      widthRate: 1
    },
    materialsNo: {
      Key: 'materialsNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'materialsNo',
      widthRate: 1
    },
    materialsName: {
      Key: 'materialsName',
      Name: '物料名称',
      Alias: '',
      IsChecked: false,
      Value: 'materialsName',
      widthRate: 1
    },
    unit: {
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'unit',
      widthRate: 1
    },
    ifCodeManage: {
      Key: 'ifCodeManage',
      Name: '是否条码管理',
      Alias: '',
      IsChecked: false,
      Value: 'ifCodeManage',
      widthRate: 1,
      pipe: 'barcodeManage'
    },
    deliveryCount: {
      Key: 'deliveryCount',
      Name: '本次发货数量',
      Alias: '',
      IsChecked: false,
      Value: 'deliveryCount',
      widthRate: 1
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'qrcode'
    },
    invoiceNo: {
      Key: 'invoiceNo',
      Name: '发货单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'invoiceNo'
    },
    deliveryType: {
      Key: 'deliveryType',
      Name: '发货类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'deliveryType',
      pipe: 'deliverGoodsType'
    },
    purchaseNo: {
      Key: 'purchaseNo',
      Name: '合同编号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'purchaseNo'
    },
    supplierName: {
      Key: 'supplierName',
      Name: '供应商',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'supplierName'
    },
    goodsReceivor: {
      Key: 'goodsReceivor',
      Name: '收货方',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'goodsReceivor'
    },
    contractType: {
      Key: 'contractType',
      Name: '合同类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'contractType',
      pipe: 'contractType'
    },
    consignee: {
      Key: 'consignee',
      Name: '收货人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'consignee'
    },
    deliveryPhone: {
      Key: 'deliveryPhone',
      Name: '收货人电话',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'deliveryPhone'
    },
    deliveryAddress: {
      Key: 'deliveryAddress',
      Name: '收货地址',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'deliveryAddress'
    },
    logisticsNo: {
      Key: 'logisticsNo',
      Name: '物流单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'logisticsNo'
    },
    logisticsCompany: {
      Key: 'logisticsCompany',
      Name: '物流公司',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'logisticsCompany'
    },
    deliveryDate: {
      Key: 'deliveryDate',
      Name: '发货时间',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'deliveryDate',
      pipe: 'date:yyyy-MM-dd HH:mm'
    },
    logisticsContact: {
      Key: 'logisticsContact',
      Name: '物流联系人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'logisticsContact'
    },
    logisticsPhone: {
      Key: 'logisticsPhone',
      Name: '物流联系电话',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'logisticsPhone'
    },
    licensePlate: {
      Key: 'licensePlate',
      Name: '车牌号码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'licensePlate'
    }
  },
  testData: {
    headerInfo: {
      qrcode: '12345678999999999',
      invoiceNo: '123456789',
      deliveryType: 1,
      purchaseNo: '3333333333333333',
      supplierName: 'bkr',
      goodsReceivor: 'jxty',
      contractType: 1,
      consignee: 100,
      deliveryPhone: '999999999999999',
      deliveryAddress: '中国银行',
      logisticsNo: '99999999999',
      logisticsCompany: 'shunfeng',
      deliveryDate: '1538271907989',
      logisticsContact: '小李',
      logisticsPhone: '11011',
      licensePlate: '京A123456'
    },
    dataList: [
      {
      lineNum: 1,
      materialsNo: '111',
      materialsName: '拖拉机',
      unit: 100,
      ifCodeManage: 0,
      deliveryCount: 111
      }, {
        lineNum: 2,
        materialsNo: '111',
        materialsName: '拖拉机',
        unit: 100,
        ifCodeManage: 1,
        deliveryCount: 111
      }
    ]
  }
};
/**
 * 收货单 3101
 * **/
export const ReceivingBill = {
  Name: '收货单',
  Type: 'ReceivingBill',
  isEnable: true,
  Interface: '/warehouseInvoice/view',
  TemplateType: '3101',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true, isAloneRow: false, isQrCode: true },
      { keyName: 'invoiceNo', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'deliveryType', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'purchaseNo', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'contractType', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'status', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'supplierName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'goodsReceivor', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'businessEntity', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'creatorName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'ifCodeManage', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'createDate', isChecked: true, isHeader: true, isAloneRow: false }
    ],
    tbodyInfo: [
      { keyName: 'lineNum', isChecked: true },
      { keyName: 'materialsNo', isChecked: true },
      { keyName: 'materialsName', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'orderCount', isChecked: true },
      { keyName: 'deliveryCount', isChecked: true },
      { keyName: 'deliveredCount', isChecked: true }
    ]
  },
  printTempBdDiction: {
    lineNum: {
      Key: 'lineNum',
      Name: '行号',
      Alias: '',
      IsChecked: false,
      Value: 'lineNum',
      widthRate: 1
    },
    materialsNo: {
      Key: 'materialsNo',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'materialsNo',
      widthRate: 1
    },
    materialsName: {
      Key: 'materialsName',
      Name: '物料名称',
      Alias: '',
      IsChecked: false,
      Value: 'materialsName',
      widthRate: 1
    },
    unit: {
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'unit',
      widthRate: 1
    },
    orderCount: {
      Key: 'orderCount',
      Name: '订单数量',
      Alias: '',
      IsChecked: false,
      Value: 'orderCount',
      widthRate: 1
    },
    deliveryCount: {
      Key: 'deliveryCount',
      Name: '本次收货数量',
      Alias: '',
      IsChecked: false,
      Value: 'deliveryCount',
      widthRate: 1
    },
    deliveredCount: {
      Key: 'deliveredCount',
      Name: '已收货数量',
      Alias: '',
      IsChecked: false,
      Value: 'deliveryCount',
      widthRate: 1
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'qrcode'
    },
    invoiceNo: {
      Key: 'invoiceNo',
      Name: '收货单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'invoiceNo'
    },
    deliveryType: {
      Key: 'deliveryType',
      Name: '发货类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'deliveryType',
      pipe: 'deliverGoodsType'
    },
    purchaseNo: {
      Key: 'purchaseNo',
      Name: '合同编号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'purchaseNo'
    },
    status: {
      Key: 'status',
      Name: '单据状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'status',
      pipe: 'documentState'
    },
    supplierName: {
      Key: 'supplierName',
      Name: '供应商',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'supplierName'
    },
    goodsReceivor: {
      Key: 'goodsReceivor',
      Name: '收货方',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'goodsReceivor'
    },
    contractType: {
      Key: 'contractType',
      Name: '合同类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'contractType',
      pipe: 'agreementFlag'
    },
    ifCodeManage: {
      Key: 'ifCodeManage',
      Name: '是否条码管理',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'ifCodeManage',
      pipe: 'barcodeManage'
    },
    businessEntity: {
      Key: 'businessEntity',
      Name: '业务实体',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'businessEntity'
    },
    creatorName: {
      Key: 'creatorName',
      Name: '制单人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'creatorName'
    },
    createDate: {
      Key: 'createDate',
      Name: '制单时间',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'createDate',
      pipe: 'date: yyyy-MM-dd HH:mm'
    }
  },
  testData: {
    headerInfo: {
      qrcode: '12345678999999999',
      invoiceNo: '123456789',
      deliveryType: 1,
      purchaseNo: '3333333333333333',
      status: 1,
      supplierName: '江西铜业',
      goodsReceivor: '江西铜业',
      contractType: 1,
      businessEntity: '江西铜业',
      ifCodeManage: 1,
      creatorName: '江西铜业',
      createDate: '1538223891587',
    },
    dataList: [{
      lineNum: 1,
      materialsNo: '111',
      materialsName: '拖拉机',
      unit: '个',
      orderCount: 1000,
      deliveryCount: 111,
      deliveredCount: 111
    }, {
      lineNum: 2,
      materialsNo: '111',
      materialsName: '拖拉机',
      unit: '个',
      orderCount: 1000,
      deliveryCount: 111,
      deliveredCount: 111
    }]
  }
};
/**
 * 领料申请 3102
 * **/
export const PickingApply = {
  Name: '领料申请单',
  Type: 'PickingApply',
  isEnable: true,
  Interface: '/pickingApply/item',
  TemplateType: '3102',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true, isAloneRow: false, isQrCode: true },
      { keyName: 'applyNo', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'orgName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'usage', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'materialType', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'applyDepartment', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'section', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'plannerName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'needDate', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'receiverName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'receiverNumber', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'receiverAddress', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'applyName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'applyDate', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'status', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'outStatus', isChecked: true, isHeader: true, isAloneRow: false }
    ],
    tbodyInfo: [
      { keyName: 'rowNo', isChecked: true },
      { keyName: 'materialCode', isChecked: true },
      { keyName: 'materialName', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'amountApply', isChecked: true },
      { keyName: 'amountOuted', isChecked: true },
      { keyName: 'status', isChecked: true }
    ]
  },
  printTempBdDiction: {
    rowNo: {
      Key: 'rowNo',
      Name: '行号',
      Alias: '',
      IsChecked: false,
      Value: 'rowNo',
      widthRate: 1
    },
    materialCode: {
      Key: 'materialCode',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'materialCode',
      widthRate: 1
    },
    materialName: {
      Key: 'materialName',
      Name: '物料名称',
      Alias: '',
      IsChecked: false,
      Value: 'materialName',
      widthRate: 1
    },
    unit: {
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'unit',
      widthRate: 1
    },
    amountApply: {
      Key: 'amountApply',
      Name: '申请数量',
      Alias: '',
      IsChecked: false,
      Value: 'amountApply',
      widthRate: 1
    },
    amountOuted: {
      Key: 'amountOuted',
      Name: '已出库数量',
      Alias: '',
      IsChecked: false,
      Value: 'amountOuted',
      widthRate: 1
    },
    status: {
      Key: 'status',
      Name: '出库状态',
      Alias: '',
      IsChecked: false,
      Value: 'status',
      widthRate: 1,
      pipe: 'stockOutStatus'
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'qrcode'
    },
    applyNo: {
      Key: 'applyNo',
      Name: '领料申请单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'applyNo'
    },
    orgName: {
      Key: 'orgName',
      Name: '业务实体',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'orgName'
    },
    usage: {
      Key: 'usage',
      Name: '用途',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'usage'
    },
    materialType: {
      Key: 'materialType',
      Name: '物料类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'materialType',
      pipe: 'materialType2'
    },
    applyDepartment: {
      Key: 'applyDepartment',
      Name: '领料部门',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'applyDepartment'
    },
    section: {
      Key: 'section',
      Name: '工段',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'section'
    },
    plannerName: {
      Key: 'plannerName',
      Name: '计划员',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'plannerName'
    },
    needDate: {
      Key: 'needDate',
      Name: '需要日期',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'needDate',
      pipe: 'date:yyyy-MM-dd'
    },
    receiverName: {
      Key: 'receiverName',
      Name: '收货人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'receiverName'
    },
    receiverNumber: {
      Key: 'receiverNumber',
      Name: '收货人电话',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'receiverNumber'
    },
    receiverAddress: {
      Key: 'receiverAddress',
      Name: '收货地址',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'receiverAddress'
    },
    applyName: {
      Key: 'applyName',
      Name: '申请人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'applyName'
    },
    applyDate: {
      Key: 'applyDate',
      Name: '申请日期',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'applyDate',
      pipe: 'date:yyyy-MM-dd'
    },
    status: {
      Key: 'status',
      Name: '审批状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'status',
      pipe: 'auditApproveStatus'
    },
    outStatus: {
      Key: 'outStatus',
      Name: '出库状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'outStatus',
      pipe: 'stockOutStatus'
    }
  },
  testData: {
    headerInfo: {
      qrcode: '12345678999999999',
      applyNo: '123456789',
      orgName: '公司',
      usage: '3333333333333333',
      materialType: 1,
      applyDepartment: 'bkr',
      section: 9999,
      plannerName: 1000,
      needDate: '1538223891587',
      receiverName: '999999999999999',
      receiverNumber: '11011',
      receiverAddress: '中国银行',
      applyName: '中国银行',
      applyDate: '1538223891587',
      status: 1,
      outStatus: 1
    },
    dataList: [{
      rowNo: 1,
      materialCode: '111',
      materialName: '拖拉机',
      unit: '个',
      amountApply: 1000,
      amountOuted: 111,
      status: 1
    }, {
      rowNo: 2,
      materialCode: '111',
      materialName: '拖拉机',
      unit: '个',
      amountApply: 1000,
      amountOuted: 111,
      status: 1
    }]
  }
};
/**
 * 领料出库 3103
 * **/
export const PickingDelivery = {
  Name: '领料出库单',
  Type: 'PickingDelivery',
  isEnable: true,
  Interface: '/pickingOut/item',
  TemplateType: '3103',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true, isAloneRow: false, isQrCode: true },
      { keyName: 'pickingNo', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'applyNo', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'orgName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'applyDepartment', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'section', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'plannerName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'receiverName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'receiverNumber', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'receiverAddress', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'createDate', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'needDate', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'keeperName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'outStatus', isChecked: true, isHeader: true, isAloneRow: false }
    ],
    tbodyInfo: [
      { keyName: 'rowNo', isChecked: true },
      { keyName: 'materialCode', isChecked: true },
      { keyName: 'materialName', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'amountApply', isChecked: true },
      { keyName: 'warehouseCode', isChecked: true },
      { keyName: 'amountOuted', isChecked: true },
      { keyName: 'status', isChecked: true }
    ]
  },
  printTempBdDiction: {
    rowNo: {
      Key: 'rowNo',
      Name: '行号',
      Alias: '',
      IsChecked: false,
      Value: 'rowNo',
      widthRate: 1
    },
    materialCode: {
      Key: 'materialCode',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'materialCode',
      widthRate: 1
    },
    materialName: {
      Key: 'materialName',
      Name: '物料名称',
      Alias: '',
      IsChecked: false,
      Value: 'materialName',
      widthRate: 1
    },
    unit: {
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'unit',
      widthRate: 1
    },
    amountApply: {
      Key: 'amountApply',
      Name: '领料数量',
      Alias: '',
      IsChecked: false,
      Value: 'amountApply',
      widthRate: 1
    },
    warehouseCode: {
      Key: 'warehouseCode',
      Name: '领出仓库',
      Alias: '',
      IsChecked: false,
      Value: 'warehouseCode',
      widthRate: 1
    },
    amountOuted: {
      Key: 'amountOuted',
      Name: '出库数量',
      Alias: '',
      IsChecked: false,
      Value: 'amountOuted',
      widthRate: 1
    },
    status: {
      Key: 'status',
      Name: '状态',
      Alias: '',
      IsChecked: false,
      Value: 'status',
      widthRate: 1,
      pipe: 'stockOutStatus'
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'qrcode'
    },
    pickingNo: {
      Key: 'pickingNo',
      Name: '领料出库单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'pickingNo'
    },
    // createDate: {
    //   Key: 'createDate',
    //   Name: '创建时间',
    //   IsAloneRow: false,
    //   IsChecked: true,
    //   IsHeader: true,
    //   Value: 'createDate'
    // },
    applyNo: {
      Key: 'applyNo',
      Name: '领料申请单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'applyNo'
    },
    orgName: {
      Key: 'orgName',
      Name: '业务实体',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'orgName'
    },
    applyDepartment: {
      Key: 'applyDepartment',
      Name: '领料部门',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'applyDepartment'
    },
    section: {
      Key: 'section',
      Name: '工段',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'section'
    },
    plannerName: {
      Key: 'plannerName',
      Name: '计划员',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'plannerName'
    },
    receiverName: {
      Key: 'receiverName',
      Name: '收货人',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'receiverName'
    },
    receiverNumber: {
      Key: 'receiverNumber',
      Name: '收货人电话',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'receiverNumber'
    },
    receiverAddress: {
      Key: 'receiverAddress',
      Name: '收货地址',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'receiverAddress'
    },
    createDate: {
      Key: 'createDate',
      Name: '申请日期',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'createDate',
      pipe: 'date:yyyy-MM-dd HH:mm'
    },
    needDate: {
      Key: 'needDate',
      Name: '需要日期',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'needDate',
      pipe: 'date:yyyy-MM-dd HH:mm'
    },
    keeperName: {
      Key: 'keeperName',
      Name: '保管员',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'keeperName'
    },
    outStatus: {
      Key: 'outStatus',
      Name: '状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'outStatus',
      pipe: 'stockOutStatus'
    }
  },
  testData: {
    headerInfo: {
      qrcode: '12345678999999999',
      pickingNo: '123456789',
      applyNo: '1111',
      orgName: '公司',
      applyDepartment: 'bkr',
      section: 9999,
      plannerName: 1000,
      receiverName: '999999999999999',
      receiverNumber: '11011',
      receiverAddress: '中国银行',
      createDate: '1538223891587',
      needDate: '1538223891587',
      keeperName: '徐',
      outStatus: 1
    },
    dataList: [{
      rowNo: 1,
      materialCode: '111',
      materialName: '拖拉机',
      unit: '个',
      amountApply: 1000,
      warehouseCode: '仓库1',
      amountOuted: 111,
      status: 1
    }, {
      rowNo: 2,
      materialCode: '222',
      materialName: '拖拉机',
      unit: '个',
      amountApply: 1000,
      warehouseCode: '仓库2',
      amountOuted: 111,
      status: 1
    }]
  }
};
/**
 * 入库单 3104
 */
export const WarehouseStockIn = {
  Name: '入库单',
  Type: 'WarehouseStockIn',
  isEnable: true,
  Interface: '/WarehouseStockIn/item',
  TemplateType: '3104',
  defaultTemplate: {
    headerInfo: [
      { keyName: 'qrcode', isChecked: true, isHeader: true, isAloneRow: false, isQrCode: true },
      { keyName: 'inNo', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'invoiceNo', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'deliveryType', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'contractNo', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'agreementFlag', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'supplierName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'receiveName', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'status', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'barcodeFlag', isChecked: true, isHeader: true, isAloneRow: false },
      { keyName: 'keeperName', isChecked: true, isHeader: true, isAloneRow: false }
    ],
    tbodyInfo: [
      { keyName: 'lineNum', isChecked: true },
      { keyName: 'materialCode', isChecked: true },
      { keyName: 'materialName', isChecked: true },
      { keyName: 'unit', isChecked: true },
      { keyName: 'amountTotal', isChecked: true },
      { keyName: 'amountIn', isChecked: true },
      { keyName: 'locationCode', isChecked: true }
    ]
  },
  printTempBdDiction: {
    lineNum: {
      Key: 'lineNum',
      Name: '行号',
      Alias: '',
      IsChecked: false,
      Value: 'lineNum',
      widthRate: 1
    },
    materialCode: {
      Key: 'materialCode',
      Name: '物料编码',
      Alias: '',
      IsChecked: false,
      Value: 'materialCode',
      widthRate: 1
    },
    materialName: {
      Key: 'materialName',
      Name: '物料名称',
      Alias: '',
      IsChecked: false,
      Value: 'materialName',
      widthRate: 1
    },
    unit: {
      Key: 'unit',
      Name: '单位',
      Alias: '',
      IsChecked: false,
      Value: 'unit',
      widthRate: 1
    },
    amountTotal: {
      Key: 'amountTotal',
      Name: '验收数量',
      Alias: '',
      IsChecked: false,
      Value: 'amountTotal',
      widthRate: 1
    },
    amountIn: {
      Key: 'amountIn',
      Name: '本单已入库数量',
      Alias: '',
      IsChecked: false,
      Value: 'amountIn',
      widthRate: 1
    },
    locationCode: {
      Key: 'locationCode',
      Name: '储位',
      Alias: '',
      IsChecked: false,
      Value: 'locationCode',
      widthRate: 1
    }
  },
  cacheHeaderFootDiction: {
    qrcode: {
      Key: 'qrcode',
      Name: '二维码',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'qrcode'
    },
    inNo: {
      Key: 'inNo',
      Name: '入库单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'inNo'
    },
    invoiceNo: {
      Key: 'invoiceNo',
      Name: '收货单号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'invoiceNo'
    },
    deliveryType: {
      Key: 'deliveryType',
      Name: '发货类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'deliveryType',
      pipe: 'deliverGoodsType'
    },
    contractNo: {
      Key: 'contractNo',
      Name: '合同编号',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'contractNo'
    },
    agreementFlag: {
      Key: 'agreementFlag',
      Name: '合同类型',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'agreementFlag',
      pipe: 'agreementFlag'
    },
    supplierName: {
      Key: 'supplierName',
      Name: '供应商',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'supplierName'
    },
    receiveName: {
      Key: 'receiveName',
      Name: '收货方',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'receiveName'
    },
    status: {
      Key: 'status',
      Name: '状态',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'status',
      pipe: 'inventoryType'
    },
    barcodeFlag: {
      Key: 'barcodeFlag',
      Name: '是否条码管理',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'barcodeFlag',
      pipe: 'barcodeManage'
    },
    keeperName: {
      Key: 'keeperName',
      Name: '保管员',
      IsAloneRow: false,
      IsChecked: true,
      IsHeader: true,
      Value: 'keeperName'
    }
  },
  testData: {
    headerInfo: {
      qrcode: '12345678999999999',
      inNo: '123456789',
      invoiceNo: '123456789',
      deliveryType: 1,
      contractNo: '3333333333333333',
      agreementFlag: 1,
      supplierName: '江西铜业',
      receiveName: '江西铜业2',
      status: 1,
      barcodeFlag: 1,
      keeperName: 'xxxxxx',
    },
    dataList: [{
      lineNum: 1,
      materialCode: '111',
      materialName: '拖拉机',
      unit: '个',
      amountTotal: 1000,
      amountIn: 111,
      locationCode: 111
    }, {
      lineNum: 2,
      materialCode: '111',
      materialName: '拖拉机2',
      unit: '个',
      amountTotal: 1000,
      amountIn: 111,
      locationCode: 111
    }]
  }
};
/**
 * 打印模板列表
 * **/
export const PrintTmplate = [
  {
    title: '入库单模板',
    color: '#00c609',
    list: [BeginningIn, UnusualIn, WarehouseStockIn]
  }, {
    title: '出库单模板',
    color: '#e80000',
    list: [PickingApply, UnusualOut, PickingDelivery]
  }, {
    title: '其他模板',
    color: '#0084e8',
    list: [Inventory, DispatchBill, ReceivingBill]
  }
];


// 打印模板字典
export const PrintTemplateDictionary = {
  HeaderGroup: {},
  TbodyGroup: {}
};
// 字典模板表头和表尾字典集合

// printNeed 新模版头部信息字段
PrintTemplateDictionary.HeaderGroup = {
  receiverSite: {
    Key: 'receiverSite',
    Name: '收货站点',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '收货站点'
  },
  sapOrder: {
    Key: 'sapOrder',
    Name: '预留单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '预留单号'
  },
  sapInOrder: {
    Key: 'sapInOrder',
    Name: '领入预留单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '领入预留单号'
  },
  sapOutOrder: {
    Key: 'sapOutOrder',
    Name: '领出预留单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '领出预留单号'
  },
  voucherOutNo: {
    Key: 'voucherOutNo',
    Name: '领出物料凭证',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '领出物料凭证'
  },
  voucherOutStatus: {
    Key: 'voucherOutStatus',
    Name: '领出过账状态',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '未过账'
  },
  voucherInNo: {
    Key: 'voucherInNo',
    Name: '领入物料凭证',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '领入物料凭证'
  },
  voucherInStatus: {
    Key: 'voucherInStatus',
    Name: '领入过账状态',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '未过账'
  },
  remark: {
    Key: 'remark',
    Name: '备注',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '伟大的单据'
  },
  isReturnDesc: {
    Key: 'isReturnDesc',
    Name: '退货状态',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '已退货'
  },
  salesmanName: {
    Key: 'salesmanName',
    Name: '销售员',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'Jhon'
  },
  supplierOrgName: {
    Key: 'supplierOrgName',
    Name: '备件公司',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XX股份公司'
  },
  buyerName: {
    Key: 'buyerName',
    Name: '采购员',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '测试员'
  },
  purchaseOrgNameRet: {
    Key: 'purchaseOrgName',
    Name: '采购公司',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XX有限公司'
  },
  saleNoRet: {
    Key: 'saleNo',
    Name: '采购单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGTB1231231231'
  },
  applyNo: {
    Key: 'applyNo',
    Name: '申请单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGTB1231231231'
  },
  allotOrder: {
    Key: 'allotOrder',
    Name: '调拨单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGTB1231231231'
  },
  carrierPhone: {
    Key: 'carrierPhone',
    Name: '承运人联系方式',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '13255456788'
  },
  carrier: {
    Key: 'carrier',
    Name: '承运人',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '测试'
  },
  logisOrder: {
    Key: 'logisOrder',
    Name: '物流单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '1000689566'
  },
  logisCom: {
    Key: 'logisCom',
    Name: '物流公司',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '顺丰快递'
  },
  inAddress: {
    Key: 'inAddress',
    Name: '调入地址',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '测试地址'
  },
  inAgentPhone: {
    Key: 'inAgentPhone',
    Name: '调入联系方式',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '13255456545'
  },
  inAgentContact: {
    Key: 'inAgentContact',
    Name: '调入联系人',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '测试'
  },
  inAgentName: {
    Key: 'inAgentName',
    Name: '调入客户',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '测试'
  },
  outAgentPhone: {
    Key: 'outAgentPhone',
    Name: '调出联系方式',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '13255456545'
  },
  outAgentContact: {
    Key: 'outAgentContact',
    Name: '调出联系人',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '测试'
  },
  outAgentName: {
    Key: 'outAgentName',
    Name: '调出客户',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '测试'
  },
  deptName: {
    Key: 'deptName',
    Name: '制单部门',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '总部'
  },
  sapTypeName: {
    Key: 'sapTypeName',
    Name: '移动类型',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'Z01'
  },
  sapName: {
    Key: 'sapName',
    Name: 'SAP内部订单',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '21220002348'
  },
  createDateGua: {
    Key: 'createDate',
    Name: '制单时间',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '2018-3-1',
    pipe: 'date: yyyy-MM-dd HH:mm'
  },
  createPartName: {
    Key: 'createPartName',
    Name: '制单部门',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '总部'
  },
  guaPurchaseNo: {
    Key: 'purchaseNo',
    Name: '三包申请单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGSB2018032400004672'
  },
  guaranteesTypeName: {
    Key: 'guaranteesTypeName',
    Name: '单据类型',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '三包出库'
  },
  guaranteesOutNo: {
    Key: 'guaranteesOutNo',
    Name: '三包出库单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGSC2018032400004696'
  },
  deliveryNOs: {
    Key: 'deliveryNOs',
    Name: '业务单号',
    IsAloneRow: true,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGFH123123123123131,XGFH1290870423671201,XGFH1290870423671201'
  },
  boxList: {
    Key: 'boxList',
    Name: '装箱信息(类型/数量/重量)',
    IsAloneRow: true,
    IsChecked: true,
    IsHeader: true,
    testValue: '木箱/2/100,纸箱/2/100,托盘/2/100,裸装/100/2'
  },
  freightNo: {
    Key: 'freightNo',
    Name: '物流单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '12313213123131231'
  },
  carrierCar: {
    Key: 'carrierCar',
    Name: '承运车辆',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '苏A-12328'
  },
  carrierUserName: {
    Key: 'carrierUserName',
    Name: '承运人',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '用户'
  },
  carrierOrgName: {
    Key: 'carrierOrgName',
    Name: '承运商',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '顺丰快递'
  },
  carrierAmount: {
    Key: 'carrierAmount',
    Name: '费用',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '1300'
  },
  deliveryDate: {
    Key: 'deliveryDate',
    Name: '发货日期',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '2018-8-13'
  },
  receiverAddress: {
    Key: 'receiverAddress',
    Name: '收货地址',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '测试地址'
  },
  receiverTel: {
    Key: 'receiverTel',
    Name: '联系方式',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '13255456772'
  },
  settlementDesc: {
    Key: 'settlementDesc',
    Name: '结算方式',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '月结'
  },
  shippingMethod: {
    Key: 'shippingMethod',
    Name: '运输方式',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '快递'
  },
  orgName: {
    Key: 'orgName',
    Name: '工厂名称',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '测试工厂'
  },
  deliveryNo: {
    Key: 'deliveryNo',
    Name: '发货通知单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGFT2018031200003755'
  },
  salesType: {
    Key: 'salesType',
    Name: '销售类型',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '测试销售'
  },
  dealerOrgName: {
    Key: 'dealerOrgName',
    Name: '客户名称',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '测试客户'
  },
  handBillNo: {
    Key: 'billNo',
    Name: '发运交接单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGFT2018031200003755'
  },
  qrcode: {
    Key: 'qrcode',
    Name: '二维码',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    IsQrCode: true,
    testValue: 'qrcode'
  },
  purchaseOrgName: {
    Key: 'purchaseOrgName',
    Name: '客户名称',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'xxx有限公司'
  },
  saleNo: {
    Key: 'saleNo',
    Name: '销售意向单',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '2018020202'
  },
  purchaseNo: {
    Key: 'purchaseNo',
    Name: '采购单号',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: 'XGFT20180228001'
  },
  purchaseLevelName: {
    Key: 'purchaseLevelName',
    Name: '采购级别',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '1级'
  },
  purchaseOrgId: {
    Key: 'purchaseOrgId',
    Name: '售达方',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: 'xxx有限公司'
  },
  deliveryOrgId: {
    Key: 'deliveryOrgId',
    Name: '送达方',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: 'xxx有限公司'
  },
  customerPurchaseCode: {
    Key: 'customerPurchaseCode',
    Name: '采购单编号',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: 'XGFT20180228001'
  },
  distributionChannelName: {
    Key: 'distributionChannelName',
    Name: '分销渠道',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: 'xxx'
  },
  payConditionName: {
    Key: 'payConditionName',
    Name: '付款条件',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '到付'
  },
  orderType: {
    Key: 'orderType',
    Name: '订单类型',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '网购'
  },
  deliveryTypeName: {
    Key: 'deliveryTypeName',
    Name: '发运方式',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '海运'
  },
  settleTypeName: {
    Key: 'settleTypeName',
    Name: '结算方式',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '现金'
  },
  outLocation: {
    Key: 'outLocation',
    Name: '发出仓库',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '北京'
  },
  typeIn: {
    Key: 'type',
    Name: '入库类型',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '销售退入'
  },
  inLocation: {
    Key: 'inLocation',
    Name: '领入仓库',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '北京'
  },
  receiverName: {
    Key: 'receiverName',
    Name: '收货人',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '张三'
  },
  receiverPhone: {
    Key: 'receiverPhone',
    Name: '收货人联系方式',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '李四'
  },
  receiverFax: {
    Key: 'receiverFax',
    Name: '传真',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '02587654321'
  },
  address: {
    Key: 'address',
    Name: '收货地址',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: 'xxx区xx路xx小区'
  },
  note: {
    Key: 'note',
    Name: '备注',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: false,
    testValue: '8216-ME-00043 主销轴'
  },
  noteIn: {
    Key: 'note',
    Name: '原因',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: false,
    testValue: '测试'
  },
  createDate: {
    Key: 'createDate',
    Name: '申请日期',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: false,
    testValue: '2018-02-28'
  },
  abnormalNo: {
    Key: 'abnormalNo',
    Name: '出库单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGOT2018031200003755'
  },
  abnormalNoIn: {
    Key: 'abnormalNo',
    Name: '入库单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGOT2018031200003755'
  },
  type: {
    Key: 'type',
    Name: '出库类型',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '正常'
  },
  innerOrder: {
    Key: 'innerOrder',
    Name: '内部订单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '100212'
  },
  innerOrderNote: {
    Key: 'innerOrderNote',
    Name: '内部订单号说明',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '内部订单号说明'
  },
  voucherNo: {
    Key: 'voucherNo',
    Name: '物料凭证',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '10001'
  },
  voucherStatus: {
    Key: 'voucherStatus',
    Name: '过账状态',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '未过账'
  },
  isSynsap: {
    Key: 'isSynsap',
    Name: '同步SAP',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '是'
  },
  isSynsapSuccess: {
    Key: 'isSynsapSuccess',
    Name: '是否同步成功',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '否'
  },
  synsapStatus: {
    Key: 'synsapStatus',
    Name: '同步状态',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '未同步'
  },
  reasonName: {
    Key: 'reasonName',
    Name: '产生原因',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '测试'
  },
  applyName: {
    Key: 'applyName',
    Name: '申请人',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '管理员'
  },
  createName: {
    Key: 'createName',
    Name: '制单人',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '管理员'
  },
  dept: {
    Key: 'dept',
    Name: '制单部门',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '总部'
  },
  status: {
    Key: 'status',
    Name: '出库状态',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '正在出库'
  },
  stateIn: {
    Key: 'state',
    Name: '入库状态',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '正在入库'
  },
  applicationDate: {
    Key: 'applicationDate',
    Name: '制单时间',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '2018-11-13'
  },
  logistics: {
    Key: 'logistics',
    Name: '承运物流',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '联邦快递'
  },
  logisticsPerson: {
    Key: 'logisticsPerson',
    Name: '承运人',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: 'Test'
  },
  logisticsPhone: {
    Key: 'logisticsPhone',
    Name: '联系方式',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: '13254556444'
  },
  agentName: {
    Key: 'agentName',
    Name: '客户',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: 'test'
  },
  requisitionNo: {
    Key: 'requisitionNo',
    Name: '领料单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'aa'
  },
  documentName: {
    Key: 'documentName',
    Name: '单据类型',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'ss'
  },
  statusIn: {
    Key: 'status',
    Name: '入库状态',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'dd'
  },
  sapType: {
    Key: 'sapType',
    Name: '移动类型',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'ff'
  },
  inventoryNo: {
    Key: 'inventoryNo',
    Name: '盘点单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'PD2018041600005638'
  },
  warehouseCodeI: {
    Key: 'warehouseCodeI',
    Name: '仓库',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    Value: '9000'
  },
  locationCodesStr: {
    Key: 'locationCodesStr',
    Name: '库区',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '1000'
  },
  checkType: {
    Key: 'checkType',
    Name: '盘点类型',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '根据库区'
  },
  checkStatus: {
    Key: 'checkStatus',
    Name: '盘点状态',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '未盘点'
  },
  custodian: {
    Key: 'custodian',
    Name: '保管员',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '张三'
  },
  inventoryCreateName: {
    Key: 'inventoryCreateName',
    Name: '创建人',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '管理员'
  },
  inventoryCreateDate: {
    Key: 'inventoryCreateDate',
    Name: '创建日期',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '2018-04-16'
  },
  startName: {
    Key: 'startName',
    Name: '启动人',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '管理员'
  },
  inventoryDes: {
    Key: 'inventoryDes',
    Name: '盘点描述',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '盘点描述'
  },
  plannedDate: {
    Key: 'plannedDate',
    Name: '计划盘点日期',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '2018-04-16'
  },
  purchaseInboundOrder: {
    Key: 'purchaseInboundOrder',
    Name: '采购入库单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGCI2018032700004851'
  },
  purchaseRequestOrder: {
    Key: 'purchaseRequestOrder',
    Name: '采购订单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGCG2018032700004842'
  },
  warehouseCode: {
    Key: 'warehouseCode',
    Name: '调入仓库',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '北京'
  },
  purchaseCreateDate: {
    Key: 'purchaseCreateDate',
    Name: '制单时间',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '2018-11-13'
  },
  beginningInCreateDate: {
    Key: 'beginningInCreateDate',
    Name: '制单时间',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '2018-3-1'
  },
  beginningInInLocation: {
    Key: 'beginningInInLocation',
    Name: '仓库编号',
    Alias: '',
    IsChecked: false,
    testValue: '123',
    widthRate: 2
  },
  beginningInAbnormalNoIn: {
    Key: 'beginningInAbnormalNoIn',
    Name: '入库单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGOT2018031200003755'
  },
  returnInNo: {
    Key: 'returnInNo',
    Name: '退货入库单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGOT2018031200003755'
  },
  returnApplyNo: {
    Key: 'returnApplyNo',
    Name: '退货申请单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGOT2018031200003755'
  },
  createBillDate: {
    Key: 'createBillDate',
    Name: '制单时间',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '2018-3-1'
  },
  returnInBillTypeName: {
    Key: 'returnInBillTypeName',
    Name: '单据类型',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '退货入库'
  },
  callOutLocation: {
    Key: 'callOutLocation',
    Name: '调出仓库',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '北京'
  },
  callInLocation: {
    Key: 'callInLocation',
    Name: '调入仓库',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '南京'
  },
  callOutArea: {
    Key: 'callOutArea',
    Name: '调出库区',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'ZW01'
  },
  outArea: {
    Key: 'outArea',
    Name: '发出库区',
    IsAloneRow: false,
    IsChecked: false,
    IsHeader: true,
    testValue: 'ZW01'
  },
  callInArea: {
    Key: 'callInArea',
    Name: '调入库区',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'ZW02'
  },
  locationCode: {
    Key: 'locationCode',
    Name: '仓库编码',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'ZQ01-1-1-1-ZX'
  },
  postingStateShow: {
    Key: 'postingStateShow',
    Name: '过账状态',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '未过账'
  },
  deliveryOrder: {
    Key: 'deliveryOrder',
    Name: '入库单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGOT2018031200003755'
  },
  deliveryInstructionNo: {
    Key: 'deliveryInstructionNo',
    Name: '配送指令',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGOT'
  },
  freightSettleTypeName: {
    Key: 'freightSettleTypeName',
    Name: '运费结算方式',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '月结'
  },
  auditUserName: {
    Key: 'auditUserName',
    Name: '审核人',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '管理员'
  },
  auditStatus: {
    Key: 'auditStatus',
    Name: '审核状态',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '通过'
  },
  auditDate: {
    Key: 'auditDate',
    Name: '审核日期',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '2018-04-20'
  },
  auditOpinion: {
    Key: 'auditOpinion',
    Name: '审核意见',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '审核通过'
  },
  outStatus: {
    Key: 'outStatus',
    Name: '出库状态',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '未出库'
  },
  inArea: {
    Key: 'inArea',
    Name: '领入库区',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'ZW01'
  },
  printDate: {
    Key: 'printDate',
    Name: '打印日期',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '2018-02-28'
  },
  sapOutNo: {
    Key: 'sapOutNo',
    Name: 'sap关联单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: ''
  },
  sapSaleOrder: {
    Key: 'sapSaleOrder',
    Name: 'SAP销售订单',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: ''
  },
  sapOutBill: {
    Key: 'sapOutBill',
    Name: 'SAP外向发货单',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: ''
  },
  materialsNo: {
    Key: 'materialsNo',
    Name: '物料凭证',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: ''
  },
  purchaseUnit: {
    Key: 'purchaseUnit',
    Name: '客户名称',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'xxx有限公司'
  },
  isPostingAccount: {
    Key: 'isPostingAccount',
    Name: '是否过账',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '是'
  },
  warehouseNumber: {
    Key: 'warehouseNumber',
    Name: '仓库编码',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '123'
  },
  customerName: {
    Key: 'customerName',
    Name: '客户名称',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'xxx有限公司'
  },
  reverseOrder: {
    Key: 'reverseOrder',
    Name: '销售冲销单号',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: 'XGCX2018041000005434'
  },
  totalPrice: {
    Key: 'totalPrice',
    Name: '总价',
    IsAloneRow: false,
    IsChecked: true,
    IsHeader: true,
    testValue: '10'
  }
};
// 字典模板表体字典集合
PrintTemplateDictionary.TbodyGroup = {
  returnApplyAmount: {
    Key: 'returnApplyAmount',
    Name: '已退货数量',
    Alias: '',
    IsChecked: false,
    testValue: '0',
    widthRate: 1
  },
  outLocationArea: {
    Key: 'outLocationArea',
    Name: '领出库区',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 1
  },
  inLocationArea: {
    Key: 'inLocationArea',
    Name: '领入库区',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 1
  },
  retApplyQty: {
    Key: 'applyQty',
    Name: '退货数量',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 1
  },
  retPurQty: {
    Key: 'qty',
    Name: '采购数量',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 1
  },
  amount: {
    Key: 'amount',
    Name: '申请数量',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 1
  },
  materialName: {
    Key: 'materialName',
    Name: '物料描述',
    Alias: '',
    IsChecked: false,
    testValue: '8216-ME-00043 主销轴',
    widthRate: 4
  },
  materialNo: {
    Key: 'materialNo',
    Name: '物料编码',
    Alias: '',
    IsChecked: false,
    testValue: '1-6451',
    widthRate: 2
  },
  guaOutStatus: {
    Key: 'status',
    Name: '出库状态',
    Alias: '',
    IsChecked: false,
    testValue: '未出库',
    widthRate: 2
  },
  outStatus: {
    Key: 'outStatus',
    Name: '出库状态',
    Alias: '',
    IsChecked: false,
    testValue: '未出库',
    widthRate: 1
  },
  realOutQty: {
    Key: 'realOutQty',
    Name: '实际出库数量',
    Alias: '',
    IsChecked: false,
    testValue: '5',
    widthRate: 1
  },
  guaDeliveryQty: {
    Key: 'deliveryQty',
    Name: '出库数量',
    Alias: '',
    IsChecked: false,
    testValue: '5',
    widthRate: 2
  },
  outQty: {
    Key: 'outQty',
    Name: '已发数量',
    Alias: '',
    IsChecked: false,
    testValue: '5',
    widthRate: 2
  },
  qtyGuaOutTotal: {
    Key: 'qty',
    Name: '订单总数',
    Alias: '',
    IsChecked: false,
    testValue: '5',
    widthRate: 2
  },
  materialsNo: {
    Key: 'materialsNo',
    Name: '物料编号',
    Alias: '',
    IsChecked: false,
    testValue: '800306757',
    widthRate: 2
  },
  materialsDesc: {
    Key: 'materialsDesc',
    Name: '物料描述',
    Alias: '',
    IsChecked: false,
    testValue: '8216-ME-00043 主销轴',
    widthRate: 4
  },
  materialsDes: {
    Key: 'materialsDes',
    Name: '物料描述',
    Alias: '',
    IsChecked: false,
    testValue: '8216-ME-00043 主销轴',
    widthRate: 4
  },
  unit: {
    Key: 'unit',
    Name: '单位',
    Alias: '',
    IsChecked: false,
    testValue: 'EA',
    widthRate: 2
  },
  qty: {
    Key: 'amountAfterAdjust',
    Name: '订单总数',
    Alias: '',
    IsChecked: false,
    testValue: '5',
    widthRate: 2
  },
  amountAfterAdjust: {
    Key: 'amountAfterAdjust',
    Name: '订单总数',
    Alias: '',
    IsChecked: false,
    testValue: '5',
    widthRate: 2
  },
  qtyIn: {
    Key: 'qty',
    Name: '入库数量',
    Alias: '',
    IsChecked: false,
    testValue: '5',
    widthRate: 2
  },
  qtyHand: {
    Key: 'qty',
    Name: '数量',
    Alias: '',
    IsChecked: false,
    testValue: '5',
    widthRate: 2
  },
  sendQty: {
    Key: 'sendQty',
    Name: '已发数量',
    Alias: '',
    IsChecked: false,
    testValue: '0',
    widthRate: 2
  },
  deliveryQty: {
    Key: 'deliveryQty',
    Name: '本次发货',
    Alias: '',
    IsChecked: false,
    testValue: '5',
    widthRate: 2
  },
  deliveryAmount: {
    Key: 'deliveryAmount',
    Name: '出库数量',
    Alias: '',
    IsChecked: false,
    testValue: '5',
    widthRate: 2
  },
  deliveryNoteNo: {
    Key: 'deliveryNoteNo',
    Name: '业务单据号',
    Alias: '',
    IsChecked: false,
    testValue: '5',
    widthRate: 'XFGD123123123213'
  },
  boxupNo: {
    Key: 'boxupNo',
    Name: '装箱清单号',
    Alias: '',
    IsChecked: false,
    testValue: 'XFZX123123123213',
    widthRate: 2
  },
  remark: {
    Key: 'remark',
    Name: '备注',
    Alias: '',
    IsChecked: false,
    testValue: '加急',
    widthRate: 2
  },
  materialsType: {
    Key: 'materialsType',
    Name: '物料分类',
    Alias: '',
    IsChecked: false,
    widthRate: 2.5,
    testValue: '2004854105728'
  },
  realQty: {
    Key: 'realQty',
    Name: '实际出库数量',
    Alias: '',
    IsChecked: false,
    widthRate: 2,
    testValue: '12'
  },
  realQtyIn: {
    Key: 'realQty',
    Name: '实际入库数量',
    Alias: '',
    IsChecked: false,
    widthRate: 2,
    testValue: '12'
  },
  status: {
    Key: 'status',
    Name: '出库状态',
    Alias: '',
    IsChecked: false,
    widthRate: 2,
    testValue: '20180101'
  },
  stateIn: {
    Key: 'state',
    Name: '入库状态',
    Alias: '',
    IsChecked: false,
    widthRate: 2,
    testValue: '未入库'
  },
  outLocation: {
    Key: 'outLocation',
    Name: '领出仓库',
    Alias: '',
    IsChecked: false,
    widthRate: 1,
    testValue: '1'
  },
  inLocation: {
    Key: 'inLocation',
    Name: '领入仓库',
    Alias: '',
    IsChecked: false,
    widthRate: 1,
    testValue: '1'
  },
  amountPicking: {
    Key: 'amount',
    Name: '领料数量',
    Alias: '',
    IsChecked: false,
    widthRate: 1,
    testValue: '1'
  },
  realAmount: {
    Key: 'realAmount',
    Name: '实际入库数量',
    Alias: '',
    IsChecked: false,
    widthRate: 1,
    testValue: '2'
  },
  statusShow: {
    Key: 'statusShow',
    Name: '入库状态',
    Alias: '',
    IsChecked: false,
    widthRate: 2,
    testValue: '未入库'
  },
  barCode: {
    Key: 'barCode',
    Name: '盘点条码',
    Alias: '',
    IsChecked: false,
    testValue: '12345678',
    widthRate: 2
  },
  loactionCode: {
    Key: 'loactionCode',
    Name: '储位',
    Alias: '',
    IsChecked: false,
    testValue: 'ZQ01-1-1-1-ZX',
    widthRate: 2
  },
  sysAmount: {
    Key: 'sysAmount',
    Name: '原始数量',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  actAmount: {
    Key: 'actAmount',
    Name: '盘点数量',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  depositaryName: {
    Key: 'depositaryName',
    Name: '保管员',
    Alias: '',
    IsChecked: false,
    testValue: '保管员',
    widthRate: 2
  },
  stateShow: {
    Key: 'stateShow',
    Name: '盘点状态',
    Alias: '',
    IsChecked: false,
    testValue: '未盘点',
    widthRate: 2
  },
  inventoryUserName: {
    Key: 'inventoryUserName',
    Name: '盘点人',
    Alias: '',
    IsChecked: false,
    testValue: '盘点人',
    widthRate: 2
  },
  price: {
    Key: 'price',
    Name: '单价',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  unitPriceAfterAdjust: {
    Key: 'unitPriceAfterAdjust',
    Name: '单价',
    Alias: '',
    IsChecked: true,
    testValue: '1',
    widthRate: 2
  },
  purchaseInQty: {
    Key: 'purchaseInQty',
    Name: '订单总数',
    Alias: '',
    IsChecked: false,
    testValue: '5',
    widthRate: 2
  },
  purchaseInQtyIn: {
    Key: 'purchaseInQtyIn',
    Name: '入库数量',
    Alias: '',
    IsChecked: false,
    testValue: '5',
    widthRate: 2
  },
  vinId: {
    Key: 'vinId',
    Name: 'VIN号',
    Alias: '',
    IsChecked: false,
    testValue: '123',
    widthRate: 2
  },
  orawyd: {
    Key: 'orawyd',
    Name: '图号',
    Alias: '',
    IsChecked: false,
    testValue: '123',
    widthRate: 2
  },
  minPackQty: {
    Key: 'minPackQty',
    Name: '最小包装',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  totalQty: {
    Key: 'totalQty',
    Name: '入库总数量',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  returnOutTotal: {
    Key: 'returnOutTotal',
    Name: '退货总数',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  appliedQtyIn: {
    Key: 'appliedQtyIn',
    Name: '已申请入库数量',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  callInCompleteQty: {
    Key: 'callInCompleteQty',
    Name: '调入完成数',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  callOutCompleteQty: {
    Key: 'callOutCompleteQty',
    Name: '调出完成数',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  rowNo: {
    Key: 'rowNo',
    Name: '行号',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  postingStateShow: {
    Key: 'postingStateShow',
    Name: '过账状态',
    Alias: '',
    IsChecked: false,
    testValue: '未过账',
    widthRate: 2
  },
  defaultLocation: {
    Key: 'defaultLocation',
    Name: '默认储位',
    Alias: '',
    IsChecked: false,
    testValue: 'ZQ01-1-1-1-ZX',
    widthRate: 2
  },
  totalPrice: {
    Key: 'totalPrice',
    Name: '总价',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  priceGroup: {
    Key: 'priceGroup',
    Name: '价格组',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  applyDeliverQty: {
    Key: 'applyDeliverQty',
    Name: '申请发货数量',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  realDeliverQty: {
    Key: 'realDeliverQty',
    Name: '实际发货数量',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  planQtyIn: {
    Key: 'planQtyIn',
    Name: '计划入库数量',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  },
  otherRemark: {
    Key: 'otherRemark',
    Name: '其它',
    Alias: '',
    IsChecked: false,
    testValue: '1',
    widthRate: 2
  }
};

