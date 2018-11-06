import {Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef} from '@angular/core';
import {ShowMessageService} from '../../../../widget/show-message/show-message';
import {UfastTableNs} from '../../../../layout/layout.module';
import {PickingDeliveryService, PickingDeliveryServiceNs} from '../../../../core/trans/picking-delivery.service';
import {PickingApplyService, PickingApplyServiceNs} from '../../../../core/trans/picking-apply.service';
import {UfastUtilService} from "../../../../core/infra/ufast-util.service";

interface DetailInfoField {
  name: string;
  field: string;
  pipe?: string;
}

@Component({
  selector: 'app-add-picking-delivery',
  templateUrl: './add-picking-delivery.component.html',
  styleUrls: ['./add-picking-delivery.component.scss']
})
export class AddPickingDeliveryComponent implements OnInit {

  @Output()finish: EventEmitter<any>;
  @Input()orderNo: string;
  orderInfo: PickingDeliveryServiceNs.PickingDeliveryItem;

  tableConfig: UfastTableNs.TableConfig;
  materialDataList: PickingDeliveryServiceNs.PickingDeliveryMaterial[];

  stockTableConfig: UfastTableNs.TableConfig;
  stockDataList: PickingApplyServiceNs.StockItem[];
  stockFilter: any;

  detailFieldList: DetailInfoField[];
  agreementField: DetailInfoField[];
  baseField: DetailInfoField[];
  locationFilter: any;
  stockModalShow: boolean;
  selectedLine: PickingDeliveryServiceNs.PickingDeliveryMaterial;

  @ViewChild('operateTpl')operateTpl: TemplateRef<any>;
  @ViewChild('deliveryNumTpl')deliveryNumTpl: TemplateRef<any>;
  @ViewChild('nowStockTpl')nowStockTpl: TemplateRef<any>;
  @ViewChild('stockOperateTpl')stockOperateTpl: TemplateRef<any>;

  constructor(private messageService: ShowMessageService, private pickingDeliveryService: PickingDeliveryService,
                private pickingApplyService: PickingApplyService, private utilService: UfastUtilService
  ) {
    this.stockFilter = {};
    this.stockDataList = [];
    this.stockModalShow = false;
    this.finish = new EventEmitter<any>();
    this.locationFilter = {};
    this.baseField = [
      {name: '领料出库单号', field: 'pickingNo'},
      {name: '创建时间', field: 'createDate', pipe: 'date:yyyy-MM-dd'},
      {name: '领料申请单号', field: 'applyNo'},
      {name: '业务实体', field: 'orgName'},
      {name: '领料部门', field: 'applyDepartment'},
      {name: '工段', field: 'section'},
      {name: '计划员', field: 'plannerName'},
      {name: '收货人', field: 'receiverName'},
      {name: '收货人电话', field: 'receiverNumber'},
      {name: '收货地址', field: 'receiverAddress'},
      {name: '申请日期', field: 'createDate', pipe: 'date:yyyy-MM-dd'},
      {name: '需要日期', field: 'needDate', pipe: 'date:yyyy-MM-dd'},
      {name: '保管员', field: 'keeperName'},
      {name: '状态', field: 'outStatus', pipe: 'stockOutStatus'},
    ];
    this.agreementField = [
      {name: '协议类型', field: 'agreementType', pipe: 'agreementType'},
      {name: '协议号', field: 'agreementCode'},
      {name: '代储供应商', field: 'storageOrgName'},
    ];
    this.detailFieldList = [];
    this.materialDataList = [];
  }
  public trackByItem(index: number, item: any) {
    return item;
  }
  public deleteMaterial() {
    const tempList = this.materialDataList.filter(item => !item[this.tableConfig.checkRowField]);
    if (this.materialDataList.length === tempList.length) {
      this.messageService.showToastMessage('请选择要删除的物料', 'warning');
    } else {
      this.materialDataList = tempList;
      this.checkMaterialAll();
    }
  }
  private checkMaterialAll() {
    if (this.materialDataList.length === 0) {
      this.tableConfig.checkAll = false;
      return;
    }
    this.tableConfig.checkAll = true;
    for (let i = 0, len = this.materialDataList.length; i < len; i++) {
      if (!this.materialDataList[i][this.tableConfig.checkRowField]) {
        this.tableConfig.checkAll = false;
        break;
      }
    }
  }
  public deleteByNO(materialCode: string) {
    for (let i = 0, len = this.materialDataList.length; i < len; i++) {
      if (this.materialDataList[i].materialCode === materialCode) {
        this.materialDataList.splice(i, 1);
        break;
      }
    }
    this.checkMaterialAll();
  }
  public onSelectedOrder(event: UfastTableNs.SelectedChange) {

    const checked = event.type === UfastTableNs.SelectedChangeType.Checked ? true : false;
    if (event.index === -1) {
      this.tableConfig.checkAll = checked;
      this.materialDataList.forEach((item: any) => {
        item[this.tableConfig.checkRowField] = checked;
      });
      return;
    }
    this.tableConfig.checkAll = checked;
    if (checked) {
      for (let i = 0, len = this.materialDataList.length; i < len; i++) {
        if (!this.materialDataList[i][this.tableConfig.checkRowField]) {
          this.tableConfig.checkAll = false;
          break;
        }
      }
    }
  }

