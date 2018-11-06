import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {UfastTableNs} from '../../../layout/layout.module';
import {PickingApplyService, PickingApplyServiceNs} from '../../../core/trans/picking-apply.service';
import {ShowMessageService} from '../../../widget/show-message/show-message';
import {PickingApply} from '../../../../environments/printData';
import {PrintTplSelectorService} from '../../../widget/print-tpl-selector/print-tpl-selector';
import {ActionCode} from '../../../../environments/actionCode';
enum PageTypeEnum {
  ManagePage,
  AddOrEditPage,
  DetailPage,
  DeliverPage
}
interface ActionStatus {
  edit: boolean;
  delivery: boolean;
  del: boolean;
  audit: boolean;
  finish: boolean;
  print: boolean;
}
@Component({
  selector: 'app-picking-apply',
  templateUrl: './picking-apply.component.html',
  styleUrls: ['./picking-apply.component.scss']
})
export class PickingApplyComponent implements OnInit {
  PageType = PageTypeEnum;
  currentPage: PageTypeEnum;

  @ViewChild('orderNoTpl') orderNoTpl: TemplateRef<any>;
  @ViewChild('operationTpl') operationTpl: TemplateRef<any>;
  orderTableConfig: UfastTableNs.TableConfig;
  orderDataList: PickingApplyServiceNs.PickingApplyOrder[];
  listFilters: any;

  operateOrderNo: string;
  showAdvancedSearch: boolean;

  // 订单详情
  orderDetail: PickingApplyServiceNs.PickingApplyOrder;
  detailTableConfig: UfastTableNs.TableConfig;
  detailMaterialList: PickingApplyServiceNs.MaterialDetail[];
  detailFieldList: {field: string; name: string; pipe?: string; }[];

  showAudit: boolean;
  auditStatusList: {status: number; name: string}[];
  auditData: PickingApplyServiceNs.AuditData;
  AuditStatus = PickingApplyServiceNs.AuditStatus;
  actionStatus: {[index: string]: ActionStatus};
  ActionCode = ActionCode;
  constructor(private dataService: PickingApplyService, private messageService: ShowMessageService,
              private printTplSelector: PrintTplSelectorService) {
    this.actionStatus = {};
    this.auditData = {
      ids: [],
      status: PickingApplyServiceNs.AuditStatus.Pass,
      remark: ''
    };
    this.showAudit = false;
    this.auditStatusList = [
      {status: PickingApplyServiceNs.AuditStatus.Pass, name: '审批通过'},
      {status: PickingApplyServiceNs.AuditStatus.Reject, name: '审批拒绝'}
    ];

    this.operateOrderNo = '';
    this.currentPage = this.PageType.ManagePage;
    this.listFilters = {};
    this.showAdvancedSearch = false;

    this.orderDetail = null;
    this.detailMaterialList = [];
    // 订单详情展示字段列表
    this.detailFieldList = [
      {field: 'applyNo', name: '领料申请单号'},
      {field: 'orgName', name: '业务实体'},
      {field: 'usage', name: '用途'},
      {field: 'materialType', name: '物料类型', pipe: 'materialType2'},
      {field: 'applyDepartment', name: '领料部门'},
      {field: 'section', name: '工段'},
      {field: 'plannerName', name: '计划员'},
      {field: 'needDate', name: '需要日期', pipe: 'date:yyyy-MM-dd'},
      {field: 'receiverName', name: '收货人'},
      {field: 'receiverNumber', name: '收货人电话'},
      {field: 'receiverAddress', name: '收货地址'},
      {field: 'applyName', name: '申请人'},
      {field: 'applyDate', name: '申请日期', pipe: 'date:yyyy-MM-dd'},
      {field: 'status', name: '审批状态', pipe: 'auditApproveStatus'},
      {field: 'outStatus', name: '出库状态', pipe: 'stockOutStatus'}
    ];
  }
  getList = () => {
   const filter = {
     pageNum: this.orderTableConfig.pageNum,
     pageSize: this.orderTableConfig.pageSize,
     filters: this.listFilters
   };
   this.orderTableConfig.loading = true;
   this.orderTableConfig.checkAll = false;
   this.dataService.getOrderList(filter).subscribe((resData: PickingApplyServiceNs.PostListRes) => {
     this.orderTableConfig.loading = false;
     if (resData.code !== 0) {
       this.messageService.showAlertMessage('', resData.message, 'error');
       return;
     }
     this.orderTableConfig.total = resData.value.total;
     this.actionStatus = {};
     this.orderDataList = resData.value.list;
     this.orderDataList.forEach((item) => {
        this.calcPermission(item);
     });
   }, (error) => {
     this.orderTableConfig.loading = false;
     this.messageService.showAlertMessage('', error.message, 'error');
   });
  }
  private calcPermission(item: PickingApplyServiceNs.PickingApplyOrder) {
    this.actionStatus[item.id] = {
      edit: item.status !== PickingApplyServiceNs.AuditStatus.Pass && item.outStatus === PickingApplyServiceNs.OrderStatus.UnStockOut,
      del: item.status !== PickingApplyServiceNs.AuditStatus.Pass,
      delivery: item.status === PickingApplyServiceNs.AuditStatus.Pass &&
      item.outStatus !== PickingApplyServiceNs.OrderStatus.AllStockOut &&
      item.outStatus !== PickingApplyServiceNs.OrderStatus.Finish,
      audit: item.status === PickingApplyServiceNs.AuditStatus.Wait,
      print: true,
      finish: item.outStatus !== PickingApplyServiceNs.OrderStatus.Finish &&
      item.outStatus !== PickingApplyServiceNs.OrderStatus.AllStockOut &&
      item.status === PickingApplyServiceNs.AuditStatus.Pass
    };
  }
  public trackById( index: number, item: any) {
    return item;
  }
  public onSelectedOrder(event: UfastTableNs.SelectedChange) {
    const checked = event.type === UfastTableNs.SelectedChangeType.Checked ? true : false;
    if (event.index === -1) {
      this.orderTableConfig.checkAll = checked;
      this.orderDataList.forEach((item: any) => {
        item[this.orderTableConfig.checkRowField] = checked;
      });
      return;
    }
    this.orderTableConfig.checkAll = checked;
    if (checked) {
      for (let i = 0, len = this.orderDataList.length; i < len; i++) {
        if (!this.orderDataList[i][this.orderTableConfig.checkRowField]) {
          this.orderTableConfig.checkAll = false;
          break;
        }
      }
    }
  }

