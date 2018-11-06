import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import {RightSideTableBoxNs, UfastTableNs} from '../../../../layout/layout.module';
import {
  PickingApplyService,
  PickingApplyServiceNs
} from '../../../../core/trans/picking-apply.service';
import {ShowMessageService} from '../../../../widget/show-message/show-message';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService, UserServiceNs} from '../../../../core/common-services/user.service';
import {UfastValidatorsService} from '../../../../core/infra/validators/validators.service';

enum InputMaxLenEnum {
  BusinessEntity = 50,
  Consignee = 50,
  ConsigneeAddr = 50,
  Proposer = 50,
  Default = 50,
}
interface DataDictItem {
  id: string;
  name: string;
}
@Component({
  selector: 'app-add-edit-picking-apply',
  templateUrl: './add-edit-picking-apply.component.html',
  styleUrls: ['./add-edit-picking-apply.component.scss']
})
export class AddEditPickingApplyComponent implements OnInit {
  @Input() orderNo: string;   // 订单id
  @Output() finish: EventEmitter<any>;
  @ViewChild('tableOpTpl')tableOpTpl: TemplateRef<any>;
  @ViewChild('numTpl')numTpl: TemplateRef<any>;
  isAddOrder: boolean;
  materialListConfig: UfastTableNs.TableConfig;
  materialDetailList: PickingApplyServiceNs.MaterialDetailForPickApply[];
  showMaterialBox: boolean;
  rightTableConfig: UfastTableNs.TableConfig;     // 右侧选择物料表配置
  rightDataList: PickingApplyServiceNs.MaterialDetailForPickApply[];
  rightTableChange: EventEmitter<any>;

  formGroup: FormGroup;
  InputMaxLen = InputMaxLenEnum;
  userInfo: UserServiceNs.UserInfoModel;

  filterMaterial: any;
  materialField: string;
  materialEmitter: EventEmitter<RightSideTableBoxNs.SelectedChangeEvent>;

  materialTypeList: DataDictItem[];

  currMaxRowNo: number; // 当前所选物料的最大行号

  constructor(private dataService: PickingApplyService, private messageService: ShowMessageService,
              private formBuilder: FormBuilder, private userService: UserService, private ufastValidatorsService: UfastValidatorsService
  ) {
    this.isAddOrder = false;
    this.materialTypeList = [
      {id: '1', name: '材料'},
      {id: '2', name: '备件'},
      {id: '3', name: '设备'}
    ];
    this.materialField = 'materialCode';
    this.materialEmitter = new EventEmitter<RightSideTableBoxNs.SelectedChangeEvent>();
    this.filterMaterial = {};

    this.userInfo = null;
    this.orderNo = null;
    this.finish = new EventEmitter<any>();
    this.materialDetailList = [];
    this.showMaterialBox = false;
    this.rightDataList = [];
    this.rightTableChange = new EventEmitter<any>();
    this.currMaxRowNo = 0;
  }

  /**
   * 需要日期
   */
  disabledEnd = (needDate: Date) => {
    if (!needDate || !this.formGroup.getRawValue().applyDate) {
      return false;
    }
    return needDate.getTime() <= this.formGroup.getRawValue().applyDate.getTime();
  }
  public trackByItem(index: number, item: any) {
    return item;
  }
  public onMainChecked(event: UfastTableNs.SelectedChange) {
    const checked = event.type === UfastTableNs.SelectedChangeType.Checked ? true : false;
    if (event.index === -1) {
      this.materialListConfig.checkAll = checked;
      this.materialDetailList.forEach((item: any) => {
        item[this.materialListConfig.checkRowField] = checked;
      });
      return;
    }
    this.materialListConfig.checkAll = checked;
    if (checked) {
      for (let i = 0, len = this.materialDetailList.length; i < len; i++) {
        if (!this.materialDetailList[this.materialListConfig.checkRowField]) {
          this.materialListConfig.checkAll = false;
          break;
        }
      }
    }
  }
  public onCancel() {
    this.finish.emit();
  }
  public onChooseMaterial() {
    this.showMaterialBox = !this.showMaterialBox;
    if (this.showMaterialBox) {
      this.getFactoryMaterialList();
    }
  }
  /**
   * @checkChooseMaterial: 左侧物料删除时，发射事件
   * **/
  private checkChooseMaterial(type: number, idList: string[], updateOrigin: boolean = false, all: boolean = false) {
    const event: RightSideTableBoxNs.SelectedChangeEvent = {
      type: type,
      all: all,
      idList: idList,
      updateOrigin: updateOrigin
    };
    this.materialEmitter.emit(event);
  }