  public submitOrder() {
    const data = [];
    this.materialDataList.forEach((item) => {
      const temp = <any>{};
      temp['pickNum'] = item['deliveryQty'];
      temp['pickingOutDtlId'] = item['id'];
      temp['locationCode'] = item['warehouseCode'];
      temp['locationType'] = item['locationType'];
      temp['businessLineId'] = item['id'];
      temp['agreementCode'] = this.orderInfo.agreementCode;
      data.push(temp);
    });
    if (data.length === 0) {
      this.messageService.showToastMessage('物料不能为空', 'warning');
      return;
    }
    this.messageService.showLoading('');
    this.pickingDeliveryService.submitOrder(data).subscribe((resData: PickingDeliveryServiceNs.PickingDeliveryResT<any>) => {
      this.messageService.closeLoading();
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.finish.emit();
      this.messageService.showToastMessage('操作成功', 'success');
    }, (error: any) => {
      this.messageService.closeLoading();
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  public onCancel() {
    this.finish.emit();
  }
  public showStockModal(material: any) {
    this.stockModalShow = true;
    this.selectedLine = material;
    this.stockFilter['materialCode'] = material.materialCode;


    this.stockTableConfig = Object.assign({}, this.stockTableConfig);
    this.stockModalShow = true;
    this.getStockList();
  }
  public onCancelStock() {
    this.stockModalShow = false;
  }
  getStockList = () => {
    this.stockTableConfig.loading = true;
    const filter = {
      pageSize: this.stockTableConfig.pageSize,
      pageNum: this.stockTableConfig.pageNum,
      filters: this.stockFilter
    };
    let handler: any = null;
    if (this.orderInfo.agreementFlag) {
      handler = this.pickingApplyService.getAgreementStockList(filter);
    } else {
      handler = this.pickingApplyService.getNormalStockList(filter);
    }
    handler.subscribe((resData: PickingApplyServiceNs.PickingApplyResT<any>) => {
      this.stockTableConfig.loading = false;
      if (resData.code !== 0) {
        this.messageService.showToastMessage(resData.message, 'error');
        return;
      }
      this.stockTableConfig.total = resData.value.total;
      this.stockDataList = resData.value.list;
      this.stockDataList.forEach((item) => {
        item['_this'] = item;
      });
    }, (error) => {
      this.stockTableConfig.loading = false;
      this.messageService.showToastMessage(error.message, 'error');
    });
  }
  public chooseStock(item: PickingApplyServiceNs.StockItem) {
    this.stockModalShow = false;
    this.selectedLine.nomalInvtNum = item.amount;
    const locationField = ['locationCode', 'areaCode', 'warehouseCode'];
    for (let i = 0, len = locationField.length; i < len; i++) {
      if (item[locationField[i]]) {
        this.selectedLine.locationType = len  - i;
        this.selectedLine.warehouseCode = item[locationField[i]];
        break;
      }
    }
  }
  private getOrderDetail() {
    this.pickingDeliveryService.getOrderDetail(this.orderNo).subscribe((resData: PickingDeliveryServiceNs.PickingDeliveryResT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.orderInfo = resData.value;
      resData.value.detailVOList.forEach((item) => {
        item['_this'] = item;
        item['deliveryQty'] = this.utilService.sub(item['amountOuted'], item['pickNum']);
        this.materialDataList.push(item);
      });
      this.stockTableConfig.headers = [
        {title: '操作', tdTemplate: this.stockOperateTpl, width: 100},
        {title: '仓库编码', field: 'warehouseCode', width: 100},
        {title: '库区编码', field: 'areaCode', width: 150},
        {title: '储位编码', field: 'locationCode', width: 150},
        {title: '库存数量', field: 'amount', width: 100},
      ];
      if (this.orderInfo.agreementFlag === 1) {
        this.detailFieldList = this.baseField.concat(this.agreementField);
        this.locationFilter.type = 1;
        this.stockTableConfig.headers.push(...[
          { title: '协议号', field: 'agreementCode', width: 150},
          { title: '供应商', field: 'supplierName', width: 150}
        ]);
        this.stockFilter.agreementCode = this.orderInfo.agreementCode;
      } else {
        this.stockTableConfig.headers.push(...[
          { title: '保管员', field: 'keeperName', width: 120}
        ]);
        this.detailFieldList = this.baseField;
      }
      this.stockTableConfig = Object.assign({}, this.stockTableConfig);   // 触发表格组件输入属性变化检测
    }, (error) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  ngOnInit() {

    this.tableConfig = {
      showCheckbox: true,
      checkRowField: '_checked',
      showPagination: false,
      loading: false,
      headers: [
        {title: '操作', tdTemplate: this.operateTpl, width: 100},
        {title: '行号', field: 'rowNo', width: 80},
        {title: '物料编码', field: 'materialCode', width: 150},
        {title: '物料名称', field: 'materialName', width: 150},
        {title: '单位', field: 'unit', width: 80},
        {title: '出库数量', field: 'amountOuted', width: 100},
        {title: '已出库数量', field: 'pickNum', width: 100},
        {title: '本次出库数量', tdTemplate: this.deliveryNumTpl, width: 100},
        {title: '出库储位', field: 'warehouseCode', width: 150},
        {title: '当前库存', tdTemplate: this.nowStockTpl, width: 100},
        {title: '可用数量', field: 'availableNum', width: 100},
      ]
    };

    this.stockTableConfig = {
      showCheckbox: false,
      showPagination: true,
      pageSizeOptions: [5, 15, 20, 25, 30],
      loading: false,
      pageSize: 5,
      pageNum: 1,
      total: 0,
      headers: []
    };
    this.getOrderDetail();
  }

}
