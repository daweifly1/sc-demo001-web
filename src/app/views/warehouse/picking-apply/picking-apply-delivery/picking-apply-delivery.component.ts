import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ShowMessageService} from '../../../../widget/show-message/show-message';
import {PickingApplyService, PickingApplyServiceNs} from '../../../../core/trans/picking-apply.service';
import {UfastTableNs} from '../../../../layout/layout.module';
@Component({
  selector: 'app-picking-apply-delivery',
  templateUrl: './picking-apply-delivery.component.html',
  styleUrls: ['./picking-apply-delivery.component.scss']
})
export class PickingApplyDeliveryComponent implements OnInit {
  @Output()finish: EventEmitter<any>;
  @Input() applyNo: string;

  @ViewChild('tableOpTpl')tableOpTpl: TemplateRef<any>;
  @ViewChild('deliveryNumTpl')deliveryNumTpl: TemplateRef<any>;
  @ViewChild('protocolStockTpl')protocolStockTpl: TemplateRef<any>;
  @ViewChild('commonStockTpl')commonStockTpl: TemplateRef<any>;
  @ViewChild('agreeOperateTpl')agreeOperateTpl: TemplateRef<any>;

  headerFieldList: {field: string; name: string; pipe?: string; }[];   // 展示字段
  materialTableConfig: UfastTableNs.TableConfig;
  stockTableConfig: UfastTableNs.TableConfig;
  stockDataList: PickingApplyServiceNs.StockItem[];
  materialList: any[];
  orderDetail: any;
  auxData: {[index: string]: {amountOut: number; }};
  stockModalShow: boolean;
  selectedLine: any;
  isNormalStock: boolean;
  stockFilter: any;
  constructor(private formBuilder: FormBuilder, private messageService: ShowMessageService, private dataService: PickingApplyService) {
    this.stockFilter = {};
    this.stockDataList = [];
    this.stockModalShow = false;
    this.finish = new EventEmitter<any>();
    this.headerFieldList = [
      {field: 'applyNo', name: '领料申请单号'},
      {field: 'orgName', name: '业务实体'},
      {field: 'applyDepartment', name: '领料部门'},
      {field: 'section', name: '工段'},
      {field: 'plannerName', name: '计划员'},
      {field: 'needDate', name: '需要日期', pipe: 'date:yyyy-MM-dd'},
      {field: 'receiverName', name: '收货人'},
      {field: 'receiverNumber', name: '收货人电话'},
      {field: 'receiverAddress', name: '收货地址'},
      {field: 'applyName', name: '申请人'},
      {field: 'applyDate', name: '申请日期', pipe: 'date:yyyy-MM-dd'},
    ];
    this.materialList = [];
    this.orderDetail = {};
  }
  public onCancel() {
    this.finish.emit();
  }
  public deleteMaterial() {
    const remainList = this.materialList.filter(item => !item[this.materialTableConfig.checkRowField]);
    if (remainList.length === this.materialList.length) {
      this.messageService.showToastMessage('请选择需要删除的物料!', 'info');
    } else {
      this.messageService.showAlertMessage('', '确定删除所选的物料吗？', 'confirm').afterClose
        .subscribe((type: string) => {
          if (type !== 'onOk') {
            return;
          }
          this.materialList = remainList;
        });
    }
  }
  public trackByItem(index: number, item: any) {
    return item;
  }
  public deleteSingle(lineId: string) {
    this.materialList = this.materialList.filter(item => item['_lineId'] !== lineId);
  }
  public onSelectedMaterial(event: UfastTableNs.SelectedChange) {
    const checked = event.type === UfastTableNs.SelectedChangeType.Checked ? true : false;
    if (event.index === -1) {
      this.materialTableConfig.checkAll = checked;
      this.materialList.forEach((item: any) => {
        item[this.materialTableConfig.checkRowField] = checked;
      });
      return;
    }
    this.materialTableConfig.checkAll = checked;
    if (checked) {
      for (let i = 0, len = this.materialList.length; i < len; i++) {
        if (!this.materialList[this.materialTableConfig.checkRowField]) {
          this.materialTableConfig.checkAll = false;
          break;
        }
      }
    }
  }
  /**
   * 显示库存模态框
   * normal: true正常库存， false协议库存
   * */
  public showStockModal(normal: boolean, item: any) {
    this.isNormalStock = normal;
    this.stockFilter['materialCode'] = item.materialCode;
    this.selectedLine = item;
    this.stockTableConfig.headers = [
      {title: '操作', tdTemplate: this.agreeOperateTpl, width: 100},
      {title: '仓库编码', field: 'warehouseCode', width: 100},
      {title: '库区编码', field: 'areaCode', width: 150},
      {title: '储位编码', field: 'locationCode', width: 150},
      {title: '库存数量', field: 'amount', width: 100},
      { title: '保管员', field: 'keeperName', width: 120}
    ];
    if (!normal) {
      this.stockTableConfig.headers.push(...[
        { title: '协议号', field: 'agreementCode', width: 150},
        { title: '供应商', field: 'supplierName', width: 150}
      ]);
    }
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
    if (this.isNormalStock) {
      handler = this.dataService.getNormalStockList(filter);
    } else {
      handler = this.dataService.getAgreementStockList(filter);
    }
    this.stockDataList = [];
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
    if (!this.isNormalStock) {
      this.selectedLine['agreementCode'] = item.agreementCode;
    } else {
      this.selectedLine['agreementCode'] = undefined;
    }
    this.selectedLine['keeperName'] = item.keeperName;
    this.selectedLine['keeperId'] = item.keeperId;
    const locationList = ['locationCode', 'areaCode', 'warehouseCode'];
    for (let i = 0, len = locationList.length; i < len; i++) {
      if (item[locationList[i]]) {
        this.selectedLine['locationCode'] = item[locationList[i]];
        this.selectedLine['locationType'] = len - i;
        break;
      }
    }
  }
  public submitOrder() {
    const list = this.materialList.filter(item => this.auxData[item['_lineId']].amountOut > 0 );
    if (list.length  === 0) {
      this.messageService.showToastMessage('出库数量不可全为0', 'info');
      return;
    }
    const submitData: PickingApplyServiceNs.AddPickingOut = {
      applyNo: this.orderDetail.applyNo,
      detailVOList: []
    };
    const fieldList = ['materialCode', 'materialName', 'keeperId', 'keeperName', 'locationCode', 'rowNo', 'barcodeFlag', 'agreementCode'];

    this.materialList.forEach((item) => {
      const temp: any = {};
      fieldList.forEach((key: string) => {
        temp[key] = item[key];
      });
      temp['amountOut'] = this.auxData[item['_lineId']].amountOut;
      submitData.detailVOList.push(temp);

    });
    this.messageService.showLoading('');
    this.dataService.addPickingOut(submitData).subscribe((resData: PickingApplyServiceNs.PickingApplyResT<any>) => {
      this.messageService.closeLoading();
      if (resData.code !== 0) {
        this.messageService.showToastMessage(resData.message, 'error');
        return;
      }
      this.messageService.showToastMessage('操作成功', 'success');
      this.finish.emit();
    }, (error) => {
      this.messageService.closeLoading();
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  private getOrderDetail() {
    this.messageService.showLoading('');
    this.dataService.getOrderDetail(this.applyNo)
      .subscribe((resData: PickingApplyServiceNs.PickingApplyResT<PickingApplyServiceNs.PickingApplyOrder>) => {
        this.messageService.closeLoading();
        if (resData.code !== 0) {
          this.messageService.showToastMessage(resData.message, 'error');
          return;
        }
        this.orderDetail = resData.value;
        this.materialList = resData.value.pickingApplyDetailVOs;
        this.auxData = {};
        this.materialList.forEach((item) => {
          item['_this'] = item;
          item['_lineId'] = Symbol();
          this.auxData[item['_lineId']] = {
            amountOut: item['amountApply']
          };
        });
      }, (error) => {
        this.messageService.closeLoading();
        this.messageService.showAlertMessage('', error.message, 'error');
      });
  }
  ngOnInit() {
    this.materialTableConfig = {
      showCheckbox: true,
      showPagination: false,
      checkAll: false,
      checkRowField: '_checked',
      loading: false,
      headers: [
        {title: '操作', tdTemplate: this.tableOpTpl, width: 100, fixed: true},
        {title: '行号', field: 'rowNo', width: 80, fixed: true},
        {title: '物料编码', field: 'materialCode', width: 160},
        {title: '物料名称', width: 240, field: 'materialName'},
        {title: '是否条码管理', width: 120, field: 'barcodeFlag', pipe: 'barcodeManage'},
        {title: '协议号', width: 100, field: 'agreementCode'},
        {title: '协议库存', tdTemplate: this.protocolStockTpl, width: 100},
        {title: '普通库存', tdTemplate: this.commonStockTpl, width: 100},
        {title: '出库数量', tdTemplate: this.deliveryNumTpl, width: 100},
        {title: '领料数量', width: 100, field: 'amountApply'},
        {title: '已创出库单数量', width: 120, field: 'amountOuted'},
        {title: '申请占用数量', width: 120, field: 'applyOccupyNum'},
        {title: '出库单数量', width: 100, field: 'outBillNum'},
        {title: '可用数量', width: 100, field: 'availableNum'},
        {title: '储位', width: 180, field: 'locationCode'},
        {title: '库管员', width: 100, field: 'keeperName'},
        {title: '单位', field: 'unit', width: 100},
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
