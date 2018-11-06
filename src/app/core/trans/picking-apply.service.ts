import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpUtilNs, HttpUtilService} from '../infra/http/http-util.service';
export namespace PickingApplyServiceNs {
  export interface PickingApplyResT<T> extends HttpUtilNs.UfastHttpRes {
    value: T;
  }
  export interface  PickingApplyOrder {
    addlyName: string;        // 申请人名称 ,
    applyDate: string;        // 申请日期 ,
    applyDepartment: string;  // 领料部门 ,
    applyId: string;          //  申请人ID ,
    applyNo: string;          // 领料申请单号 ,
    id: string;
    materialType: string;     // 物料类型 ,
    needDate: string;         // 需要日期 ,
    orgId: string;            // 业务实体ID ,
    orgName: string;          // 业务实体名称 ,
    outStatus: number;            // 出库状态（0未出库，1部分出库，2全部出库，3结单） ,
    plannerId: string;        // 计划员ID ,
    plannerName: string;      // 计划员名称 ,
    receiverAddress: string;   // 收货地址 ,
    receiverId: string;       // 收货人ID ,
    receiverName: string;     // 收货人名称 ,
    receiverNumber: string;    // 收货人电话 ,
    remark: string;           //  审核描述 ,
    section: string;          // 工段 ,
    status: number;             // 状态（0待审批，1审批通过，2审批拒绝） ,
    usage: string;           // 用途
    pickingApplyDetailVOs?: MaterialDetailForPickApply[];
  }
  export interface MaterialDetail {
    amountApply?: number;     // 申请数量
    amountOuted?: number;     // 已出库数量
    applyNo?: string;         // 申请单号
    id: string;               // 物料id
    materialCode: string;     // 物料编码
    materialName: string;     // 物料名称
    status?: number;
    unit: string;             // 单位
  }
  export interface MaterialDetailForPickApply extends MaterialDetail {
    rowNo: number;            // 行号
  }
  export interface FactoryMaterialDetail {
    createDate: string;
    createId: string;
    factoryMaterialSpaceVOS: any;     // 储位信息 ,
    id: string;
    managementMode: number;           // 管理模式(0:条码管理1:物料编码管理) ,
    materialCode: string;             // 物料编码 ,
    materialId: string;               // 物料id ,
    materialVO: FactoryMaterialMaterialVO;   // 物料详情 ,
    oldCode: string;                      // 旧编码
    orgId: string;                  // 厂矿id（spaceid） ,
    orgName: string;                // 厂矿名称 ,
    planDec: string;               // 计划分解 ,
    planner: string;               // 计划员 ,
    purchasingGroupId: string;      // 采购组id ,
    purchasingGroupMebId: string;    // 采购组组员id ,
    purchasingGroupMebName: string;      // 采购组组员名称 ,
    purchasingGroupName: string;     // 采购组组名 ,
    updateDate: string;
    updateId: string;
  }
  export interface FactoryMaterialMaterialVO {
    assemblyOrPart: number;         // 总成或部装 ,
    brand: string;                 // 品牌 ,
    code: string;                 // 物料编码 ,
    createDate: string;
    deviceId: string;               // 备件的设备id ,
    divideWorkId: string;         // 分工管理id ,
    drawingNumber: string;        // 图号 ,
    firstLevel: string;           // 三级类别名称 ,
    firstType: string;            // 一级类别id ,
    importOrDomestic: number;     // 进口/国产 ,
    importance: number;           // 重要程度 ,
    isDelete: number;             //
    material: string;             // 材质,
    materialClassification: number;       // 物资分类 ,
    materialType: number;               // 物料类别（1：材料2：设备3：备件） ,
    name: string;                       // 物料名称
    planPrice: string;              // 计划价 ,
    remark: string;                 //
    secondLevel: string;           // 三级类别名称 ,
    secondType: string;             // 二级类别id ,
    shortDress: number;             // 短装 ,
    specificationModel: string;    // 规格型号 ,
    supplyRange: number;            // 供应范围 ,
    taxRate: number;               // 增值税率 ,
    thirdLevel: string;             // 三级类别名称 ,
    thirdType: string;              // 三级类别id ,
    unit: number;                   // 单位 ,
  }
  export interface StockItem {
    addId: string;  // 添加人ID ,
    addName: string;  // 添加人名称 ,
    agreementCode: string;  // 协议号 ,
    agreementFlag: number;  // 是否协议库存(0协议库存，1非协议库存) ,
    amount: number;   // 在库数量 ,
    areaCode: string;  // 库区 ,
    barCode: string;  // 条码 ,
    barcodeFlag: number;  // 是否条码管理(0条码管理，1非条码管理) ,
    barcodeStatus: string;  // 条码状态 ,
    businessOrder: string;
    cost: number;     // 消耗库存 ,
    createDate: string;  // 添加时间 ,
    id: string;
    keeperId: string;  // 保管员ID ,
    keeperName: string;  // 保管员名称 ,
    locationCode: string;  // 储位 ,
    materialCode: string;  // 物料编码 ,
    materialDesc: string;  // 物料描述 ,
    materialName: string;  // 物料名称 ,
    materialType: string;  // 物料类别 ,
    model: string;  // 主键ID ,
    priorLocationCode: string;
    remark: string;  // 备注 ,
    status: number;  // 状态(0正常库存1冻结库存) ,
    statusDesc: string;  // 状态(0正常库存1冻结库存) ,
    total: number;      // 总库存 ,
    unit: string;  // 单位 ,
    updateDate: string;  // 修改时间 ,
    updateId: string;  // 最后修改人ID ,
    updateName: string;  // 最后修改人名称 ,
    warehouseCode: string;  // 仓库编码
    warehouseRemark: string;
  }
  export interface PostListRes extends HttpUtilNs.UfastHttpRes {
    value: HttpUtilNs.UfastResListT<PickingApplyOrder>;
  }
  export interface AuditData {
    ids: string[];
    status: AuditStatus;
    remark: string;
  }
  export enum AuditStatus {
    Wait,
    Pass,
    Reject
  }
  export enum OrderStatus {
    UnStockOut,
    PartStockOut,
    AllStockOut,
    Finish
  }
  export interface Filter {
    pageNum: number;
    pageSize: number;
    filters: any;
  }
  export interface SubmitOrderData {
    addlyName: string;        // 申请人名称 ,
    applyDate: string;        // 申请日期 ,
    applyDepartment: string;  // 领料部门 ,
    applyNo?: string;          // 领料申请单号 ,
    materialType: string;     // 物料类型 ,
    needDate: string;         // 需要日期 ,
    orgName: string;          // 业务实体名称 ,
    applyId: string;
    plannerName: string;      // 计划员名称 ,
    receiverAddress: string;   // 收货地址 ,
    receiverName: string;     // 收货人名称 ,
    receiverNumber: string;    // 收货人电话 ,
    remark: string;           //  审核描述 ,
    section: string;          // 工段 ,
    usage: string;           // 用途
    pickingApplyDetailVOs?: MaterialDetail[];
  }
  export enum SubmitType {
    StashSave,
    Submit
  }
  export interface PickingOutMaterial {
    agreementNo?: string;
    amountOut: number;
    keeperId?: string;
    keeperName?: string;
    materialCode: string;
    materialName: string;
    locationCode: string;
    barcodeFlag: number;
    rowNo: number;
  }
  export interface AddPickingOut {
    applyNo: string;
    detailVOList: PickingOutMaterial[];
  }
  export class PickingApplyServiceClass {
    private http: HttpUtilService;
    private defaultConfig: HttpUtilNs.UfastHttpConfig;
    constructor(private injector: Injector) {
      this.http  = this.injector.get(HttpUtilService);
      this.defaultConfig = {
        gateway: HttpUtilNs.GatewayKey.Ss
      };
    }
    public getOrderList(filter: Filter): Observable<PostListRes> {
      return this.http.Post('/pickingApply/list', filter, this.defaultConfig);
    }
    public getOrderDetail(id: string): Observable<HttpUtilNs.UfastHttpResT<PickingApplyOrder>> {
      return this.http.Get('/pickingApply/itemWithStorage', {id}, this.defaultConfig);
    }
    public batchAuditOrder(data: AuditData): Observable<PickingApplyResT<any>> {
      return this.http.Post('/pickingApply/audit', data, this.defaultConfig);
    }
    public getFactoryMaterilList(filter: Filter): Observable<PickingApplyResT<any>> {
      return this.http.Post('/FactoryMaterial/listByOrgId', filter, this.defaultConfig);
    }
    public insertOrder(data: SubmitOrderData): Observable<PickingApplyResT<any>> {
      return this.http.Post('/pickingApply/insert', data, this.defaultConfig);
    }
    public updateOrder(data: SubmitOrderData): Observable<PickingApplyResT<any>> {
      return this.http.Post('/pickingApply/update', data, this.defaultConfig);
    }
    public batchDeleteOrder(ids: string[]): Observable<PickingApplyResT<any>> {
      return this.http.Post('/pickingApply/remove', ids, this.defaultConfig);
    }
    public batchFinishOrder(orderNo: string[]): Observable<PickingApplyResT<any>> {
      const data = orderNo.map(no => {
        return {billNo: no};
      });
      return this.http.Post('/pickingApply/manualFinish', data, this.defaultConfig);
    }
    public addPickingOut(data: AddPickingOut): Observable<PickingApplyResT<any>> {
      return this.http.Post('/PickingOut/insert', data, this.defaultConfig);
    }
    public getWorkSpaceName(): Observable<PickingApplyResT<any>> {
      return this.http.Get('/comm/getWorkSpaceName', null, this.defaultConfig);
    }
    public getAgreementStockList(data: Filter): Observable<PickingApplyResT<StockItem>> {
      return this.http.Post('/warehouseInventory/listForAgreement', data, this.defaultConfig);
    }
    public getNormalStockList(data: Filter): Observable<PickingApplyResT<StockItem>> {
      return this.http.Post('/warehouseInventory/listForNormal', data, this.defaultConfig);
    }
  }
}
@Injectable()
export class PickingApplyService extends PickingApplyServiceNs.PickingApplyServiceClass {

  constructor(injector: Injector) {
    super(injector);
  }

}
