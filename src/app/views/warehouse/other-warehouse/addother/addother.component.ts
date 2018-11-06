import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UfastTableNs, RightSideTableBoxNs} from '../../../../layout/layout.module';
import {OtherwarehouseService, OtherWarehouseServiceNs} from '../../../../core/trans/otherwarehouse.service';
import {ShowMessageService} from '../../../../widget/show-message/show-message';
import {NewsServiceNs} from '../../../../core/common-services/news.service';
import {UserService, UserServiceNs} from '../../../../core/common-services/user.service';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
interface TabPageType {
  ManagePage: number;
  AddPage: number;
  EditPage: number;
  DetailPage: number;
}
enum InputMaxLenEnum {
  Default = 50
}
@Component({
  selector: 'app-addother',
  templateUrl: './addother.component.html',
  styleUrls: ['./addother.component.scss']
})
export class AddotherComponent implements OnInit {
  otherWareHouseForm: FormGroup;
  userInfo: any;
  selectedSideMaterialList: number[];
  tableConfig: UfastTableNs.TableConfig;
  materialTableConfig: UfastTableNs.TableConfig;
  inWareHouseTableConfig: UfastTableNs.TableConfig;
  reservoirTableConfig: UfastTableNs.TableConfig;
  leftList: any[];
  materialDataList: any[];
  inWareHouseDataList: any[];
  reservoirDataList: any[];
  InMouseTypeData: any[];
  tabPageType: TabPageType;
  applyDate: any;
  show: boolean;
  isVisible: boolean;
  isVisibleReservoir: boolean;
  // 物料导入变量
  isToLeadVisible: boolean;
  errorMessage: any;
  formData: any;
  leadInUrl: any;
  fileList: any[] = [];
  href: any;
  @ViewChild('operation') operation: TemplateRef<any>;
  @ViewChild('inMouseNum') inMouseNum: TemplateRef<any>;
  @ViewChild('chooseWareHouse') chooseWareHouse: TemplateRef<any>;
  @ViewChild('chooseReservoir') chooseReservoir: TemplateRef<any>;
  @Output()finish: EventEmitter<any>;
  selectedList: number[];
  InputMaxLen = InputMaxLenEnum;

  rightTableEmit: EventEmitter<RightSideTableBoxNs.SelectedChangeEvent>;
  materialsObj: {[index: string]: {qty: number}};
  barcodeFlagList: any[];
  materialFilter: any;
  constructor(private formBuilder: FormBuilder,
              private messageService: ShowMessageService,
              private otherWareHouseService: OtherwarehouseService,
              private userService: UserService,
              private http: HttpClient) {
    this.materialFilter = {};
    this.barcodeFlagList = [
      {label: '否', value: 0},
      {label: '是', value: 1},
    ];
    this.materialsObj = {};
    this.show = false;
    this.userInfo = [];
    this.selectedList = [];
    this.selectedSideMaterialList = [];
    this.leftList = [];
    this.materialDataList = [];
    this.inWareHouseDataList = [];
    this.reservoirDataList = [];
    this.InMouseTypeData = [];
    this.finish = new EventEmitter<any>();
    this.href = environment.baseUrl.ss + '/abnormalIn/download';
    this.tabPageType = {
      ManagePage: 0,
      AddPage: 1,
      EditPage: 2,
      DetailPage: 3,
    };
    this.rightTableEmit = new EventEmitter();

    // 物料导入
    this.isToLeadVisible = false;
    this.errorMessage = [];
    this.formData = new FormData();
    this.leadInUrl = environment.baseUrl.ss +  '/abnormalIn/import';
  }
  public emitFinish() {
    this.finish.emit();
  }

  // 获取目前登录用户信息
  public getPersonalInfo() {
    this.userService.getLogin().subscribe((resData: UserServiceNs.UfastHttpAnyResModel) => {
      if (resData.code === 0) {
        this.userInfo = resData.value;
      } else {
        this.messageService.showAlertMessage('', resData.message, 'warning');
      }
    });
  }

