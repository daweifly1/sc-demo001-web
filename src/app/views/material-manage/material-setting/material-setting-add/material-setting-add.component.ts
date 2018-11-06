import { Component, OnInit, EventEmitter, Output, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialManageService, MaterialManageServiceNs } from '../../../../core/trans/materialManage.service';
import { ShowMessageService } from '../../../../widget/show-message/show-message';
import { InvoiceService, InvoiceServiceNs } from '../../../../core/trans/invoice.service';
import { UfastTableNs } from '../../../../layout/layout.module';
interface DivideWorkId {
  id: number;
  name: string;
}
interface SupplyRange {
  id: number;
  name: string;
}
enum MaterialType {
  Material,
  SparePart,
  Equipment
}
enum MaxLenInputEnum {
  Default = 50,
  Large = 100
}
@Component({
  selector: 'app-material-setting-add',
  templateUrl: './material-setting-add.component.html',
  styleUrls: ['./material-setting-add.component.scss']
})
export class MaterialSettingAddComponent implements OnInit {
  maxLenInputEnum = MaxLenInputEnum;
  @Output() finish: EventEmitter<any>;
  @Input() editId: string;
  @Input() selectMaterial: any;
  form: FormGroup;
  supplyRangeType: SupplyRange[];
  divideWorkId: DivideWorkId[];
  taxCodeDateList: any[];
  taxRate: number;
  assemblyOrPart: number;
  shortDress: number;
  materialClassId: any;
  materialClassArry: any[];
  selectClassIdArry: string[];
  isSparePart: boolean;
  choosedEquipmentList: any[];
  editMaterialClassId: string;
  unitType: any[];
  /**
   * 选择设备型号
   */
  isVisible: boolean;
  deviceModelTableConfig: UfastTableNs.TableConfig;
  deviceModelDataList: any[];
  @ViewChild('chooseDeviceModel') chooseDeviceModel: TemplateRef<any>;
  constructor(private fb: FormBuilder,
    private messageService: ShowMessageService, private materialManageService: MaterialManageService,
    private invoiceService: InvoiceService) {
    this.finish = new EventEmitter<any>();
    this.divideWorkId = [
      { id: 1, name: '风机' },
      { id: 2, name: '空压机' },
      { id: 3, name: '汞' },
      { id: 4, name: '阀' },
      { id: 5, name: '铲运机' }
    ];
    this.supplyRangeType = [
      { id: 1, name: '风机' },
      { id: 2, name: '空压机' },
      { id: 3, name: '汞' },
      { id: 4, name: '阀' },
      { id: 5, name: '铲运机' }
    ];
    this.taxRate = 1;
    this.taxCodeDateList = [];
    this.assemblyOrPart = 0;
    this.shortDress = 0;
    this.materialClassId = [];
    this.selectClassIdArry = [];
    this.isSparePart = false;
    this.choosedEquipmentList = [];
    this.editMaterialClassId = '';
    this.isVisible = false;
    this.deviceModelDataList = [];
  }
  private getTaxCodeList() {
    this.invoiceService.getTaxCode().subscribe((resData: InvoiceServiceNs.UfastHttpResT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.taxCodeDateList = resData.value;
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  public trackByNewsId(index: number, item: any) {
    return item.id;
  }
  formatterPercent = value => `${value} %`;
  parserPercent = value => value.replace(' %', '');


  getFormControl(name) {
    return this.form.controls[name];
  }

  isSelectedThirdClass(control: FormControl): any {
    if (!control.value) {
      return true;
    }
    return (control.value.length < 3) ? { isSelectedThird: true } : null;
  }

  selectMaterialClassItem(selectedItem) {
    if (selectedItem.option.isLeaf) {
      return;
    }
    selectedItem.option.children.shift();
    this.getMaterialClass(selectedItem.option.value, selectedItem.option.children, this.isSparePart);
  }


  showMaterialClass(value) {
    if (value) {
      this.getMaterialClass('0', undefined, this.isSparePart);
    }
  }


  getMaterialClass(pId?: string, materialClassArry?: any[], isSparePart?: boolean) {
    const param: { pId: string, materialType?: number } = { pId: pId };
    if (this.form.value['materialType'] === 1) {
      param.materialType = 0;
    } else {
      param.materialType = 1;
    }
    // if (isSparePart) {
    //   param.materialType = MaterialType.SparePart;
    // }
    this.materialManageService.getMaterialClassListNoPage(param).subscribe((resData) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      const tempList = materialClassArry || [];
      resData.value.forEach((item) => {
        const materialClassObj: any = {};
        materialClassObj.value = item.id;
        materialClassObj.label = item.materialCalssName;
        if (item.childCount < 1) {
          materialClassObj.isLeaf = true;
        } else {
          materialClassObj.children = [{}];
        }
        tempList.push(materialClassObj);
      });
      if (!materialClassArry) {
        this.materialClassArry = tempList;
      }
    });
  }


  public onChanges(values: any): void {
    if (this.form.value.materialType === 2) {
      this.isSparePart = true;
    }
    if (this.isSparePart) {
      if (values.length !== 3) {
        return;
      }
      this.getMaterialEquipmentList(values);
    }
  }

  getMaterialEquipmentList(id) {
    this.choosedEquipmentList = [];
    const data = <any>{};
    if (id instanceof Array) {
      data.firstType = id[0];
      data.secondType = id[1];
      data.thirdType = id[2];
    }
    data.materialType = '3';
    this.materialManageService.getMaterialEquimentList(data).subscribe((resData) => {
      const tempArray = resData.value;
      for (let i = 0, len = tempArray.length; i < len; i++) {
        this.choosedEquipmentList = [...this.choosedEquipmentList, { label: tempArray[i].materialName, value: tempArray[i].id }];
      }
    });
  }

  changeMaterialType(value: MaterialType) {
    if (value === MaterialType.SparePart) {
      this.form.patchValue({
        'materialClassId': null
      });
      this.isSparePart = true;
    } else {
      this.isSparePart = false;
    }
  }


  getItemData = () => {
    this.materialManageService.getMaterialSettingItem(this.editId).subscribe((resData) => {
      this.form.patchValue(resData.value);
      this.form.controls['deviceModel'].patchValue(resData.value.deviceModel);
      this.form.controls['deviceId'].patchValue(resData.value.deviceId);
      this.editMaterialClassId = resData.value.thirdType;
      this.form.controls['supplyRange'].patchValue(resData.value.supplyRange);
      if (this.form.value.materialType === 2) {
        this.getMaterialEquipmentList({
          firstType: resData.value.firstType,
          secondType: resData.value.secondType,
          thirdType: resData.value.thirdType,
        });
      }
      this.form.controls['materialClassId'].patchValue(
        resData.value.firstLevel + '/' + resData.value.secondLevel + '/' + resData.value.thirdLevel);
      this.taxRate = resData.value.taxRate || 1;
      this.assemblyOrPart = resData.value.assemblyOrPart || 0;
      this.shortDress = resData.value.shortDress || 0;
    });
    this.form.controls['code'].disable();
    this.form.controls['materialType'].disable();
    this.form.controls['materialClassId'].disable();
    this.form.controls['name'].disable();
    this.form.controls['deviceId'].disable();
    this.form.controls['unit'].disable();
    const data = {
      firstType: this.form.value.firstType,
      secondType: this.form.value.secondType,
      thirdType: this.form.value.thirdType
    };
    this.getMaterialEquipmentList(data);

  }

  public emitFinish(value) {
    this.finish.emit(value);
  }
  public save() {
    if (this.form.controls['materialType'].value !== 2) {
      this.form.removeControl('deviceId');
      this.form.removeControl('deviceModel');
    }

    this.form.controls['taxRate'].patchValue(this.taxRate);
    this.form.controls['assemblyOrPart'].patchValue(this.assemblyOrPart);
    this.form.controls['shortDress'].patchValue(this.shortDress);
    Object.keys(this.form.controls).forEach((item) => {
      this.form.controls[item].markAsDirty();
      this.form.controls[item].updateValueAndValidity();
    });
    if (!this.form.valid) {
      return;
    }
    if (this.selectMaterial) {
      if (this.form.value.materialClassId instanceof Array) {
        this.form.value.materialClassId.pop();
      } else {
        this.form.value.materialClassId = this.selectMaterial[0].materialClassId;
      }
    }
    const data = this.form.getRawValue();
    const firstLevelList = data.materialClassId.split('/');
    data.firstLevel = firstLevelList[0];
    data.secondLevel = firstLevelList[1];
    data.thirdLevel = firstLevelList[2];
    if (data.materialClassId instanceof Array) {
      data.firstType = data.materialClassId[0];
      data.secondType = data.materialClassId[1];
      data.thirdType = data.materialClassId[2];
      data.materialClassId = data.materialClassId[data.materialClassId.length - 1];
    } else {
      data.materialClassId = this.editMaterialClassId;
    }
    let submit = null;
    if (this.editId) {
      // this.form.value.id = this.editId;
      data.id = this.editId;
      submit = this.materialManageService.updateMaterialSetting(data);
    } else {
      submit = this.materialManageService.addMaterialSetting(data);
    }
    this.messageService.showLoading();
    submit.subscribe((resData: MaterialManageServiceNs.UfastHttpAnyResModel) => {
      this.messageService.closeLoading();
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.messageService.showToastMessage('操作成功', 'success');
      this.emitFinish(true);
    }, (error: any) => {
      this.messageService.closeLoading();
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  showDeviceModelModal(): void {
    this.isVisible = true;
    this.getDeviceModelData();
  }
  getDeviceModelData = () => {
    const filter = {
      pageNum: this.deviceModelTableConfig.pageNum,
      pageSize: this.deviceModelTableConfig.pageSize,
      filters: {
        materialId: this.form.controls['deviceId'].value
      }
    };
    this.materialManageService.getUnitType(filter).subscribe((resData: MaterialManageServiceNs.UfastHttpAnyResModel) => {
      if (resData.code !== 0) {
        this.messageService.showToastMessage(resData.message, 'warning');
      }
      this.deviceModelDataList = resData.value.list;
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  handleCancel(): void {
    this.isVisible = false;
}
chooseDeviceModelFun(item: any) {
  this.form.controls['deviceModel'].patchValue(item);
  this.handleCancel();
}
  ngOnInit() {
    this.form = this.fb.group({
      code: [{ value: '系统生成', disabled: true }, [Validators.required]],
      materialType: [null, Validators.required],
      materialClassId: [null, [Validators.required, this.isSelectedThirdClass]],
      firstType: [null],
      secondType: [null],
      thirdType: [null],
      name: [null, Validators.required],
      specificationModel: [null, Validators.required],
      unit: [null, Validators.required],
      drawingNumber: [null, Validators.required],
      material: [null, Validators.required],
      brand: [null, Validators.required],
      importOrDomestic: [null, Validators.required],
      importance: [null, Validators.required],
      materialClassification: [null, Validators.required],
      taxRate: [null, Validators.required],
      planPrice: [null, Validators.required],
      assemblyOrPart: [this.assemblyOrPart, Validators.required],
      shortDress: [this.shortDress, Validators.required],
      divideWorkId: [null, Validators.required],
      supplyRange: [null, Validators.required],
      deviceId: [null, Validators.required],
      deviceModel: [null, Validators.required]
    });
    if (this.editId !== undefined) {
      this.getItemData();
    }
    // this.getTaxCodeList();
    if (this.selectMaterial) {
      this.form.patchValue(this.selectMaterial[0]);
      this.form.controls['materialType'].disable();
      this.form.controls['materialClassId'].patchValue(
        this.selectMaterial[0].firstLevel + '/' + this.selectMaterial[0].secondLevel + '/' + this.selectMaterial[0].thirdLevel);
      this.form.controls['name'].patchValue(this.selectMaterial[0].materialName);
      this.form.controls['materialClassId'].disable();
      this.form.controls['name'].disable();
      this.form.controls['specificationModel'].patchValue(this.selectMaterial[0].modelSpecification);
      this.form.controls['deviceId'].patchValue(this.selectMaterial[0].deviceTemplateId);
      this.form.controls['deviceId'].disable();
      this.form.controls['unit'].disable();
      this.getMaterialClass();
      const data = [];
      data[0] = this.selectMaterial[0].firstType;
      data[1] = this.selectMaterial[0].secondType;
      data[2] = this.selectMaterial[0].thirdType;
      this.getMaterialEquipmentList(data);

    }
    this.deviceModelTableConfig = {
      pageNum: 1,
      pageSize: 10,
      yScroll: 100,
      showCheckbox: false,
      showPagination: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      total: 0,
      loading: false,
      headers: [{ title: '设备型号', field: 'modelName', width: 100 },
      { title: '操作', tdTemplate: this.chooseDeviceModel, width: 60 }
      ]
    };
  }

}
