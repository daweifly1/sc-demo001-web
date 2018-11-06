import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {UfastTableNs} from '../../../../layout/ufast-table/ufast-table.component';
import {FactoryMineService, FactoryMineServiceNs} from '../../../../core/trans/factoryMine.service';
import {ShowMessageService} from '../../../../widget/show-message/show-message';
import { instantiateDefaultStyleNormalizer } from '@angular/platform-browser/animations/src/providers';

interface FilterItem {
  materialName?: string;
  materialType?: string;
}

interface TabPageType {
  ManagePage: number;
  AddPage: number;
}
enum MaterialType {
    Material,
    SparePart,
    Equipment
  }

@Component({
  selector: 'app-material-edit',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.scss']
})
export class MaterialEditComponent implements OnInit {

  @Output()finish: EventEmitter<any>;
  @Input() editId: string;
  form: FormGroup;
  isSparePart: boolean;
  choosedEquipmentList: any[];
  materialClassArry: any[];
  editMaterialClassId: string;
  status: number; // 审核状态


  constructor(private fb: FormBuilder, private factoryMineService: FactoryMineService, private messageService: ShowMessageService) {
    this.finish = new EventEmitter();
    this.isSparePart = false;
    this.choosedEquipmentList = [];
    this.editMaterialClassId = '';
  }
  getDetail  = () => {
    this.factoryMineService.getMaterialDetail(this.editId).subscribe((resData) => {
      this.form.patchValue(resData.value);
      this.status = resData.value.status;
      this.editMaterialClassId = resData.value.materialClassId;
      if (this.form.value.materialType === 2) {
        this.getMaterialEquipmentList(this.editMaterialClassId);
      }
      this.form.controls['materialClassId'].patchValue(
        resData.value.firstLevel + '/' + resData.value.secondLevel + '/' + resData.value.thirdLevel);
        this.form.controls['name'].disable();
        this.form.controls['materialType'].disable();
        this.form.controls['materialClassId'].disable();
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
    this.getMaterialClass(selectedItem.option.value, selectedItem.option.children, this.isSparePart);
  }
  showMaterialClass(value) {
    if (value) {
      this.getMaterialClass('0', undefined, this.isSparePart);
    }
  }


  getMaterialClass(pId: string, materialClassArry?: any[], isSparePart?: boolean) {
    const param: { pId: string, materialType?: number } = { pId: pId };
    if (isSparePart) {
      param.materialType = MaterialType.SparePart;
    }
    this.factoryMineService.getMaterialClassListNoPage(param).subscribe((resData) => {
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
      this.getMaterialEquipmentList(this.form.value.materialClassId);
    }
  }

  getMaterialEquipmentList(id) {
    if (id instanceof Array) {
      const index = id.length;
      id = id[index - 1];
    }
    this.factoryMineService.getMaterialEquimentList(id).subscribe((resData) => {
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

  public goback() {
    this.emitFinish();
  }
  public emitFinish() {
    this.finish.emit();
  }
  public save() {

    this.form.controls['id'].patchValue(this.editId);
    Object.keys(this.form.value).forEach((item) => {
      this.form.controls[item].markAsDirty();
      this.form.controls[item].updateValueAndValidity();
    });
    if (!this.form.valid) {
      return;
    }
    const data = this.form.value;
    if (data.materialClassId instanceof Array) {
        data.firstType = data.materialClassId[0];
        data.secondType = data.materialClassId[1];
        data.thirdType = data.materialClassId[2];
        data.materialClassId = data.materialClassId[2];
    } else {
        data.materialClassId = this.editMaterialClassId;
    }
      this.factoryMineService.editMaterialReport(data).subscribe((resData: FactoryMineServiceNs.UfastHttpAnyResModel) => {
        if (resData.code !== 0) {
            this.messageService.showToastMessage(resData.message, 'warning');
        }
        this.emitFinish();
    }, (error: any) => {
        this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  ngOnInit() {

    this.form = this.fb.group({
        id: [null, Validators.required],
        // code: [null, Validators.required],
        materialType: [null, Validators.required],
        materialClassId: [null, Validators.required],
        firstType: [null, Validators.required],
        secondType: [null, Validators.required],
        thirdType: [null, Validators.required],
        name: [null, Validators.required],
        specificationModel: [null, Validators.required],
        unit: [null, Validators.required],
        drawingNumber: [null, Validators.required],
        material: [null, Validators.required],
        brand: [null, Validators.required],
        importOrDomestic: [null, Validators.required],
        importance: [null, Validators.required],
        materialClassification: [null, Validators.required],
        auditRemark: [{value: null,  disabled: true}],
        // status: [null]
    });
    this.getDetail();


  }
}
