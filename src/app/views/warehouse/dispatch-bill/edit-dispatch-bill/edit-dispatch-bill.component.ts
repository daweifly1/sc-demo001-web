import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UfastTableNs, RightSideTableBoxNs } from '../../../../layout/layout.module';
import {
  DispatchBillService,
  DispatchBillServiceNs
} from '../../../../core/trans/dispatch-bill.service';
import { ShowMessageService } from '../../../../widget/show-message/show-message';
import { environment } from '../../../../../environments/environment';
import { UploadFile } from 'ng-zorro-antd';
import {UfastUtilService} from '../../../../core/infra/ufast-util.service';
import {UfastValidatorsService} from '../../../../core/infra/validators/validators.service';
import { HttpClient, HttpRequest} from '@angular/common/http';

enum BarcodeManage {
  Flase,
  True
}
enum MaxLenInputEnum {
  Default = 50,
  IdCard = 18
}
@Component({
  selector: 'app-edit-dispatch-bill',
  templateUrl: './edit-dispatch-bill.component.html',
  styleUrls: ['./edit-dispatch-bill.component.scss']
})
export class EditDispatchBillComponent implements OnInit {
  ContractType = DispatchBillServiceNs.ContractTypeEnum;
  tableConfig: UfastTableNs.TableConfig;
  @Output() finish: EventEmitter<any>;
  @Input() invoiceNo: string;       // 订单号
  @Input() contractNo: string;      // 合同号
  @Input() contractType: number;    // 合同类型
  @Input() addOrder: boolean;       // true：新增，false：编辑
  @ViewChild('operationTpl') operationTpl: TemplateRef<any>;
  @ViewChild('deliverCountTpl')deliverCountTpl: TemplateRef<any>;