  public onAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }
  public resetFilter() {
    this.listFilters = {};
    this.getList();
  }
  public childPageFinish() {
    this.currentPage = this.PageType.ManagePage;
    this.getList();
  }
  public trackByItem(index: number, item: any) {
    return item;
  }
  public toggleAdd() {
    this.operateOrderNo = null;
   this.currentPage = this.PageType.AddOrEditPage;
  }
  public toggleEdit(id: string) {
    if (!this.actionStatus[id].edit) {
      return;
    }
    this.currentPage = this.PageType.AddOrEditPage;
    this.operateOrderNo = id;
  }
  public deleteOrder(id: string) {
    if (!this.actionStatus[id].del) {
      return;
    }
    this.batchDeleteOrder([id]);
  }

  private batchDeleteOrder(orderNoList: string[]) {
    this.messageService.showAlertMessage('', '确定删除所选的订单吗？', 'confirm').afterClose
      .subscribe((type: string) => {
        if (type !== 'onOk') {
          return;
        }
        this.dataService.batchDeleteOrder(orderNoList).subscribe((resData: PickingApplyServiceNs.PickingApplyResT<any>) => {
          if (resData.code !== 0) {
            this.messageService.showAlertMessage('', resData.message, 'error');
            return;
          }
          this.messageService.showToastMessage('操作成功', 'success');
          this.getList();
        });
      });
  }
  /**
   *@detailAudit: 详情页审核
   * **/
  public detailAudit(status: PickingApplyServiceNs.AuditStatus) {
    const info = status === this.AuditStatus.Pass ? '通过' : '拒绝';
    this.messageService.showAlertMessage('', `确定审批${info}?`, 'confirm').afterClose
      .subscribe((type: string) => {
        if (type !== 'onOk') {
          return;
        }
        this.auditData.status = status;
        this.auditData.ids = [this.orderDetail.id];
        this.startAudit();
      });
  }
  /**
   * 列表中审批订单
   **/
  public approvalOrder(id: string) {
    if (!this.actionStatus[id].audit) {
      return;
    }
    this.auditData.ids = [id];

    this.showAudit = !this.showAudit;
  }
  public onCancelAudit() {
    this.showAudit = !this.showAudit;
  }
  public startAudit() {
    this.messageService.showLoading();
    this.dataService.batchAuditOrder(this.auditData).subscribe((resData: PickingApplyServiceNs.PickingApplyResT<any>) => {
      this.messageService.closeLoading();
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.messageService.showToastMessage('操作成功', 'success');
      this.showAudit = false;
      if (this.currentPage === this.PageType.DetailPage) {
        this.viewOrderDetail(this.orderDetail.id);
      } else {
        this.getList();
      }
    }, (error) => {
      this.messageService.closeLoading();
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  public finishOrder(applyNo: string, id: string) {
    if (!this.actionStatus[id].finish) {
      return;
    }
    this.messageService.showAlertMessage('', '确定结单吗？', 'confirm').afterClose
      .subscribe((type: string) => {
        if (type !== 'onOk') {
          return;
        }
        const orderNoList: string[] = [applyNo];
        this.messageService.showLoading('');
        this.dataService.batchFinishOrder(orderNoList).subscribe((resData: PickingApplyServiceNs.PickingApplyResT<any>) => {
          this.messageService.closeLoading();
          if (resData.code !== 0) {
            this.messageService.showAlertMessage('', resData.message, 'error');
            return;
          }
          this.messageService.showToastMessage('操作成功', 'success');
          if (this.currentPage === this.PageType.DetailPage) {
            this.viewOrderDetail(this.orderDetail.id);
          } else {
            this.getList();
          }
        }, (error) => {
          this.messageService.closeLoading();
          this.messageService.showAlertMessage('', error.message, 'error');
        });
      });
  }
  /**
   * @getCheckedOrder: 获取选中行的指定字段
   * **/
  private getCheckedOrder(filed: string): string[] {
    const ids: string[] = [];
    this.orderDataList.forEach((item) => {
      if (item[this.orderTableConfig.checkRowField]) {
        ids.push(item[filed]);
      }
    });
    if (ids.length === 0) {
      this.messageService.showToastMessage('请选择需要操作的订单', 'info');
    }
    return ids;
  }
  public toggleDelivery(id: string) {
    if (!this.actionStatus[id].delivery) {
      return;
    }
    this.currentPage = this.PageType.DeliverPage;
    this.operateOrderNo = id;
  }
  public printOrder(id: string) {
    if (!this.actionStatus[id].print) {
      return;
    }
    this.viewOrderDetail(id, () => {
      this.orderDetail['qrcode'] = this.orderDetail.applyNo;
      this.printTplSelector.showTplSelector({
        printConfig: PickingApply,
        headerInfo: this.orderDetail,
        dataList: this.detailMaterialList
      });
    });
  }
  /**********详情页**********/
  public toggleDetail(id: string) {
    this.currentPage = this.PageType.DetailPage;
    this.viewOrderDetail(id);
  }
  private viewOrderDetail(id: string, callback?: Function) {
    this.orderDetail = <any>{id: id};
    this.detailMaterialList = [];
    this.dataService.getOrderDetail(id)
      .subscribe((resData: PickingApplyServiceNs.PickingApplyResT<PickingApplyServiceNs.PickingApplyOrder>) => {
        if (resData.code !== 0) {
          this.messageService.showAlertMessage('', resData.message, 'error');
          return;
        }
        this.orderDetail = resData.value;
        this.calcPermission(this.orderDetail);
        this.detailMaterialList = resData.value.pickingApplyDetailVOs;
        if (callback) {
          callback();
        }
      }, (error) => {
        this.messageService.showAlertMessage('', error.message, 'error');
      });
  }
  ngOnInit() {
    this.orderTableConfig = {
      checkAll: false,
      showCheckbox: true,
      checkRowField: '_checked',
      showPagination: true,
      pageNum: 1,
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 40, 50],
      loading: false,
      total: 0,
      headers: [
        {title: '操作', width: 200, fixed: true, tdTemplate: this.operationTpl},
        {title: '领料申请单号', width: 200, tdTemplate: this.orderNoTpl, fixed: true},
        {title: '审批状态', field: 'status', width: 150, pipe: 'auditApproveStatus'},
        {title: '出库状态', field: 'outStatus', width: 150, pipe: 'stockOutStatus'},
        {title: '业务实体', field: 'orgName', width: 200},
        {title: '物料类型', field: 'materialType', width: 100, pipe: 'materialType2'},
        {title: '领料部门', field: 'applyDepartment', width: 200},
        {title: '工段', field: 'section', width: 100},
        {title: '领料人', field: 'applyName', width: 150},
        {title: '计划员', field: 'plannerName', width: 150},
        {title: '申请日期', field: 'applyDate', width: 150, pipe: 'date:yyyy-MM-dd'},
        {title: '需要日期', field: 'needDate', width: 150, pipe: 'date:yyyy-MM-dd'}
      ]
    };
    this.detailTableConfig = {
      showCheckbox: false,
      showPagination: false,
      loading: false,
      headers: [
        {title: '行号', field: 'rowNo', width: 80, fixed: true},
        {title: '物料编码', field: 'materialCode', width: 120},
        {title: '物料名称', width: 200, field: 'materialName'},
        {title: '是否条码管理', width: 120, field: 'barcodeFlag', pipe: 'barcodeManage'},
        {title: '单位', field: 'unit', width: 100},
        {title: '申请数量', field: 'amountApply', width: 100},
        {title: '已出库数量', field: 'amountOuted', width: 100},
        {title: '出库状态', field: 'status', width: 150, pipe: 'stockOutStatus'}    // 管道待加入
      ]
    };
    this.getList();
  }
}