  public materialCheckChange(event: UfastTableNs.SelectedChange) {
    if (event.index === -1) {
      this.leftList.forEach((item: any) => {
        item[this.tableConfig.checkRowField] = event.type === UfastTableNs.SelectedChangeType.Checked ? true : false;
      });
      return;
    }
    if (event.type === UfastTableNs.SelectedChangeType.Unchecked) {
      this.tableConfig.checkAll = false;
    } else {
      this.tableConfig.checkAll = this.leftList.length === 0 ? false : true;
      for (let i = 0, len = this.leftList.length; i < len; i++) {
        if (!this.leftList[i][this.tableConfig.checkRowField]) {
          this.tableConfig.checkAll = false;
          break;
        }
      }
    }
  }
  public showMaterial(event: Event) {
    if (this.otherWareHouseForm.controls['inArea'].invalid) {
      this.messageService.showToastMessage('请选择领入库区', 'warning');
      return;
    }
    this.show = !this.show;
    // event.stopPropagation();
    this.getMaterialList();
    // if (!this.materialDataList.length) {
    //   this.getMaterialList();
    // }
  }
  public chooseMaterial(event: RightSideTableBoxNs.SelectedChange<any>) {
    if (event.type === RightSideTableBoxNs.SelectedChangeType.Checked) {
      event.list.forEach((item: any, index: number) => {
        const value = this.leftList.find(material => item.materialsNo === material.materialsNo);
        if (!value) {
          if (this.materialsObj[item.materialsNo]) {
            this.materialsObj[item.materialsNo].qty = 1;
          } else {
            this.materialsObj[item.materialsNo] = {qty: 1};
          }
          this.leftList.push(item);
        }
      });
    } else {
      event.list.forEach((item: any) => {
        const i = this.leftList.findIndex(itemValue => itemValue.materialsNo === item.materialsNo);
        this.leftList.splice(i, 1);
      });
    }
  }
  public deleteMaterials() {
    const idList: string[] = [];
    this.leftList = this.leftList.filter((item: any) => {
      if (item[this.tableConfig.checkRowField]) {
        idList.push(item.materialsNo);
      }
      return !item[this.tableConfig.checkRowField];
    });
    if (idList.length === 0) {
      this.messageService.showToastMessage('请选择需要删除的物料', 'info');
      return;
    }
    this.checkChooseMaterial(RightSideTableBoxNs.SelectedChangeType.Unchecked, idList);
  }
  // 本地删除已选中的物料
  public deleteCheckMaterial(item: any) {
    const i = this.leftList.findIndex(value => value.materialsNo === item);
    this.leftList.splice(i, 1);
    this.checkChooseMaterial(RightSideTableBoxNs.SelectedChangeType.Unchecked, [item]);
    this.messageService.showToastMessage('删除成功!', 'success');
  }

  public qtyChange(materialsNo, event) {
    const value = this.leftList.find(material => materialsNo === material.materialsNo);
    if (value) {
      value.qty = event;
    }
  }

  // 显示领入仓库模态框
  showModal(pageNum?: number): void {
    this.isVisible = true;
    this.getInWareHouseList(pageNum);
    this.reservoirTableConfig.headers[0].title = '仓库编码';
    this.reservoirTableConfig.headers[1].title = '仓库描述';
  }