  materialTableConfig: UfastTableNs.TableConfig;
  materialDataList: DispatchBillServiceNs.OrderMaterialItem[]; // 侧边栏物料列表  服务中获取
  showMaterialList: boolean;
  orderForm: FormGroup; // 采购订单修改的表单 在服务中定义headerInfo
  orderMaterialList: DispatchBillServiceNs.OrderMaterialItem[]; // 采购订单物料信息  在服务里定义material
  fileList: any; // 物流附件的值
  fileServiceUrl: string;
  previewImage: string;
  previewVisible: boolean;
  maxLenInputEnum = MaxLenInputEnum;
  contractTypeList: any[];
  submitData: DispatchBillServiceNs.SubmitData;
  materialEmitter: EventEmitter<RightSideTableBoxNs.SelectedChangeEvent>;
  materialFilter: any;
  materialField: string;
  /**
   *导入物料
   */
  isToLeadVisible: boolean;
  errorMessage: any;
  formData: any;
  leadInUrl: any;
  materialList: any[];
  href: any;
  uploadUrl: string;
  barcodeFlagList: any[];
  constructor(private dispatchBillService: DispatchBillService, private utilService: UfastUtilService,
              private messageService: ShowMessageService, private formBuilder: FormBuilder,
              private ufastValidatorsService: UfastValidatorsService,
              private http: HttpClient
  ) {
    this.materialField = 'materialsNo';
    this.materialFilter = {materialVO: {}};
    this.contractTypeList = [
      {id: 1, type: '采购订单' },
      {id: 2, type: '年度协议'}
    ];
    this.barcodeFlagList = [
      { label: '否', value: 0 },
      { label: '是', value: 1 },
    ];
    this.materialEmitter = new EventEmitter<RightSideTableBoxNs.SelectedChangeEvent>();
    this.materialDataList = [];
    this.finish = new EventEmitter<any>();
    this.orderMaterialList = [];
    this.materialDataList = [];
    this.showMaterialList = false;
    this.fileList = '';
    this.fileServiceUrl = environment.otherData.fileServiceUrl; // 文件服务器url
    this.previewImage = '';
    this.previewVisible = false;

    this.isToLeadVisible = false;
    this.materialList = [];
    this.errorMessage = [];
    this.formData = new FormData();
    this.leadInUrl = environment.baseUrl.ss + '/warehouseInvoice/import';
    this.href = environment.baseUrl.ss + '/warehouseInvoice/download';
    this.uploadUrl = environment.baseUrl.bs + '/uploading/file';
  }
  getDispatchBillDetail = () => {
    this.tableConfig.loading = true;
    this.dispatchBillService.getDispatchBillDetail(this.invoiceNo).subscribe((resData: DispatchBillServiceNs.UfastHttpResT<any>) => {
      this.tableConfig.loading = false;
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      const values = {};
      Object.keys(this.orderForm.controls).forEach((key: string) => {
        values[key] = resData.value.invoiceInfo[key];
      });
      if (values['deliveryDate']) {
        values['deliveryDate'] = new Date(values['deliveryDate']);
      }
      this.orderForm.patchValue(values);
      const tmpFilelist = [];
      if (this.orderForm.value.logisticsAttach !== null) {
        tmpFilelist.push({
          uid: 1,
          name: this.orderForm.value.logisticsAttach,
          url: this.fileServiceUrl + this.orderForm.value.logisticsAttach,
          thumbUrl:  this.fileServiceUrl + this.orderForm.value.logisticsAttach,
        });
      }
      this.fileList = tmpFilelist;
      this.previewImage = this.fileServiceUrl + this.orderForm.value.logisticsAttach;
      this.orderMaterialList = resData.value.detailList || [];
      this.contractType = resData.value.invoiceInfo.contractType;
      this.orderMaterialList.forEach(item => {
        item['_this'] = item;
        if (this.contractType === this.ContractType.Purchase) {
          this.calcUnDelivery(item);
        }
      });
    }, (error: any) => {
      this.tableConfig.loading = false;
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  private calcUnDelivery(material: DispatchBillServiceNs.OrderMaterialItem) {
    material.unDeliveredCount = this.utilService.sub(material.orderCount, material.deliveredCount);
  }
  public emitFinish(value) {
    this.finish.emit(value);
  }
  uploadFileChange($event) {
    if ($event.type === 'progress' || $event.type === 'start') {
      return;
    }
    if ($event.file.status === 'removed') {
      this.fileList.length--;
      return;
    }
    if (this.fileList[0].response.code !== 0) {
      this.messageService.showAlertMessage('', '附件上传失败', 'error');
      this.fileList = [];
      return;
    }
    if (!/\.(jpg|png|jepg)$/.test(this.fileList[0].response.value)) {
      this.messageService.showAlertMessage('', '请上传图片类型', 'error');
      this.fileList = [];
      return;
    }
    this.orderForm.patchValue({
      logisticsAttach: this.fileList[0].response.value
    });
  }
  // 物流附件查看关闭
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
  public showMaterial() {
    if (this.orderForm.controls['ifCodeManage'].invalid) {
      this.messageService.showToastMessage('请选择条码管理方式', 'info');
      this.orderForm.controls['ifCodeManage'].markAsDirty();
      this.orderForm.controls['ifCodeManage'].updateValueAndValidity();
      return;
    }
    this.showMaterialList = !this.showMaterialList;
    this.getMaterialList();
  }

  private checkChooseMaterial(type: number, idList: string[], updateOrigin: boolean = false, all: boolean = false) {
    const event: RightSideTableBoxNs.SelectedChangeEvent = {
      type: type,
      all: all,
      idList: idList,
      updateOrigin: updateOrigin
    };
    this.materialEmitter.emit(event);
  }
  public chooseMaterial(event: RightSideTableBoxNs.SelectedChange<any>) {
    let maxLineNum = 1;
    this.orderMaterialList.forEach((item) => {
      if (item.lineNum > maxLineNum) {
        maxLineNum = item.lineNum;
      }
    });
    if (event.type === RightSideTableBoxNs.SelectedChangeType.Checked) {
      event.list.forEach((item: any, index: number) => {
        const value = this.orderMaterialList.find(material => item[this.materialField] === material[this.materialField]);
        if (!value) {
          item['_this'] = item;
          item.deliveryCount = 0;
          item.lineNum = ++maxLineNum;
          this.orderMaterialList.push(item);
        }
      });
    } else {
      event.list.forEach((item: any) => {
        const i = this.orderMaterialList.findIndex(itemValue => itemValue[this.materialField] === item[this.materialField]);
        this.orderMaterialList.splice(i, 1);
      });
    }
  }
  // 获取物料列表
  getMaterialList = () => {
    const filter = {
      pageNum: this.materialTableConfig.pageNum,
      pageSize: this.materialTableConfig.pageSize,
      filters: this.materialFilter
    };
    this.materialTableConfig.loading = true;
    this.materialDataList = [];
    this.dispatchBillService.getMaterialList(filter).subscribe((resData: DispatchBillServiceNs.UfastHttpResT<any>) => {
      this.materialTableConfig.loading = false;
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.materialDataList = resData.value.list.map((item, index) => {
        item.materialVO = item.materialVO || {
          code: new Date().getTime() + index
        };
        const temp: DispatchBillServiceNs.OrderMaterialItem = {
          materialsId: item.materialId,
          materialsNo: item.materialVO.code,
          materialsName: item.materialVO.name,
          ifCodeManage: item.managementMode,
          materialType: item.materialVO.materialType,
          unit: item.materialVO.unit
        };
        return temp;
      });
      this.materialTableConfig.total = resData.value.total;
      const selectedList = [];
      this.orderMaterialList.forEach((item) => {
        selectedList.push(item[this.materialField]);
      });
      this.checkChooseMaterial(RightSideTableBoxNs.SelectedChangeType.Checked, selectedList, true);

    }, (error: any) => {
      this.materialTableConfig.loading = false;
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  public saveOrder() {
    if (!this.submitByType()) {
      return;
    }
    this.messageService.showLoading('');
    this.dispatchBillService.saveDispatchBill(this.submitData)
    .subscribe((resData: DispatchBillServiceNs.UfastHttpResT<any>) => {
      this.messageService.closeLoading();
      if (resData.code !== 0) {
        this.messageService.showToastMessage(resData.message, 'error');
        return;
      }
      this.messageService.showToastMessage('操作成功', 'success');
      this.emitFinish(true);
    }, (error) => {
      this.messageService.showAlertMessage('', error.message, 'error');
      this.messageService.closeLoading();
    });
  }
  public submitOrder() {
    if (this.orderMaterialList.length === 0) {
      this.messageService.showToastMessage('请选择物料', 'info');
      return;
    }
    if (!this.submitByType()) {
      return;
    }
    this.messageService.showLoading('');
    this.dispatchBillService.commitDispatchBill(this.submitData)
    .subscribe((resData: DispatchBillServiceNs.UfastHttpResT<any>) => {
      this.messageService.closeLoading();
      if (resData.code !== 0) {
        this.messageService.showToastMessage(resData.message, 'error');
        return;
      }
      this.messageService.showToastMessage('操作成功', 'success');
      this.emitFinish(true);
    }, (error) => {
      this.messageService.showAlertMessage('', error.message, 'error');
      this.messageService.closeLoading();
    });
  }
  private submitByType(): boolean {
    this.setSubmitData();
    for (let i = 0, len = this.submitData.detailList.length; i < len; i++) {
      if (this.submitData.detailList[i].deliveryCount <= 0) {
        this.messageService.showToastMessage('不可以存在发货数量为0的物料', 'warning');
        return false;
      }
      if (this.submitData.detailList[0].ifCodeManage !== this.submitData.detailList[i].ifCodeManage) {
        this.messageService.showToastMessage('所有物料的条码管理方式应该相同', 'warning');
        return false;
      }
    }
    Object.keys(this.orderForm.controls).forEach((key: string) => {
      this.orderForm.controls[key].markAsDirty();
      this.orderForm.controls[key].updateValueAndValidity();
    });
    if (this.orderForm.invalid) {
      return false;
    }
    return true;

  }
  /**------------设置提交数据-------------**/
  private setSubmitData() {
    this.submitData.detailList = this.orderMaterialList;
    const fieldList = ['ifCodeManage', 'materialsName', 'materialsNo', 'unit', 'uomCode',
      'lineNum', 'orderCount', 'deliveredCount', 'deliveryCount', 'purchaseLineId', 'id'];

    this.submitData.detailList = this.orderMaterialList.map(item => {
      const temp = {};
      fieldList.forEach((key: string) => {
        temp[key] = item[key];
      });

      return <any>temp;
    });
    Object.assign(this.submitData.invoiceInfo, this.orderForm.getRawValue());
    if (this.addOrder) {
      this.submitData.invoiceInfo['invoiceNo'] = undefined;
    }
  }
  private getContractDetail(id: string) {
    this.dispatchBillService.getContractDetail(this.contractNo)
      .subscribe((resData: DispatchBillServiceNs.UfastHttpResT<DispatchBillServiceNs.ContractItemModel>) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.orderForm.patchValue({
        purchaseNo: resData.value['purchaseNo'],
        goodsReceivor: resData.value['shipToName'],
        supplierName: resData.value['vendorName']
      });
      this.submitData.invoiceInfo.billReceivor = resData.value['locationCode'];
      this.submitData.invoiceInfo.supplierNo = resData.value['vendorId'];
      this.submitData.invoiceInfo.purchaseHeaderId = resData.value['poHeaderId'];
      this.orderMaterialList = [];
      resData.value.purchaseContractDetailVOs = resData.value.purchaseContractDetailVOs || [];
      resData.value.purchaseContractDetailVOs.forEach((item) => {
        const temp = <any>{};
        temp['_this'] = temp;
        temp['ifCodeManage'] = item['barcodeFlag'];
        temp['materialsName'] = item['materialDesc'];
        temp['materialsId'] = item['itemId'];
        temp['materialsNo'] = item['materialCode'];
        temp['unit'] = item['unitMeasLookupCode'];
        temp['deliveredCount'] = item['finishAmount'] || 0;
        temp['orderCount'] = item['quantity'];
        temp['lineNum'] = parseInt(item['lineNum'], 10);
        temp['deliveryCount'] = 0;
        temp['uomCode'] = item['uomCode'];
        temp['purchaseLineId'] = item['poLineId'];
        if (this.contractType === this.ContractType.Purchase) {
          this.calcUnDelivery(temp);
        }
        this.orderMaterialList.push(temp);
      });
    }, (error) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  public orderMaterialChange(event: UfastTableNs.SelectedChange) {
    const checked = event.type === UfastTableNs.SelectedChangeType.Checked ? true : false;
    if (event.index === -1) {
      this.tableConfig.checkAll = checked;
      this.orderMaterialList.forEach((item: any) => {
        item[this.tableConfig.checkRowField] = checked;
      });
      return;
    }
    this.tableConfig.checkAll = checked;
    if (checked) {
      for (let i = 0, len = this.orderMaterialList.length; i < len; i++) {
        if (!this.orderMaterialList[i][this.tableConfig.checkRowField]) {
          this.tableConfig.checkAll = false;
          break;
        }
      }
    }
  }
  public deleteMaterialOne(materialNo: string) {
    const idList: string[] = [];
    for (let i = 0, len = this.orderMaterialList.length; i < len; i++) {
      if (materialNo === this.orderMaterialList[i].materialsNo) {
        idList.push(this.orderMaterialList[i][this.materialField]);
        this.orderMaterialList.splice(i, 1);
        break;
      }
    }
    if (this.orderMaterialList.length === 0) {
      this.tableConfig.checkAll = false;
    }
    this.checkChooseMaterial(RightSideTableBoxNs.SelectedChangeType.Unchecked, idList);
  }
  /**
   * @delteMaterial:删除选中得物料
   * **/
  public deleteMaterial() {
    const idList: string[] = [];
    this.orderMaterialList = this.orderMaterialList.filter((item) => {
      if (item[this.tableConfig.checkRowField]) {
        idList.push(item[this.materialField]);
      }
      return !item[this.tableConfig.checkRowField];
    });

    if (this.orderMaterialList.length === 0) {
      this.tableConfig.checkAll = false;
    }
    if (idList.length > 0) {
      this.checkChooseMaterial(RightSideTableBoxNs.SelectedChangeType.Unchecked, idList);
    } else {
      this.messageService.showToastMessage('请选择需要删除的物料', 'info');
    }
  }
  /**
   * @clearByBarcodeFlag:  根据是否条码管理删除物料
   * **/
  public clearByBarcodeFlag(flag: boolean) {
    const idList: string[] = [];
    this.orderMaterialList = this.orderMaterialList.filter((item) => {
      // 删除条码管理
      if (flag && item['ifCodeManage'] === BarcodeManage.Flase) {
        return true;
      }
      // 删除非条码管理
      if (!flag && item['ifCodeManage'] === BarcodeManage.True) {
        return true;
      }
      idList.push(item.materialsId);
      return false;
    });
    if (this.orderMaterialList.length === 0) {
      this.tableConfig.checkAll = false;
    }
    if (idList.length > 0) {
      this.checkChooseMaterial(RightSideTableBoxNs.SelectedChangeType.Unchecked, idList);
    }
  }
  /**
   * 选择是否条码管理
   * */
  public onBarcodeFlag(value: number) {
    this.clearByBarcodeFlag(value === BarcodeManage.Flase);
    this.materialFilter.managementMode = value;
  }
  showToLeadModal(pageNum?: number): void {
    this.isToLeadVisible = true;
  }

  beforeUpload = (file): boolean => {
    this.materialList.push(file);
    return false;
  }
  public onDeliverChange(data: number, material: any) {

  }
  handleOk(): void {
    this.messageService.showLoading();
    if (this.errorMessage.length !== 0) {
      this.messageService.showAlertMessage('', '请重新选择文件', 'error');
      this.messageService.closeLoading();
      return;
    }
    this.materialList.forEach((file: any) => {
      this.formData.append('files[]', file);
    });
    const req = new HttpRequest('POST', this.leadInUrl, this.formData, {});
    this.http.request(req).subscribe((event: any) => {
      this.messageService.closeLoading();
      if (event.type === 4) {
        if (event.body.code !== 0) {
          this.messageService.showAlertMessage('', event.body.message, 'error');
          this.formData = new FormData;
          return;
        }
        this.materialList = [];
        this.isToLeadVisible = false;
        let lineNum = 1;
        this.orderMaterialList.forEach((item) => {
          if (item.lineNum > lineNum) {
            lineNum = item.lineNum;
          }
        });
        event.body.value.forEach((item) => {
          let temp = <any>{};
          temp = item;
          temp['_this'] = temp;
          temp['materialsName'] = item['materialsDes'];
          temp['ifCodeManage'] = item['barcodeFlag'];
          temp['deliveryCount'] = item['qty'];
          temp['lineNum'] = ++lineNum;
          this.orderMaterialList.push(temp);
        });
        this.formData = new FormData;
      }
    }, (err: any) => {
      this.messageService.closeLoading();
      this.messageService.showAlertMessage('', 'upload failed.', 'error');
    });
  }

  handleToLeadCancel(): void {
    this.isToLeadVisible = false;
  }

  ngOnInit() {
    this.submitData = {
      invoiceInfo: <any>{},
      detailList: []
    };

    const tableHeaders: UfastTableNs.TableHeader[] = [
      { title: '操作', tdTemplate: this.operationTpl, width: 100, fixed: true },
      { title: '行号', field: 'lineNum', width: 60 },
      { title: '物料编码', field: 'materialsNo', width: 100 },
      { title: '物料名称', field: 'materialsName', width: 150 },
      { title: '单位', field: 'unit', width: 80 },
      { title: '是否条码管理', field: 'ifCodeManage', width: 100, pipe: 'barcodeManage'},
      { title: '本次发货数量', tdTemplate: this.deliverCountTpl, width: 100 }
    ];
    if (this.contractType === this.ContractType.Purchase) {
      tableHeaders.push(
        { title:  '已发货数量', field: 'deliveredCount', width: 100},
        { title: '未发货数量', field: 'unDeliveredCount', width: 80 },
        { title:  '订单数量', field: 'orderCount', width: 100}
      );
    }
    this.tableConfig = {
      pageSize: 10,
      showCheckbox: true,
      checkAll: false,
      checkRowField: '_checked',
      showPagination: false,
      pageNum: 1,
      total: 0,
      loading: false,
      headers: tableHeaders
    };
    this.orderForm = this.formBuilder.group({
      invoiceNo: [{value: null, disabled: true}],
      supplierName: [{value: null, disabled: true}],
      deliveryType: [{value: null, disabled: true}],
      goodsReceivor: [{value: null, disabled: true}],
      ifCodeManage: [null, [Validators.required]],
      purchaseNo: [{value: null, disabled: true}],
      contractType: [{value: null, disabled: true}],
      consignee: [null, [Validators.required, Validators.maxLength(this.maxLenInputEnum.Default)]],
      deliveryPhone: [null, [Validators.required, this.ufastValidatorsService.mobileOrTeleValidator()]],
      deliveryAddress: [null, [Validators.required, Validators.maxLength(this.maxLenInputEnum.Default)]],
      logisticsNo: [null, [Validators.maxLength(this.maxLenInputEnum.Default)]],
      logisticsContact: [null, [Validators.maxLength(this.maxLenInputEnum.Default)]],
      logisticsAttach: [null],
      logisticsCompany: [null, [Validators.maxLength(this.maxLenInputEnum.Default)]],
      logisticsPhone: [null,  [ this.ufastValidatorsService.mobileOrTeleValidator()]],
      deliveryDate: [null, [Validators.maxLength(this.maxLenInputEnum.Default)]],
      logisticsContactIdCard: [null, [Validators.maxLength(this.maxLenInputEnum.IdCard), this.ufastValidatorsService.idNoValidator()]],
      licensePlate: [null, Validators.maxLength(this.maxLenInputEnum.Default)]
    });
    // 物料侧边栏
    this.materialTableConfig = {
      pageSize: 10,
      yScroll: 400,
      showCheckbox: true,
      showPagination: true,
      checkAll: false,
      checkRowField: '__checked',
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageNum: 1,
      total: 0,
      loading: false,
      headers: [{ title: '物料编码', field: 'materialsNo', width: 100 },
      { title: '物料描述', field: 'materialsName', width: 150 }
      ]
    };

    this.submitData.invoiceInfo.contractType = this.contractType;
    this.submitData.invoiceInfo.billType = 0;
    this.submitData.invoiceInfo.deliveryType = this.contractType;

    this.orderForm.patchValue({
      deliveryType: this.contractType,
      contractType: this.contractType
    });
    if (this.addOrder) {      // 新增
      this.orderForm.patchValue({invoiceNo: '系统生成'});
      this.getContractDetail(this.contractNo);
    } else {        // 编辑
      this.getDispatchBillDetail();
    }
  }

}