  /**
   * 订阅右边栏表格组件的check事件
   * @param {RightSideTableBoxNs.SelectedChange<any>} event
   */
  public chooseMaterial(event: RightSideTableBoxNs.SelectedChange<any>) {
    if (event.type === RightSideTableBoxNs.SelectedChangeType.Checked) {
      event.list.forEach((item: any, index: number) => {
        const hasExistItem = this.materialDetailList.find(material => item[this.materialField] === material[this.materialField]);
        if (hasExistItem) {
          return;
        }
        item.amountApply = 0;
        item['_this'] = item;     // 提交时要删除此字段
        item.rowNo = ++ this.currMaxRowNo;
        this.materialDetailList.push(item);
      });
    } else {
      event.list.forEach((item: any) => {
        const i = this.materialDetailList.findIndex(itemValue => itemValue[this.materialField] === item[this.materialField]);
        if (i === -1) {
          return;
        }
        this.materialDetailList.splice(i, 1);
        this.currMaxRowNo = 0 ;
        this.materialDetailList.forEach((materialItem) => {
            materialItem.rowNo = ++ this.currMaxRowNo;
        });
      });
    }
  }
  private reflowRowNo() {
    if (!this.isAddOrder) {
      return;
    }
    this.materialDetailList.forEach((item, index: number) => {
      item.rowNo = index + 1;
    });
    this.currMaxRowNo = this.materialDetailList.length;
  }
  public deleteMaterialOne(materialCode: string) {
    const idList: string[] = [];
    for (let i = 0, len = this.materialDetailList.length; i < len; i++) {
      if (materialCode === this.materialDetailList[i].materialCode) {
        idList.push(this.materialDetailList[i][this.materialField]);
        this.materialDetailList.splice(i, 1);
        break;
      }
    }
    if (this.materialDetailList.length === 0) {
      this.materialListConfig.checkAll = false;
    }
    this.reflowRowNo();
    this.checkChooseMaterial(RightSideTableBoxNs.SelectedChangeType.Unchecked, idList);
  }
  /**
   * @delteMaterial:删除选中得物料
   * **/
  public deleteMaterial() {
    const idList: string[] = [];
    this.materialDetailList = this.materialDetailList.filter((item) => {
      if (item[this.materialListConfig.checkRowField]) {
        idList.push(item[this.materialField]);
      }
      return !item[this.materialListConfig.checkRowField];
    });

    if (this.materialDetailList.length === 0) {
      this.materialListConfig.checkAll = false;
    }
    if (idList.length > 0) {
      this.checkChooseMaterial(RightSideTableBoxNs.SelectedChangeType.Unchecked, idList);
    } else {
      this.messageService.showToastMessage('请选择要删除的物料', 'info');
    }
    this.reflowRowNo();
  }
  getFactoryMaterialList = () => {
    Object.keys(this.filterMaterial).filter(item => typeof this.filterMaterial[item] === 'string').forEach((key: string) => {
      this.filterMaterial[key] = this.filterMaterial[key].trim();
    });
    this.filterMaterial.materialType = this.formGroup.value.materialType;
    const filter = {
      pageNum: this.rightTableConfig.pageNum,
      pageSize: this.rightTableConfig.pageSize,
      filters: this.filterMaterial
    };
    this.rightTableConfig.loading = true;
    this.rightDataList = [];
    this.dataService.getFactoryMaterilList(filter)
      .subscribe((resData: PickingApplyServiceNs.PickingApplyResT<any>) => {
        this.rightTableConfig.loading = false;
        if (resData.code !== 0) {
          this.messageService.showAlertMessage('', resData.message, 'error');
          return;
        }
        this.rightTableConfig.total = resData.value.total;
        this.rightDataList = resData.value.list.map((item: PickingApplyServiceNs.FactoryMaterialDetail, index) => {
          item.materialVO = item.materialVO || <any>{
            code: new Date().getTime() + index
          };
          const temp: PickingApplyServiceNs.MaterialDetailForPickApply = {
            id: item.materialId,
            materialCode: item.materialVO.code,
            materialName: item.materialVO.name,
            amountApply: 0,
            unit: <any>item.materialVO.unit,     // todo 后端单位类型没统一
            rowNo: 0
          };
          return temp;
        });
        const selectedList = [];
        this.materialDetailList.forEach((item) => {
          selectedList.push(item[this.materialField]);
        });
        this.checkChooseMaterial(RightSideTableBoxNs.SelectedChangeType.Checked, selectedList, true);
      }, (error) => {
        this.rightTableConfig.loading = false;
        this.messageService.showAlertMessage('', error.message, 'error');
      });
  }
  private getUserInfo() {
    this.userService.getLogin().subscribe((resData: UserServiceNs.UfastHttpResT<UserServiceNs.UserInfoModel>) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', '获取登录信息失败，将无法进行提交.', 'error');
        return;
      }
      this.userInfo = resData.value;
      this.formGroup.patchValue({
        applyName: this.userInfo.name
      });
    }, (error) => {
      this.messageService.showAlertMessage('', '获取登录信息失败，将无法进行提交.', 'error');
    });
  }
  public saveOrder() {
    this.submitByType(PickingApplyServiceNs.SubmitType.StashSave);
  }
  public submitOrder() {
    this.submitByType(PickingApplyServiceNs.SubmitType.Submit);
  }
  private submitByType(type: PickingApplyServiceNs.SubmitType) {
    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.controls[key].markAsDirty();
      this.formGroup.controls[key].updateValueAndValidity();
    });
    if (this.formGroup.invalid) {
      return;
    }
    if (this.materialDetailList.length === 0) {
      this.messageService.showToastMessage('物料不能为空', 'info');
      return;
    }
    const submitData = this.formGroup.getRawValue();
    submitData.pickingApplyDetailVOs = [];
    for (let i = 0, len = this.materialDetailList.length; i < len; i++) {
      const temp = Object.assign({}, this.materialDetailList[i]);
      temp['_this'] = undefined;
      if (temp.amountApply <= 0) {
        this.messageService.showToastMessage('不可以存在申请数量为0的物料', 'warning');
        return;
      }
      submitData.pickingApplyDetailVOs.push(temp);
    }

    let submitHandler = null;
    if (this.isAddOrder) {
      submitHandler = this.dataService.insertOrder(submitData);
      submitData.applyNo = undefined;
    } else {
      submitHandler = this.dataService.updateOrder(submitData);
      submitData['id'] = this.orderNo;
    }
    this.messageService.showLoading('');
    submitHandler.subscribe((resData: PickingApplyServiceNs.PickingApplyResT<any>) => {
      this.messageService.closeLoading();
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.finish.emit();
      this.messageService.showToastMessage('操作成功', 'success');
    }, (error) => {
      this.messageService.closeLoading();
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  private getOrderDetail() {
    this.dataService.getOrderDetail(this.orderNo)
      .subscribe((resData: PickingApplyServiceNs.PickingApplyResT<PickingApplyServiceNs.PickingApplyOrder>) => {
        if (resData.code !== 0) {
          this.messageService.showAlertMessage('', resData.message, 'error');
          return;
        }
        const fieldList = ['applyNo', 'orgName', 'usage', 'materialType', 'applyDepartment',
          'section', 'plannerName', 'needDate', 'receiverName', 'receiverNumber', 'receiverAddress', 'applyName', 'applyDate'];
        const temp = {};
        fieldList.forEach((key: string) => {
          temp[key] = resData.value[key];
        });
        temp['applyDate'] = new Date(temp['applyDate']);
        temp['needDate'] = new Date(temp['needDate']);
        this.formGroup.patchValue(temp);
        this.materialDetailList = resData.value.pickingApplyDetailVOs;
        this.materialDetailList.forEach((item) => {
          item['_this'] = item;
          this.currMaxRowNo = item.rowNo > this.currMaxRowNo ? item.rowNo : this.currMaxRowNo;
        });
      }, (error) => {
        this.messageService.showAlertMessage('', error.message, 'error');
      });
  }
  public getCompanyName() {
    this.dataService.getWorkSpaceName().subscribe((resData: PickingApplyServiceNs.PickingApplyResT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showToastMessage(resData.message, 'error');
        return;
      }
      this.formGroup.patchValue({
        orgName: resData.value
      });
    }, (error) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  ngOnInit() {
    this.materialListConfig = {
      checkAll: false,
      showCheckbox: true,
      showPagination: false,
      checkRowField: '_checkML',
      loading: false,
      headers: [
        {title: '操作', tdTemplate: this.tableOpTpl, width: 100, fixed: true},
        {title: '行号', field: 'rowNo', width: 80, fixed: true},
        {title: '物料编码', field: 'materialCode', width: 100},
        {title: '物料名称', width: 200, field: 'materialName'},
        {title: '单位', field: 'unit', width: 100},     // 管道待添加
        {title: '申请数量', tdTemplate: this.numTpl, width: 100},
      ]
    };
    this.rightTableConfig = {
      checkAll: false,
      showCheckbox: true,
      checkRowField: '_checkMR',
      showPagination: true,
      pageSize: 10,
      pageNum: 1,
      pageSizeOptions: [10, 20, 30, 40, 50],
      loading: false,
      yScroll: 400,
      headers: [
        {title: '物料编码', field: 'materialCode', width: 100},
        {title: '物料名称', field: 'materialName', width: 150}
      ]
    };
    this.formGroup = this.formBuilder.group({
      applyNo: [{value: '系统生成', disabled: true}, [Validators.required]],
      orgName: [{value: null, disabled: true}, [Validators.required, Validators.maxLength(this.InputMaxLen.BusinessEntity)]],
      usage: [null, [Validators.required, Validators.maxLength(this.InputMaxLen.Default)]],
      materialType: [this.materialTypeList[0].id, [Validators.required]],
      applyDepartment: [null, [Validators.required, Validators.maxLength(this.InputMaxLen.Default)]],
      section: [null, [Validators.required, Validators.maxLength(this.InputMaxLen.Default)]],
      plannerName: [null, [Validators.required, Validators.maxLength(this.InputMaxLen.Default)]],
      needDate: [null, [Validators.required]],
      receiverName: [null, [Validators.required, Validators.maxLength(this.InputMaxLen.Consignee)]],
      receiverNumber: [null, [Validators.required, Validators.maxLength(this.InputMaxLen.Default),
        this.ufastValidatorsService.mobileOrTeleValidator()]],
      receiverAddress: [null, [Validators.required, Validators.maxLength(this.InputMaxLen.ConsigneeAddr)]],
      applyName: [{value: null, disabled: true}, [Validators.required, Validators.maxLength(this.InputMaxLen.Proposer)]],
      applyDate: [{value: new Date(), disabled: true}, [Validators.required]],
    });
    if (!this.orderNo) {      //  新增
      this.isAddOrder = true;
      this.getUserInfo();
      this.getCompanyName();
    } else {
      this.getOrderDetail();
    }
  }

}
