export const ActionCode = {
  /******************系统管理***********************/
  /**组织架构**/
  deptManageAdd: 0,           // 新增部门
  deptManageEdit: 0,          // 编辑部门
  deptManageDel: 0,           // 删除部门
  deptManageAddSub: 0,        // 添加下级

  /**用户管理**/
  userManageAdd: 0,           // 新增用户
  userManageDel: 0,           // 删除用户
  userManageEdit: 0,          // 编辑用户
  userManageResetPd: 0,       // 重置密码
  userManageEnable: 0,        // 锁定和启用

  /**角色权限管理**/
  roleManageAdd: 0,           // 新增角色
  roleManageDel: 0,           // 删除角色
  roleManageEdit: 0,          // 编辑角色
  roleManageSetAuth: 0,       // 设置权限

  /*****************门户网站管理*****************/
  /***资讯管理**/
  infoAdd: 0,                  // 新增
  infoDel: 0,                  // 删除
  infoEdit: 0,                 // 编辑
  infoEnable: 0,               // 上下架
  infoSticky: 0,               // 置顶

  /*****************云结算*********************/
  /**发票联系单**/
  invoiceAdd: 0,               // 新增
  invoiceDel: 0,               // 删除
  invoiceEdit: 0,              // 编辑
  invoicePrint: 0,             // 打印

  /*****************供应商管理*****************/
  /**供应商管理**/
  supplierAdd: 0,               // 新增
  supplierDel: 0,               // 删除
  supplierEdit: 0,              // 编辑

  /****************仓储管理******************/
  /**仓库管理***/
  warehouseAdd: 0,              //  新增仓库
  warehouseEdit: 0,             //  编辑仓库
  warehouseDel: 0,              //  删除仓库
  warehouseAreaAdd: 0,          //  新增库区
  warehouseAreaEdit: 0,         //  编辑库区
  warehouseAreaDel: 0,          //  删除库区
  locationAdd: 0,               //  新增储位
  locationEdit: 0,              //  编辑储位
  locationDel: 0,               //  删除储位
  warehousePlacePrint: 0,       //  打印储位

  /**其他入库**/
  unusualInAdd: 0,              // 申请入库
  unusualInEdit: 0,             // 编辑
  unusualInDel: 0,              // 删除
  unusualInPutInStorage: 0,     // 入库
  unusualInFinish: 0,           // 结单
  unusualInPrint: 0,            // 打印

  /**期初入库**/
  beginningInImport: 0,         // 导入
  beginningInPrint: 0,          // 打印
  beginningInFinish: 0,         // 结单
  beginningInPutInStorage: 0,   // 入库

  /**其他出库**/
  unusualOutAdd: 0,             // 新增出库单
  unusualOutEdit: 0,            // 编辑
  unusualOutDel: 0,             // 删除
  unusualOutDelivery: 0,        // 出库
  unusualOutFinish: 0,          // 结单
  unusualOutPrint: 0,           // 打印


  /**盘点单**/
  inventoryAdd: 0,              // 新增
  inventoryDel: 0,              // 删除
  inventoryEnable: 0,           // 启动和关闭
  inventoryCheck: 0,            // 盘点
  inventoryPrint: 0,            // 打印

  /**单据类型**/
  billTypeAdd: 0,               // 新增
  billTypeEdit: 0,              // 编辑
  billTypeDel: 0,               // 删除

  /**收货单**/
  receivingNoteAdd: 0,          // 新增
  receivingNoteReceive: 0,      // 收货
  receivingNoteEdit: 0,         // 编辑
  receivingNoteFinish: 0,       // 结单
  receivingNotePrint: 0,        // 打印

  /**发货单**/
  dispatchBillAdd: 0,           // 新增
  dispatchBillDel: 0,           // 删除
  dispatchBillEdit: 0,          // 编辑
  dispatchBillPrint: 0,         // 打印
  dispatchBillDeliver: 0,       // 发货

  /**入库单**/
  warehouseWarrantPutIn: 0,           // 入库
  warehouseWarrantFinish: 0,           // 结单
  warehouseWarrantPrint: 0,         // 打印
  warehouseWarrantErpSync: 0,         // erp同步

  /**领料申请**/
  pickingApplyAdd: 0,           // 新增
  pickingApplyDel: 0,           // 删除
  pickingApplyEdit: 0,          // 编辑
  pickingApplyDelivery: 0,      // 出库
  pickingApplyApproval: 0,      // 审批
  pickingApplyFinish: 0,        // 结单
  pickingApplyPrint: 0,         // 打印

    /**领料出库**/
    pickingDelivery: 0,         // 出库
    pickingDeliveryFinish: 0,   // 结单
    pickingDeliveryPrint: 0,    // 打印


  /*******************打印配置**************************/
  /**打印模板**/
  printTplAdd: 0,               // 新增模板
  printTplDel: 0,               // 删除模板
  printTplEdit: 0,              // 编辑模板
  printTplSetDef: 0,            // 设置默认模板

  /*******************物料管理**************************/
  /**物料分类 **/
  materialClassAdd: 0,                   // 新增物料分类
  materialClassEdit: 0,                  // 编辑物料分类
  materialClassView: 0,                  // 查看物料分类
  materialClassDel: 0,                   // 删除物料分类

  /**物料模板 **/
  materialModelAdd: 0,                   // 新增物料模板
  materialModelEdit: 0,                  // 编辑物料模板

  /**物料模板审核 **/
  materialModelAuditPass: 0,              // 物料模板审核通过
  materialModelAuditReject: 0,            // 物料模板审核拒绝
  materialModelAuditEdit: 0,              // 编辑物料模板审核

  /**设备型号 **/
  equipmentModelAdd: 0,                   // 新增设备型号
  equipmentModelEdit: 0,                  // 编辑设备型号
  equipmentModelDel: 0,                   // 删除设备型号
  equipmentModelLeadIn: 0,                // 导入

  /**物料材设 **/
  materialAdd: 0,                         // 新增物料材设
  materialEdit: 0,                        // 编辑物料材设
  materialFreeze: 0,                      // 冻结物料材设
  materialThaw: 0,                        // 解冻物料材设
  materialLeadIn: 0,                      // 导入计划价

  /**分工管理 **/
  divisionManagementAdd: 0,               // 新增分工管理
  divisionManagementEdit: 0,              // 编辑分工管理
  divisionManagementDel: 0,               // 删除分工管理

  /**物料提报审核 **/
  materialReportPass: 0,                     // 通过
  materialReportReject: 0,                   // 拒绝

  /*******************厂矿**************************/
  /**物料提报 **/
  materialReportAdd: 0,                       // 新增
  materialReportAllot: 0,                     // 档案分类
  materialReportEdit: 0,                      // 编辑

  /**厂矿物料 **/
  industrialMaterialEdit: 0,                 // 编辑
  industrialMaterialFreeze: 0,               // 冻结
  industrialMaterialThaw: 0,                 // 解冻

  /**物料模板 **/
  materialTemplateReportAdd: 0,             // 物料模板提报新增
  materialTemplateReportEdit: 0,            // 物料模板提报编辑




  // /****************仓储管理******************/
  // /**仓库管理***/
  // warehouseAdd: 200101,              //  新增仓库
  // warehouseEdit: 200102,             //  编辑仓库
  // warehouseDel: 200103,              //  删除仓库
  // warehouseAreaAdd: 200104,          //  新增库区
  // warehouseAreaEdit: 200105,         //  编辑库区
  // warehouseAreaDel: 200106,          //  删除库区
  // locationAdd: 200107,               //  新增储位
  // locationEdit: 200108,              //  编辑储位
  // locationDel: 200109,               //  删除储位
  // warehousePlacePrint: 200110,       //  打印储位

  // /**其他入库**/
  // unusualInAdd: 201001,              // 申请入库
  // unusualInEdit: 201002,             // 编辑
  // unusualInDel: 201003,              // 删除
  // unusualInPutInStorage: 201004,     // 入库
  // unusualInFinish: 201005,           // 结单
  // unusualInPrint: 201006,            // 打印

  // /**期初入库**/
  // beginningInImport: 200401,         // 导入
  // beginningInPrint: 200402,          // 打印
  // beginningInFinish: 200403,         // 结单
  // beginningInPutInStorage: 200404,   // 入库

  // /**其他出库**/
  // unusualOutAdd: 201101,             // 新增出库单
  // unusualOutEdit: 201102,            // 编辑
  // unusualOutDel: 201103,             // 删除
  // unusualOutDelivery: 201104,        // 出库
  // unusualOutFinish: 201105,          // 结单
  // unusualOutPrint: 201106,           // 打印


  // /**盘点单**/
  // inventoryAdd: 201201,              // 新增
  // inventoryDel: 201202,              // 删除
  // inventoryEnable: 201203,           // 启动和关闭
  // inventoryCheck: 201204,            // 盘点
  // inventoryPrint: 201205,            // 打印

  // /**单据类型**/
  // billTypeAdd: 200301,               // 新增
  // billTypeEdit: 200032,              // 编辑
  // billTypeDel: 200303,               // 删除

  // /**收货单**/
  // receivingNoteAdd: 201501,          // 新增
  // receivingNoteReceive: 201502,      // 收货
  // receivingNoteEdit: 201503,         // 编辑
  // receivingNoteFinish: 201504,       // 结单
  // receivingNotePrint: 201505,        // 打印

  // /**发货单**/
  // dispatchBillAdd: 201401,           // 新增
  // dispatchBillDel: 201402,           // 删除
  // dispatchBillEdit: 201403,          // 编辑
  // dispatchBillPrint: 201404,         // 打印
  // dispatchBillDeliver: 201405,       // 发货

  // /**入库单**/
  // warehouseWarrantPutIn: 201601,           // 入库
  // warehouseWarrantFinish: 201602,           // 结单
  // warehouseWarrantPrint: 201603,         // 打印

  // /**领料申请**/
  // pickingApplyAdd: 201701,           // 新增
  // pickingApplyDel: 201702,           // 删除
  // pickingApplyEdit: 201703,          // 编辑
  // pickingApplyDelivery: 201704,      // 出库
  // pickingApplyApproval: 201705,      // 审批
  // pickingApplyFinish: 201706,        // 结单
  // pickingApplyPrint: 201707,         // 打印

  //   /**领料出库**/
  //   pickingDelivery: 201801,         // 出库
  //   pickingDeliveryFinish: 201802,   // 结单
  //   pickingDeliveryPrint: 201803,    // 打印

  // /*******************物料管理**************************/
  // /**物料分类 **/
  // materialClassAdd: 110201,                   // 新增物料分类
  // materialClassEdit: 110202,                  // 编辑物料分类
  // materialClassView: 110203,                  // 查看物料分类
  // materialClassDel: 110204,                   // 删除物料分类

  // /**物料模板 **/
  // materialModelAdd: 110301,                   // 新增物料模板
  // materialModelEdit: 110302,                  // 编辑物料模板

  // /**物料模板审核 **/
  // materialModelAuditPass: 110501,              // 物料模板审核通过
  // materialModelAuditReject: 110502,            // 物料模板审核拒绝
  // materialModelAuditEdit: 110503,              // 编辑物料模板审核

  // /**设备型号 **/
  // equipmentModelAdd: 110701,                   // 新增设备型号
  // equipmentModelEdit: 110702,                  // 编辑设备型号
  // equipmentModelDel: 110703,                   // 删除设备型号
  // equipmentModelLeadIn: 110704,                // 导入

  // /**物料材设 **/
  // materialAdd: 110101,                         // 新增物料材设
  // materialEdit: 110102,                        // 编辑物料材设
  // materialFreeze: 110103,                      // 冻结物料材设
  // materialThaw: 110104,                        // 解冻物料材设
  // materialLeadIn: 110105,                      // 导入计划价

  // /**分工管理 **/
  // divisionManagementAdd: 110801,               // 新增分工管理
  // divisionManagementEdit: 110802,              // 编辑分工管理
  // divisionManagementDel: 110803,               // 删除分工管理

  // /**物料提报审核 **/
  // materialReportPass: 0,                     // 通过
  // materialReportReject: 0,                   // 拒绝

  // /*******************厂矿**************************/
  // /**物料提报 **/
  // materialReportAdd: 110603,                       // 新增
  // materialReportAllot: 110604,                     // 档案分类
  // materialReportEdit: 110605,                      // 编辑

  // /**厂矿物料 **/
  // industrialMaterialEdit: 110401,                 // 编辑
  // industrialMaterialFreeze: 110402,               // 冻结
  // industrialMaterialThaw: 110403,                 // 解冻

  // /**物料模板 **/
  // materialTemplateReportAdd: 110504,             // 物料模板提报新增
  // materialTemplateReportEdit: 110505,            // 物料模板提报编辑
};


