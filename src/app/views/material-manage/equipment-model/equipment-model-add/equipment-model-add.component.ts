import { Component, OnInit, EventEmitter, Output, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgModel } from '@angular/forms';
import { MaterialManageService, MaterialManageServiceNs } from '../../../../core/trans/materialManage.service';
import { ShowMessageService } from '../../../../widget/show-message/show-message';
import { Observable } from 'rxjs/Observable';
import { retry } from 'rxjs/operators';
import { UfastTableNs } from '../../../../layout/layout.module';
@Component({
  selector: 'app-equipment-model-add',
  templateUrl: './equipment-model-add.component.html',
  styleUrls: ['./equipment-model-add.component.scss']
})
export class EquipmentModelAddComponent implements OnInit {
  @Output() finish: EventEmitter<any>;
  form: FormGroup;
  materialClassArry: any[];
  equipmentTableData: {
    deviceModel: string;
  }[];
  beforeIndex: number;
  materialList: any;
  modelNameItem: any;
  isVisible: boolean;
  deviceNameTableConfig: UfastTableNs.TableConfig;
  @ViewChild('chooseDeviceName') chooseDeviceName: TemplateRef<any>;
  deviceNameDataList: any[] = [];
  deviceType: any[] = [];
  constructor(private fb: FormBuilder, private materialManageService: MaterialManageService,
    private messageService: ShowMessageService) {
    this.finish = new EventEmitter<any>();
    this.materialClassArry = [];
    this.equipmentTableData = [
      {
        deviceModel: ''
      }
    ];
    this.beforeIndex = 1;
    this.materialList = [];
    this.modelNameItem = {};
  }
  public emitFinish() {
    this.finish.emit();
  }

  addRow(): void {
    this.beforeIndex++;
    this.equipmentTableData = [...this.equipmentTableData, {
      deviceModel: ``
    }];
  }

  deleteRow(i: number): void {
    this.equipmentTableData = this.equipmentTableData.filter((item, index, array) => {
      return i !== index;
    });
  }


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
    this.getMaterialClass(selectedItem.option.value, selectedItem.option.children);
  }


  showMaterialClass(value) {
    if (value) {
      this.getMaterialClass('0', undefined);
    }
  }


  getMaterialClass(pId: string, materialClassArry?: any[], isSparePart?: boolean) {
    const param: { pId: string, materialType?: number } = { pId: pId };
    let data = {};
    data = {
      pId: pId,
      materialType: 1
    };
    this.materialManageService.getMaterialClassListNoPage(data).subscribe((resData) => {
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


  public changes(event) {
    if (event) {
      this.materialName(event);
      this.deviceType = event;
    }
  }

  public materialName(materialClassId) {
    const data = {
      firstType: materialClassId[0],
      secondType: materialClassId[1],
      thirdType: materialClassId[2],
      materialType: 3
    };
    this.materialManageService.getMaterialNameList(data).subscribe((resData) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
      }
      this.materialList = resData.value;

    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  public trackByNewsId(index: number, item: any) {
    return item.id;
  }
  showDeviceName(): void {
    if (this.form.controls['materialClass'].invalid) {
      this.messageService.showToastMessage('请先选择设备分类', 'warning');
      return;
    }
    this.isVisible = true;
    this.getDeviceNameData();
  }
  getDeviceNameData = (pageNum?: number, pageSize?: number) => {
    const filter = {
      pageNum: pageNum || this.deviceNameTableConfig.pageNum,
      pageSize: pageSize || this.deviceNameTableConfig.pageSize,
      filters: {
        firstType: this.deviceType[0],
        secondType: this.deviceType[1],
        thirdType: this.deviceType[2],
        materialType: 3
      }
    };
    this.materialManageService.getMaterialTempleteList(filter).subscribe((resData) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
      }
      this.deviceNameDataList = resData.value.list;

    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  public chooseDeviceNameFun(name: string, id: string) {
    this.form.patchValue({
      materialName: name,
      materialId: id
    });
    this.handleCancel();
  }

  public save() {
    Object.keys(this.form.controls).forEach((item) => {
      this.form.controls[item].markAsDirty();
      this.form.controls[item].updateValueAndValidity();
    });
    if (!this.form.valid) {
      return;
    }
    let flag = 0;
    this.equipmentTableData.forEach((item) => {
      if (item.deviceModel === '') {
        flag = 1;
        return;
      }
    });
    if (flag) {
      this.messageService.showToastMessage('设备型号不能为空', 'warning');
      return;
    }

    const materialNames = [];
    this.equipmentTableData.forEach((item) => {
      materialNames.push(item.deviceModel);
    });
    const data = {
      firstType: this.form.value.materialClass[0],
      secondType: this.form.value.materialClass[1],
      thirdType: this.form.value.materialClass[2],
      materialId: this.form.value.materialId,
      modelNames: materialNames,
    };
    this.messageService.showLoading();
    this.materialManageService.addEquipmentModel(data).subscribe((resData: MaterialManageServiceNs.UfastHttpAnyResModel) => {
      this.messageService.closeLoading();
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.emitFinish();
    }, (error: any) => {
      this.messageService.closeLoading();
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      materialClass: [null, [Validators.required, this.isSelectedThirdClass]],
      materialName: [null, [Validators.required]],
      materialId: [null, [Validators.required]]
    });
    this.deviceNameTableConfig = {
      pageNum: 1,
      pageSize: 10,
      yScroll: 100,
      showCheckbox: false,
      showPagination: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      total: 0,
      loading: false,
      headers: [
      { title: '设备名称', field: 'materialName', width: 150 },
      { title: '操作', tdTemplate: this.chooseDeviceName, width: 60 }
      ]
    };
  }

}
