import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ShowMessageService } from '../../../../widget/show-message/show-message';
import { AbnormalOutService, AbnormalOutServiceNs } from '../../../../core/trans/abnormalOut.service';
import { UfastTableNs, RightSideTableBoxNs } from '../../../../layout/layout.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface TabPageType {
  ManagePage: number;
  AddPage: number;
  EditPage: number;
  DetailPage: number;
}
interface FiltersType {
  companyType: string;
  companyName: string;
}
interface ClientFiltersType {
  dealerCode: string;
  companyName: string;
}
enum MaxInputLen {
  Default = 50
}
@Component({
  selector: 'app-edit-abnormal-out',
  templateUrl: './edit-abnormal-out.component.html',
  styleUrls: ['./edit-abnormal-out.component.scss']
})
export class EditAbnormalOutComponent implements OnInit {
  tabPageType: TabPageType;
  @Input() selectRowId: string;
  @ViewChild('operation') operation: TemplateRef<any>;
  @ViewChild('inMouseNum') inMouseNum: TemplateRef<any>;
  @ViewChild('chooseWareHouse') chooseWareHouse: TemplateRef<any>;
  @ViewChild('chooseReservoir') chooseReservoir: TemplateRef<any>;
  @ViewChild('chooseTransportLogistics') chooseTransportLogistics: TemplateRef<any>;
  @ViewChild('chooseClient') chooseClient: TemplateRef<any>;
  @Output() finish: EventEmitter<any>;
  reasonNameData: AbnormalOutServiceNs.ReasonNameDataModel[];
  shippingMethod: AbnormalOutServiceNs.ShippingMethodModel[];
  freightSettlementMethod: AbnormalOutServiceNs.FreightSettlementMethodModel[];
  transportLogisticsDataList: AbnormalOutServiceNs.TransportLogisticsModel[];
  transportLogisticsTableConfig: UfastTableNs.TableConfig;
  isVisible: boolean;
  isVisibleTransportLogistics: boolean;
  isVisibleClient: boolean;
  filters: FiltersType;
  clientTableConfig: UfastTableNs.TableConfig;
  clientFilters: ClientFiltersType;
  clientDataList: AbnormalOutServiceNs.ClientModel[];
  clientSearchPlaceholder: {dealerCodePlaceholder: string,
    companyNamePlaceholder: string};
  materialTableConfig: UfastTableNs.TableConfig;
  selectedMaterialTableConfig: UfastTableNs.TableConfig;
  editAbnormalOutDataList: any[];
  materialDataList: AbnormalOutServiceNs.AbnormalOutMaterialModel[];
  outWareHouseDataList: AbnormalOutServiceNs.OutLocationModel[];
  reservoirDataList: AbnormalOutServiceNs.ReservoirModel[];
  AbnormalOutTypeData: AbnormalOutServiceNs.AbnormalOutTypeModel[];
  typeId: string;
  show: boolean;
  selectedList: number[];
  selectedSideMaterialList: number[];
  editAbnormalOutForm: FormGroup;
  abnormalOutTypeData: AbnormalOutServiceNs.AbnormalOutTypeModel[];
  transportLogisticsSearchPlaceholder: string;
  editHeaderInfo: any;
  maxInputLen = MaxInputLen;
  barcodeFlagList: any[];
  constructor(private abnormalOutService: AbnormalOutService,
    private messageService: ShowMessageService,
    private formBuilder: FormBuilder) {
    this.barcodeFlagList = [
      {label: '否', value: 0},
      {label: '是', value: 1},
    ];
    this.finish = new EventEmitter<any>();
    this.tabPageType = {
      ManagePage: 0,
      AddPage: 1,
      EditPage: 2,
      DetailPage: 3,
    };
    this.reasonNameData = [];
    this.shippingMethod = [];
    this.freightSettlementMethod = [];
    this.transportLogisticsDataList = [];
    this.filters = {
      companyType: '3',
      companyName: ''
  };
    this.clientFilters = {
      dealerCode: '',
      companyName: ''
    };
    this.clientDataList = [];
    this.clientSearchPlaceholder = {
      dealerCodePlaceholder: '请输入客户编号',
      companyNamePlaceholder: '请输入客户名称'
    };
    this.abnormalOutTypeData = [];
    this.selectedList = [];
    this.selectedSideMaterialList = [];
    this.editAbnormalOutDataList = [];
    this.materialDataList = [];
    this.outWareHouseDataList = [];
    this.reservoirDataList = [];
    this.AbnormalOutTypeData = [];
    this.transportLogisticsSearchPlaceholder = '请输入公司名称';
  }

