import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {ShowMessageService} from '../../../widget/show-message/show-message';
import {UfastTableNs} from '../../../layout/layout.module';
import {PickingDeliveryService, PickingDeliveryServiceNs} from '../../../core/trans/picking-delivery.service';
import {PickingApplyServiceNs} from '../../../core/trans/picking-apply.service';
import {PickingDelivery} from '../../../../environments/printData';
import {PrintTplSelectorService} from '../../../widget/print-tpl-selector/print-tpl-selector';
import {ActionCode} from '../../../../environments/actionCode';
import {OtherWarehouseServiceNs} from '../../../core/trans/otherwarehouse.service';
import {WarehouseWarrantServiceNs} from '../../../core/trans/warehouseWarrant.service';
enum PageTypeEnum {
  ManagePage,
  Delivery,
  DetailPage,
  EditPage
}
interface DetailInfoField {
  name: string;
  field: string;
  pipe?: string;
}
enum BarcodeFlag {
  UnBarcode,
  Barcode
}
interface ActionStatus {
  delivery: boolean;
  finish: boolean;
  print: boolean;
  erpSync: boolean;
}
@Component({
  selector: 'app-picking-delivery',
  templateUrl: './picking-delivery.component.html',
  styleUrls: ['./picking-delivery.component.scss']
})
export class PickingDeliveryComponent implements OnInit {

  PageTypeObj = PageTypeEnum;
  currentPageType: PageTypeEnum;

  tableConfig: UfastTableNs.TableConfig;
  orderDataList: PickingDeliveryServiceNs.PickingDeliveryItem[];
  orderFilters: any;

  @ViewChild('operateTpl') operateTpl: TemplateRef<any>;
  @ViewChild('orderNoTpl') orderNoTpl: TemplateRef<any>;

  showAdvancedSearch: boolean;