  getInWareHouseList = (pageNum?: number) => {
    const filter = {
      pageNum: pageNum || this.inWareHouseTableConfig.pageNum,
      pageSize: this.inWareHouseTableConfig.pageSize,
      filters: {
        pCode: '0',
        houseLevel: 1,
        type: 0
      }
    };
    this.otherWareHouseService.getInWareHouseList(filter).subscribe((resData: OtherWarehouseServiceNs.UfastHttpResT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showToastMessage(resData.message, 'warning');
      }
      this.inWareHouseDataList = resData.value.list;
      this.inWareHouseTableConfig.total = resData.value.total;
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  // 显示选择库区模态框
  showReservoirModal(pageNum?: number): void {
    if (this.otherWareHouseForm.controls['inLocation'].invalid) {
      this.messageService.showToastMessage( '请选择领入仓库' , 'warning');
      return;
    }
    this.reservoirTableConfig.headers[0].title = '库区编码';
    this.reservoirTableConfig.headers[1].title = '库区描述';
    this.isVisibleReservoir = true;
    const filter = {
      pageNum: pageNum || this.reservoirTableConfig.pageNum,
      pageSize: this.reservoirTableConfig.pageSize,
      filters: {
        pCode: this.otherWareHouseForm.controls['inLocation'].value,
        houseLevel: 2,
        type: 0
      }
    };
    this.otherWareHouseService.getCodeAreaWareHouseList(filter).subscribe((resData: OtherWarehouseServiceNs.UfastHttpResT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showToastMessage(resData.message, 'warning');
      }
      this.reservoirDataList = resData.value.list;
      this.reservoirTableConfig.total = resData.value.total;
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  handleCancelReservoir(): void {
    this.isVisibleReservoir = false;
  }

  // 选择领入仓库
  public chooseWareHouseFun(code: string) {
    this.otherWareHouseForm.controls['inLocation'].setValue(code);
    this.otherWareHouseForm.patchValue({
      inLocation: code,
      inArea: null
    });
    this.handleCancel();
  }

  // 选择领入库区
  public chooseReservoirFun(item: any) {
    this.otherWareHouseForm.controls['inArea'].setValue(item);
    this.handleCancelReservoir();
  }

  // 显示导入物料模态框
  showToLeadModal(pageNum?: number): void {
    if (this.otherWareHouseForm.controls['inArea'].invalid) {
      this.messageService.showToastMessage('请选择领入库区', 'warning');
      return;
    }
    this.isToLeadVisible = true;
  }

  beforeUpload = (file): boolean => {
    this.fileList.push(file);
    return false;
  }
  public clearFileList() {
    this.fileList = [];
  }
  public handleOk(): void {
    if (this.fileList.length === 0) {
      this.messageService.showToastMessage('请选择文件', 'info');
      return;
    }
    if (this.errorMessage.length !== 0) {
      this.messageService.showAlertMessage('', '请重新选择文件', 'error');
      return;
    }
    this.formData = new FormData;
    this.fileList.forEach((file: any) => {
      this.formData.append('files[]', file);
    });
    this.formData.append('barcodeFlag', this.otherWareHouseForm.value.barcodeFlag);
    this.formData.append('warehouseCode', this.otherWareHouseForm.value.inLocation);
    this.formData.append('areaCode', this.otherWareHouseForm.value.inArea);

    const req = new HttpRequest('POST', this.leadInUrl, this.formData, {});
    this.messageService.showLoading();
    this.http.request(req).subscribe((event: any) => {
      this.messageService.closeLoading();
      if (event.type === 4) {
        if (event.body.code !== 0) {
          this.messageService.showToastMessage( event.body.message, 'error');
          return;
        }
        this.fileList = [];
        this.isToLeadVisible = false;
        this.leftList = event.body.value;
        this.materialsObj = {};
        this.leftList.forEach((item) => {
          this.materialsObj[item.materialsNo] = {qty: item.qty};
        });
        this.formData = new FormData;
      }
    }, err => {
      this.messageService.closeLoading();
      this.messageService.showAlertMessage('', 'upload failed.', 'error');
    });
  }

  handleToLeadCancel(): void {
    this.isToLeadVisible = false;
  }

  private checkChooseMaterial(type: number, idList: string[], updateOrigin: boolean = false, all: boolean = false) {
    const event: RightSideTableBoxNs.SelectedChangeEvent = {
      type: type,
      all: all,
      idList: idList,
      updateOrigin: updateOrigin
    };
    this.rightTableEmit.emit(event);
  }

  getMaterialList = () => {
    const filter = {
      pageNum: this.materialTableConfig.pageNum,
      pageSize: this.materialTableConfig.pageSize,
      filters: this.materialFilter
    };

    this.materialTableConfig.loading = true;
    this.materialDataList = [];
    this.otherWareHouseService.getMaterialList(filter).subscribe((resData: OtherWarehouseServiceNs.UfastHttpResT<any>) => {
      this.materialTableConfig.loading = false;
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.materialDataList = resData.value.list.map((item) => {
        const temp = <any>{};
        temp.materialsNo = item['materialVO'].code;
        temp.materialsDes = item['materialVO'].materialDesc;
        temp.unit = item['materialVO'].unit;
        temp.materialsType = item['materialVO'].firstLevel + '/' + item['materialVO'].secondLevel + '/' + item['materialVO'].thirdLevel;
        return temp;
      });
      this.materialTableConfig.total = resData.value.total;

      const idList = this.leftList.map((item) => {
        return item.materialsNo;
      });
      this.checkChooseMaterial(RightSideTableBoxNs.SelectedChangeType.Checked, idList, true);
    }, (error: any) => {
      this.materialTableConfig.loading = false;
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  // 获取入库类型列表
  public getListType() {
    const filter = {
      pageNum: 0,
      pageSize: 0,
      filters: {inOut: 0}
    };
    this.otherWareHouseService.getBillTypeConfigList(filter).subscribe((resData: OtherWarehouseServiceNs.UfastHttpResT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.InMouseTypeData = resData.value.list;
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  public onBarcodeFlag(data) {
    this.materialFilter.managementMode = data;
    this.leftList = [];
    this.materialsObj = {};
    this.checkChooseMaterial(RightSideTableBoxNs.SelectedChangeType.Unchecked, null, true, true);
    this.getMaterialList();
  }
  public submitWarehouse() {
    for (const key of Object.keys(this.otherWareHouseForm.controls)) {
      this.otherWareHouseForm.controls[key].markAsDirty();
      this.otherWareHouseForm.controls[key].updateValueAndValidity();
    }

    if (this.otherWareHouseForm.invalid) {
      return;
    }
    const detailList: OtherWarehouseServiceNs.AddOtherMaterialModel[] = [];
    this.leftList.forEach((item: any) => {
      detailList.push({
        amount: item['amount'],
        amountAfterAdjust: item['amountAfterAdjust'],
        applyQty: item['applyQty'],
        barCode: item['barCode'],
        deliveryNum: item['deliveryNum'],
        enableNum: item['enableNum'],
        intentionNum: item['intentionNum'],
        isChecked: item['isChecked'],
        locationCode: item['locationCode'],
        materialsDes: item['materialsDes'],
        materialsId: item['materialsId'],
        materialsNo: item['materialsNo'],
        materialsType: item['materialsType'],
        price: item['price'],
        priceSchemeId: item['priceSchemeId'],
        priceSchemeName: item['priceSchemeName'],
        qty: item['qty'],
        // qty: item['qty'] ? item['qty'] : 1,
        requestDeliveryDate: item['requestDeliveryDate'],
        unit: item['unit']
      });
    });
    if (detailList.length === 0) {
      this.messageService.showToastMessage('物料不能为空', 'warning');
      return;
    }
    const headerInfo: OtherWarehouseServiceNs.AddOtherHeaderModel = {
      applyDate: this.applyDate,
      createId: this.userInfo.userId,
      createName: this.userInfo.name,
      deptId: this.userInfo.deptId,
      dept: this.userInfo.deptName,
      inArea: this.otherWareHouseForm.value.inArea,
      inLocation: this.otherWareHouseForm.value.inLocation,
      innerOrder: this.otherWareHouseForm.value.innerOrder,
      innerOrderNote: this.otherWareHouseForm.value.innerOrderNote,
      note: this.otherWareHouseForm.value.note,
      barcodeFlag: this.otherWareHouseForm.value.barcodeFlag,
      typeId: this.otherWareHouseForm.value.typeId,
    };
    if (detailList.length === 0) {
      this.messageService.showToastMessage('请选择物料!', 'error');
      return;
    }
    let observer: any = null;
    observer = this.otherWareHouseService.addWareHouse(detailList, headerInfo);
    observer.subscribe((resData: NewsServiceNs.NewsResModelT<any>) => {
      if (resData.code === 0) {
        this.messageService.showToastMessage('操作成功', 'success');
      } else {
        this.messageService.showToastMessage(resData.message, 'warning');
      }
      this.emitFinish();
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  ngOnInit() {
    this.getPersonalInfo();
    this.getListType();
    this.applyDate = new Date();
    this.otherWareHouseForm = this.formBuilder.group({
      inLocation: [null, [Validators.required]],
      innerOrder: [null, [Validators.maxLength(this.InputMaxLen.Default)]],
      inArea: [null, [Validators.required]],
      applyDate: [null],
      typeId: [null, [Validators.required]],
      note: [null, [Validators.maxLength(this.InputMaxLen.Default)]],
      innerOrderNote: [null, [Validators.maxLength(this.InputMaxLen.Default)]],
      barcodeFlag: [1, [Validators.required]]
    });
    this.materialFilter.managementMode = this.otherWareHouseForm.value.barcodeFlag;
    // 选中的物料
    this.tableConfig = {
      pageSize: 10,
      showCheckbox: true,
      showPagination: false,
      checkRowField: 'checked',
      pageNum: 1,
      total: 0,
      loading: false,
      headers: [{title: '操作', tdTemplate: this.operation, width: 60},
        {title: '物料编码', field: 'materialsNo', width: 100},
        {title: '物料描述', field: 'materialsDes', width: 150},
        {title: '分类', field: 'materialsType', width: 100},
        {title: '单位', field: 'unit', width: 80},
        {title: '入库数量', tdTemplate: this.inMouseNum, width: 100},
      ]
    };

    // 正在选择的物料
    this.materialTableConfig = {
      pageSize: 10,
      yScroll: 500,
      showCheckbox: true,
      showPagination: true,
      checkAll: false,
      checkRowField: '_checked',
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageNum: 1,
      total: 0,
      loading: false,
      headers: [{title: '物料编码', field: 'materialsNo', width: 100},
        {title: '物料描述', field: 'materialsDes', width: 150}
      ]
    };

    // 领入仓库模态框
    this.inWareHouseTableConfig = {
      pageSize: 10,
      yScroll: 100,
      showCheckbox: false,
      showPagination: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageNum: 1,
      total: 0,
      loading: false,
      headers: [{title: '仓库编码', field: 'code', width: 100},
        {title: '仓库描述', field: 'remark', width: 150},
        {title: '操作', tdTemplate: this.chooseWareHouse, width: 60}
      ]
    };

    // 选择库区模态框
    this.reservoirTableConfig = {
      pageSize: 10,
      yScroll: 100,
      showCheckbox: false,
      showPagination: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageNum: 1,
      total: 0,
      loading: false,
      headers: [{title: '仓库编码', field: 'code', width: 100},
        {title: '仓库描述', field: 'remark', width: 150},
        {title: '操作', tdTemplate: this.chooseReservoir, width: 60}
      ]
    };
  }

}