  // 获取产生原因列表
  public getReasonNameListType() {
    const data = {
      parentCode: 'OOFROMTYPE'
    };
    this.abnormalOutService.getBillTypeConfigList(data).subscribe((resData: AbnormalOutServiceNs.UfastHttpResT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.reasonNameData = resData.value;
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  // 获取发运方式列表
  public getShippingMethodListType() {
    const data = {
      parentCode: 'FYFS'
    };
    this.abnormalOutService.getBillTypeConfigList(data).subscribe((resData: AbnormalOutServiceNs.UfastHttpResT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.shippingMethod = resData.value;
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  // 获取运费结算方式列表
  public getFreightSettlementMethodListType() {
    const data = {
      parentCode: 'JSFS'
    };
    this.abnormalOutService.getBillTypeConfigList(data).subscribe((resData: AbnormalOutServiceNs.UfastHttpResT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.freightSettlementMethod = resData.value;
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  // 获取出库类型列表
  public getAbnormalOutType() {
    const filter = {
        pageNum: 0,
        pageSize: 0,
        filters: {
            inout: 1
        }
    };
    this.abnormalOutService.getAbnormalOutTypeList(filter).subscribe((resData: AbnormalOutServiceNs.UfastHttpResT<any>) => {
        if (resData.code !== 0) {
            this.messageService.showAlertMessage('', resData.message, 'warning');
            return;
        }
        this.abnormalOutTypeData = resData.value.list;
    }, (error: any) => {
        this.messageService.showAlertMessage('', error.message, 'error');
    });
}

  // 获取物料列表
  getMaterialList = () => {
    const filter = {
      pageNum: this.materialTableConfig.pageNum,
      pageSize: this.materialTableConfig.pageSize,
      filters: {
        keyWords: '',
        warehouseCode: this.editAbnormalOutForm.controls['outLocation'].value,
        areaCode: this.editAbnormalOutForm.controls['outArea'].value
      }
    };
    this.materialTableConfig.loading = true;
    this.abnormalOutService.getMaterialList(filter).subscribe((resData: AbnormalOutServiceNs.UfastHttpResT<any>) => {
      this.materialTableConfig.loading = false;
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.materialDataList = resData.value.list;
      this.materialTableConfig.total = resData.value.total;
    }, (error: any) => {
      this.materialTableConfig.loading = false;
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  // 承运物流模态框
  showTransportLogisticsModal(pageNum?: number): void {
    this.isVisibleTransportLogistics = true;
    this.getTransportLogisticsModalData(pageNum);

}
getTransportLogisticsModalData = (pageNum?: number) => {
    const filter = {
        pageNum: pageNum || this.transportLogisticsTableConfig.pageNum,
        pageSize: this.transportLogisticsTableConfig.pageSize,
        filters: {
            companyType: this.filters.companyType,
            companyName: this.filters.companyName
        }
    };
    this.abnormalOutService.getTransportLogisticsList(filter).subscribe((resData: AbnormalOutServiceNs.UfastHttpResT<any>) => {
        if (resData.code !== 0) {
            this.messageService.showToastMessage(resData.message, 'warning');
        }
        this.transportLogisticsDataList = resData.value.list;
        this.transportLogisticsTableConfig.total = resData.value.total;
    }, (error: any) => {
        this.messageService.showAlertMessage('', error.message, 'error');
    });
}

  handleCancelTransportLogistics(): void {
    this.isVisibleTransportLogistics = false;
  }

  // 客户模态框
  showClientModal(pageNum?: number): void {
    this.isVisibleClient = true;
    this.getClientModalData(pageNum);

}
getClientModalData = (pageNum?: number) => {
    const filter = {
        pageNum: pageNum || this.clientTableConfig.pageNum,
        pageSize: this.clientTableConfig.pageSize,
        filters: {
            dealerCode: this.clientFilters.dealerCode,
            companyName: this.clientFilters.companyName
        }
    };
    this.abnormalOutService.getClientList(filter).subscribe((resData: AbnormalOutServiceNs.UfastHttpResT<any>) => {
        if (resData.code !== 0) {
            this.messageService.showToastMessage(resData.message, 'warning');
        }
        this.clientDataList = resData.value.list;
        this.clientTableConfig.total = resData.value.total;
    }, (error: any) => {
        this.messageService.showAlertMessage('', error.message, 'error');
    });
}

  handleCancelClient(): void {
    this.isVisibleClient = false;
  }

  // 选择承运物流
  public chooseTransportLogisticsFun(item: any) {
    this.editAbnormalOutForm.controls['logistics'].setValue(item);
    this.handleCancelTransportLogistics();
}

// 点击搜索，承运物流列表更新
public searchTransportLogistics( pageNum?: number) {
    const filter = {
        pageNum: pageNum || this.transportLogisticsTableConfig.pageNum,
        pageSize: this.transportLogisticsTableConfig.pageSize,
        filters: {
            companyType: this.filters.companyType,
            companyName: this.filters.companyName
        }
    };
    this.abnormalOutService.getTransportLogisticsList(filter).subscribe((resData: AbnormalOutServiceNs.UfastHttpResT<any>) => {
        if (resData.code !== 0) {
            this.messageService.showToastMessage(resData.message, 'warning');
        }
        this.transportLogisticsDataList = resData.value.list;
        this.transportLogisticsTableConfig.total = resData.value.total;
    }, (error: any) => {
        this.messageService.showAlertMessage('', error.message, 'error');
    });

}


// 选择客户
public chooseClientFun(item: any) {
    this.editAbnormalOutForm.controls['agentName'].setValue(item);
    this.handleCancelClient();
}

// 点击搜索，客户列表更新
public searchClient(pageNum?: number) {
    const filter = {
        pageNum: pageNum || this.clientTableConfig.pageNum,
        pageSize: this.clientTableConfig.pageSize,
        filters: {
            dealerCode: this.clientFilters.dealerCode,
            companyName: this.clientFilters.companyName
        }
    };
    this.abnormalOutService.getClientList(filter).subscribe((resData: AbnormalOutServiceNs.UfastHttpResT<any>) => {
        if (resData.code !== 0) {
            this.messageService.showToastMessage(resData.message, 'warning');
        }
        this.clientDataList = resData.value.list;
        this.transportLogisticsTableConfig.total = resData.value.total;
    }, (error: any) => {
        this.messageService.showAlertMessage('', error.message, 'error');
    });
}
  public emitFinish() {
    this.finish.emit();
  }

  public getAbnormalOutDetail() {
    this.abnormalOutService.getAbnormalOutDetail(this.selectRowId).subscribe((resData: AbnormalOutServiceNs.UfastHttpResT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.editHeaderInfo = resData.value.headerInfo;
      this.editAbnormalOutForm.patchValue(this.editHeaderInfo);
      this.editAbnormalOutForm.patchValue({
        applyDate: new Date(this.editHeaderInfo.applicationDate)
      });
      this.editAbnormalOutDataList = resData.value.materialList;
      for (let i = 0, len = this.editAbnormalOutDataList.length; i < len; i++) {
        this.editAbnormalOutDataList[i].index = i;
        this.editAbnormalOutDataList[i]['disabledNum'] =
          this.editAbnormalOutDataList[i].status === AbnormalOutServiceNs.StockOutStatus.Finish;
      }
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  // 编辑页保存
  public submitWarehouse() {
    for (const key of Object.keys(this.editAbnormalOutForm.controls)) {
      this.editAbnormalOutForm.controls[key].markAsDirty();
      this.editAbnormalOutForm.controls[key].updateValueAndValidity();
    }
    if (this.editAbnormalOutForm.invalid) {
      return;
    }
    const data = Object.assign(this.editHeaderInfo, this.editAbnormalOutForm.value);
    this.abnormalOutService.updateWareHouse(data, this.editAbnormalOutDataList)
      .subscribe((resData: AbnormalOutServiceNs.UfastHttpResT<any>) => {
        if (resData.code === 0) {
          this.messageService.showToastMessage('操作成功', 'success');
        }
        this.emitFinish();
      }, (error: any) => {
        this.messageService.showAlertMessage('', error.message, 'error');
      });
  }

  ngOnInit() {
    // 选中的物料
    this.selectedMaterialTableConfig = {
      pageSize: 10,
      showCheckbox: false,
      showPagination: true,
      checkRowField: 'checked',
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageNum: 1,
      total: 0,
      loading: false,
      headers: [
      { title: '物料编码', field: 'materialsNo', width: 100 },
      { title: '物料描述', field: 'materialsDes', width: 150 },
      { title: '分类', field: 'materialsType', width: 80 },
      { title: '单位', field: 'unit', width: 80 },
      { title: '默认储位', field: 'locationCode', width: 80 },
      { title: '可用库存', field: 'enableNum', width: 80 },
      { title: '出库数量', tdTemplate: this.inMouseNum, field: 'qty', width: 100 },
      { title: '实际出库数量', field: 'realQty', width: 100 },
      { title: '出库状态', field: 'status', width: 100, pipe: 'stockOutStatus' },
      ]
    };

    // 物料侧边栏
    this.materialTableConfig = {
      pageSize: 10,
      yScroll: 300,
      showCheckbox: true,
      showPagination: true,
      checkAll: false,
      checkRowField: '_checked',
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageNum: 1,
      total: 0,
      loading: false,
      headers: [{ title: '物料编码', field: 'materialsNo', width: 100 },
      { title: '物料描述', field: 'materialsDes', width: 150 }
      ]
    };
    this.editAbnormalOutForm = this.formBuilder.group({
      abnormalNo: [{value: null, disabled: true}],
      type: [null, [Validators.required]],
      innerOrder: [null],
      innerOrderNote: [null],
      receiverFax: [null],
      reasonName: [null, [Validators.required]],
      outLocation: [{value: null, disabled: true}],
      outArea: [{value: null, disabled: true}],
      logistics: [null],
      logisticsPerson: [null],
      logisticsPhone: [null],
      agentName: [null],
      deliveryTypeName: [null, [Validators.required]],
      settleTypeName: [null, [Validators.required]],
      receiverName: [null],
      receiverPhone: [null],
      address: [null],
      note: [null],
      createId: [null],
      applyDate: [null],
      barcodeFlag: [{value: null, disabled: true}, [Validators.required]]
    });
    this.getAbnormalOutDetail();
    // 承运物流模态框数据
    this.transportLogisticsTableConfig = {
      pageNum: 1,
      pageSize: 10,
      yScroll: 100,
      showCheckbox: false,
      showPagination: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      total: 0,
      loading: false,
      headers: [{ title: '公司名称', field: 'companyName', width: 100 },
      { title: '公司编号', field: 'orgCode', width: 150 },
      { title: '操作', tdTemplate: this.chooseTransportLogistics, width: 60 }
      ]
    };

    // 客户模态框数据
    this.clientTableConfig = {
      pageNum: 1,
      pageSize: 10,
      yScroll: 100,
      showCheckbox: false,
      showPagination: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      total: 0,
      loading: false,
      headers: [{ title: '客户编号', field: 'dealerCode', width: 100 },
      { title: '客户名称', field: 'companyName', width: 150 },
      { title: '操作', tdTemplate: this.chooseClient, width: 60 }
      ]
    };
    this.getReasonNameListType();
    this.getShippingMethodListType();
    this.getFreightSettlementMethodListType();
    this.getAbnormalOutType();
  }

}