  orderDetail: PickingDeliveryServiceNs.PickingDeliveryItem;
  detailFieldList: DetailInfoField[];
  agreementField: DetailInfoField[];
  baseField: DetailInfoField[];
  detailTableConfig: UfastTableNs.TableConfig;
  detailMaterialList: PickingDeliveryServiceNs.PickingDeliveryMaterial[];
  deliveryId: string;
  actionStatus: {[index: string]: ActionStatus};
  ActionCode = ActionCode;
  constructor(private messageService: ShowMessageService, private pickingDeliveryService: PickingDeliveryService,
     private printTplSelector: PrintTplSelectorService) {
    this.currentPageType = this.PageTypeObj.ManagePage;
    this.orderDataList = [];
    this.orderFilters = {};
    this.showAdvancedSearch = false;
    this.actionStatus = {};
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
      {name: '是否条码管理', field: 'barcodeFlag', pipe: 'barcodeManage'},
    ];
    this.agreementField = [
      {name: '协议类型', field: 'agreementFlag', pipe: 'agreementType'},
      {name: '协议号', field: 'agreementCode'},
      {name: '代储供应商', field: 'storageOrgName'},
    ];
    this.detailMaterialList = [];
  }
  public onAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }
  public resetFilter () {
    Object.keys(this.orderFilters).forEach((item: string) => {
      this.orderFilters[item] = '';
  });
    this.getOrderList();
  }
  public doErpSync(id: string) {
    this.messageService.showAlertMessage('', '确定执行到ERP同步', 'confirm').afterClose
      .subscribe((type: string) => {
        if (type !== 'onOk') {
          return;
        }
        this.messageService.showLoading('');
        this.pickingDeliveryService.pickingErpSync(id).subscribe((resData: OtherWarehouseServiceNs.UfastHttpResT<any>) => {
          this.messageService.closeLoading();
          if (resData.code !== 0) {
            this.messageService.showToastMessage(resData.message, 'error');
            return;
          }
          this.messageService.showToastMessage('操作成功', 'success');
          this.getOrderList();
        }, (error) => {
          this.messageService.closeLoading();
          this.messageService.showAlertMessage('', error.message, 'error');
        });
      });
  }
  getOrderList = () => {
    Object.keys(this.orderFilters).filter(item => typeof this.orderFilters[item] === 'string').forEach((key: string) => {
      this.orderFilters[key] = this.orderFilters[key].trim();
  });
    const filter: PickingDeliveryServiceNs.Filter = {
      pageNum: this.tableConfig.pageNum,
      pageSize: this.tableConfig.pageSize,
      filters: this.orderFilters
    };
    this.tableConfig.loading = true;
    this.pickingDeliveryService.gePickingOutList(filter).subscribe((resData: PickingDeliveryServiceNs.PickingDeliveryResT<any>) => {
      this.tableConfig.loading = false;
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.orderDataList = resData.value.list;
      this.tableConfig.total = resData.value.total;
      this.actionStatus = {};
      this.orderDataList.forEach((item) => {
        const allAndFinish = item.outStatus !== PickingApplyServiceNs.OrderStatus.Finish &&
          item.outStatus !== PickingApplyServiceNs.OrderStatus.AllStockOut;
        this.actionStatus[item.id] = {
          delivery: allAndFinish && item.barcodeFlag === BarcodeFlag.UnBarcode,
          print: true,
          finish: allAndFinish,
          erpSync: (item.outStatus === PickingApplyServiceNs.OrderStatus.Finish ||
            item.outStatus === PickingApplyServiceNs.OrderStatus.AllStockOut) &&
          (item['erpFlag'] === WarehouseWarrantServiceNs.ErpSyncFlag.UnSync ||
            item['erpFlag'] === WarehouseWarrantServiceNs.ErpSyncFlag.SyncFailed)
        };
      });
    }, (error) => {
      this.tableConfig.loading = false;
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  public onSelectedOrder(event: UfastTableNs.SelectedChange) {

    const checked = event.type === UfastTableNs.SelectedChangeType.Checked ? true : false;
    if (event.index === -1) {
      this.tableConfig.checkAll = checked;
      this.orderDataList.forEach((item: any) => {
        item[this.tableConfig.checkRowField] = checked;
      });
      return;
    }
    this.tableConfig.checkAll = checked;
    if (checked) {
      for (let i = 0, len = this.orderDataList.length; i < len; i++) {
        if (!this.orderDataList[i][this.tableConfig.checkRowField]) {
          this.tableConfig.checkAll = false;
          break;
        }
      }
    }
  }
  public toggleDelivery(id: string) {
    if (!this.actionStatus[id].delivery) {
      return;
    }
    this.currentPageType = this.PageTypeObj.Delivery;
    this.deliveryId = id;
  }
  public childPageFinish() {
    this.currentPageType = this.PageTypeObj.ManagePage;
    this.getOrderList();
  }

  public finishOrder(id: string) {
    if (!this.actionStatus[id].finish) {
      return;
    }
    this.messageService.showAlertMessage('', '确定结单吗？', 'confirm').afterClose
      .subscribe((type) => {
        if (type !== 'onOk') {
          return;
        }
        this.tableConfig.loading = true;
        this.pickingDeliveryService.finishOrder(id).subscribe((resData: PickingDeliveryServiceNs.PickingDeliveryResT<any>) => {
          if (resData.code !== 0) {
            this.messageService.showAlertMessage('', resData.message, 'warning');
            return;
          }
          this.tableConfig.loading = false;
          this.getOrderList();
          this.messageService.showToastMessage('操作成功', 'success');
        }, (error: any) => {
          this.tableConfig.loading = false;
          this.messageService.showAlertMessage('', error.message, 'error');
        });
      });
  }

  public trackByItem(index: number, item: any) {
    return item;
  }
  public printOrder(id: string) {
    if (!this.actionStatus[id].print) {
      return;
    }
    this.viewOrderDetail(id, () => {
      this.orderDetail['qrcode'] = this.orderDetail.pickingNo;
      this.printTplSelector.showTplSelector({
        printConfig: PickingDelivery,
        headerInfo: this.orderDetail,
        dataList: this.detailMaterialList
      });
    });
  }
  private viewOrderDetail(id: string, callback?: Function) {
    this.orderDetail = <any>{};
    this.detailMaterialList = [];
    this.pickingDeliveryService.getOrderDetail(id)
      .subscribe((resData: PickingDeliveryServiceNs.PickingDeliveryResT<any>) => {
        if (resData.code !== 0) {
          this.messageService.showAlertMessage('', resData.message, 'error');
          return;
        }
        this.orderDetail = resData.value;
        this.detailMaterialList = resData.value.detailVOList;
        if (callback) {
          callback();
        }
      }, (error) => {
        this.messageService.showAlertMessage('', error.message, 'error');
      });
  }
  public toggleDetail(id: string) {
    this.currentPageType = this.PageTypeObj.DetailPage;
    this.orderDetail = <any>{id: id};
    this.detailMaterialList = [];
    this.detailFieldList = this.baseField;
    this.pickingDeliveryService.getOrderDetail(id).subscribe((resData: PickingDeliveryServiceNs.PickingDeliveryResT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.orderDetail = resData.value;
      this.detailMaterialList = resData.value.detailVOList || [];
      if (this.orderDetail.agreementFlag === 1) {
        this.detailFieldList = this.baseField.concat(this.agreementField);
      }
    }, (error) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  public exitDetailPage() {
    this.currentPageType = this.PageTypeObj.ManagePage;
  }
  ngOnInit() {
    this.tableConfig = {
      showCheckbox: true,
      checkRowField: '_checked',
      showPagination: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageSize: 10,
      pageNum: 1,
      loading: false,
      checkAll: false,
      headers: [
        { title: '操作', tdTemplate: this.operateTpl, width: 180, fixed: true},
        { title: '领料出库单号', tdTemplate: this.orderNoTpl, fixed: true, width: 170},
        { title: '出库状态', field: 'outStatus', width: 100, pipe: 'stockOutStatus'},
        { title: '业务实体', field: 'orgName', width: 150},
        { title: '领料申请单号', field: 'applyNo', width: 170},
        { title: '是否条码管理', field: 'barcodeFlag', width: 120, pipe: 'barcodeManage'},
        { title: '协议类型', field: 'agreementFlag', width: 100, pipe: 'agreementType'},
        { title: '代储供应商', field: 'storageOrgName', width: 100},
        { title: '协议号', field: 'agreementCode', width: 100},
        { title: '领料部门', field: 'applyDepartment', width: 100},
        { title: '工段', field: 'section', width: 140},
        { title: '保管员', field: 'keeperName', width: 100},
        { title: '申请日期', field: 'createDate', width: 100, pipe: 'date:yyyy-MM-dd'},
        { title: '需要日期', field: 'needDate', width: 100, pipe: 'date:yyyy-MM-dd'},
        { title: 'ERP同步', field: 'erpFlag', width: 100, pipe: 'erpSync'},
        { title: 'ERP出库单号', field: 'erpOutNo', width: 170},
      ]
    };

    this.detailTableConfig = {
      showCheckbox: false,
      showPagination: false,
      loading: false,
      headers: [
        {title: '行号', field: 'rowNo', width: 150},
        {title: '物料编码', field: 'materialCode', width: 150},
        {title: '物料名称', field: 'materialName', width: 150},
        {title: '单位', field: 'unit', width: 100},
        {title: '领料数量', field: 'amountApply', width: 100},
        {title: '领出仓库', field: 'warehouseCode', width: 150},
        {title: '出库数量', field: 'amountOuted', width: 100},
        {title: '状态', field: 'status', width: 100, pipe: 'stockOutStatus'}
      ]
    };
    this.getOrderList();
  }
}
