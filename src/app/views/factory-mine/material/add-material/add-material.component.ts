import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UfastTableNs } from '../../../../layout/ufast-table/ufast-table.component';
import { ShowMessageService } from '../../../../widget/show-message/show-message';
import { FactoryMineService, FactoryMineServiceNs } from '../../../../core/trans/factoryMine.service';
import { Observable } from 'rxjs/Observable';
import { isTemplateRef } from 'ng-zorro-antd/src/core/util/check';

interface TabPageType {
  ManagePage: number;
  NameMatchPage: number;
}
enum MaxLenInputEnum {
  Default = 50
}
@Component({
  selector: 'app-material-add',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class MaterialAddComponent implements OnInit {
  maxLenInputEnum = MaxLenInputEnum;
  tabPageType: TabPageType;
  selectedPage: number;
  @Output() finish: EventEmitter<any>;
  @Output() materialName: string;
  @Input() materialInfo: any;
  beforeNameIndex: number;
  beforeNameDataSet: {
    id?: string;
    materialDesc?: string;
    materialType?: string;
    firstLevel?: string;
    secondLevel?: string;
    thirdLevel?: string;
    firstType?: string;
    secondType?: string;
    thirdType?: string;
    name?: string;
    formerNameArray?: any;
    formerName?: string; // 曾用名
    unit?: string;
    deviceName?: string; // 主机名称
    deviceModel?: string; // 主机型号
    originalSpecificationModel?: string; // 型号规格规范
    specificationModel?: string; // 型号规格
    drawingNumber?: string; // 图号
    material?: string; // 材质
    brand?: string; // 品牌
    importOrDomestic?: string; // 进口国产,下拉框
    importance?: string; // 重要度，下拉框
    materialClassification?: string; // 物资分类，下拉框
    assemblyOrPart?: string; // 总成
    _checked?: boolean;
  }[];
  unitType: any;
  tableConfig: {
    materialDesc: string;
    materialType: string;
    typeName: string;
    name: string;
    formerName: string; // 曾用名
    unit: string;
    deviceName: string; // 主机名称
    deviceModel: string; // 主机型号
    specificationModel: string; // 型号规格
    drawingNumber: string; // 图号
    material: string; // 材质
    brand: string; // 品牌
    importOrDomestic: string; // 进口国产,下拉框
    importance: string; // 重要度，下拉框
    materialClassification: string; // 物资分类，下拉框
    assemblyOrPart: string; // 总成
    _checked: boolean;
  };
  allChecked = false;
  indeterminate = false;
  flag: number;

  constructor(private factoryMinService: FactoryMineService, private messageService: ShowMessageService) {
    this.tabPageType = {
      ManagePage: 0,
      NameMatchPage: 1
    };
    this.selectedPage = this.tabPageType.ManagePage;
    this.finish = new EventEmitter<any>();
    this.beforeNameIndex = 1;
    this.unitType = [];
    this.flag = 1;
    this.tableConfig = <any>{};
    this.beforeNameDataSet = <any>[];
  }
  getUnitType = (id) => {
    const filter = {
      materialId: id
    };
    this.factoryMinService.getUnitType(filter).subscribe((resData: FactoryMineServiceNs.UfastHttpAnyResModel) => {
      if (resData.code !== 0) {
        this.messageService.showToastMessage(resData.message, 'warning');
      }
      this.unitType = resData.value.list;
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  getData = () => {
    this.materialInfo.forEach((item) => {
      if (item['materialType'] === 2) {
        this.beforeNameDataSet = [...this.beforeNameDataSet, {
          id: item['id'],
          materialDesc: item['materialName'] + '|' + item['unit'] + '|' + (item['modelSpecification'] || ''),
          materialType: item['materialType'],
          firstLevel: item['firstLevel'],
          secondLevel: item['secondLevel'],
          thirdLevel: item['thirdLevel'],
          firstType: item['firstType'],
          secondType: item['secondType'],
          thirdType: item['thirdType'],
          name: item['materialName'],
          formerNameArray: item['materialUserdNamesVOS'],
          formerName: ``,
          unit: item['unit'],
          deviceName: item['deviceTemplateVO']['materialName'],
          deviceModel: ``,
          originalSpecificationModel: item['modelSpecification'] || '',
          specificationModel: item['modelSpecification'] || '',
          drawingNumber: ``,
          material: ``,
          brand: ``,
          importOrDomestic: ``,
          importance: ``,
          materialClassification: ``,
          assemblyOrPart: ``,
          _checked: false
        }];
      } else {
        this.beforeNameDataSet = [...this.beforeNameDataSet, {
          id: item['id'],
          materialDesc: item['materialName'] + '-' + item['unit'] + '-' + item['modelSpecification'],
          materialType: item['materialType'],
          firstLevel: item['firstLevel'],
          secondLevel: item['secondLevel'],
          thirdLevel: item['thirdLevel'],
          firstType: item['firstType'],
          secondType: item['secondType'],
          thirdType: item['thirdType'],
          name: item['materialName'],
          formerNameArray: item['materialUserdNamesVOS'].materialTemplateUsedName,
          formerName: ``,
          unit: item['unit'],
          originalSpecificationModel: item['modelSpecification'],
          specificationModel: item['modelSpecification'],
          drawingNumber: ``,
          material: ``,
          brand: ``,
          importOrDomestic: ``,
          importance: ``,
          materialClassification: ``,
          assemblyOrPart: ``,
          _checked: false
        }];
      }
    });

  }

  // table相关方法
  addRow(): void {
    this.beforeNameIndex++;
    this.beforeNameDataSet = [...this.beforeNameDataSet, {
      id: this.flag + '',
      materialDesc: ``,
      materialType: ``,
      firstLevel: ``,
      secondLevel: ``,
      thirdLevel: ``,
      firstType: ``,
      secondType: ``,
      thirdType: ``,
      name: `选择`,
      formerNameArray: ``,
      formerName: ``,
      unit: ``,
      deviceName: ``,
      deviceModel: ``,
      originalSpecificationModel: ``,
      specificationModel: ``,
      drawingNumber: ``,
      material: ``,
      brand: ``,
      importOrDomestic: ``,
      importance: ``,
      materialClassification: ``,
      assemblyOrPart: ``,
      _checked: false
    }];
    this.flag++;
  }

  deleteRow(i: number): void {
    this.beforeNameDataSet = this.beforeNameDataSet.filter((item, index, array) => {
      return i !== index;
    });
  }
  public deleteBranch() {
    const selectData = [];
    this.beforeNameDataSet.forEach((item) => {
      if (item._checked === true) {
        selectData.push(item);
      }
    });
    if (selectData.length === 0) {
      this.messageService.showToastMessage('请选择要删除的数据', 'warning');
      return;
    }
    selectData.forEach((item) => {
      this.beforeNameDataSet = this.beforeNameDataSet.filter((value) => {
        return value.id !== item.id;
      });
    });
  }


  refreshStatus(): void {
    this.allChecked = this.beforeNameDataSet.every((item) => {
      return item._checked === true;
    });
  }

  checkAll(value: boolean): void {
    this.checkAll ? this.isAllChoose(true) : this.isAllChoose(false);
    this.beforeNameDataSet.forEach(data => data._checked = value);
    this.refreshStatus();
  }

  public isAllChoose(isAllChoose: boolean): void {
    for (let i = 0, len = this.beforeNameDataSet.length; i < len; i++) {
      this.beforeNameDataSet[i]._checked = isAllChoose;
    }
  }



  public goback(value) {
    this.emitFinish(value);
  }
  public emitFinish(value) {
    this.finish.emit(value);

  }
  public onChildPageFinish() {
    this.selectedPage = this.tabPageType.ManagePage;
  }
  public nameMatch(name: string) {
    if (name === '选择') {
      this.messageService.showToastMessage('请选择物料名称', 'warning');
      return;
    }
    this.materialName = name;
    this.selectedPage = this.tabPageType.NameMatchPage;
  }
  public handInBatch() {
    const selectData = [];
    this.beforeNameDataSet.forEach((item) => {
      if (item._checked === true) {
        selectData.push(item);
      }
    });
    if (selectData.length === 0) {
      this.messageService.showToastMessage('请选择要提报的数据', 'warning');
      return;
    }
    let nameFlag = false;
    selectData.forEach((item) => {
      if (item.name === '选择') {
        this.messageService.showToastMessage('请先选择物料名称', 'warning');
        nameFlag = true;
        return;
      }
      item.materialDesc = item.name + '-'
        + item.unit + '-' + item.specificationModel + '-' + item.material + '-' + item.brand;

    });
    if (nameFlag) {
      return;
    }
    this.factoryMinService.batchAddMaterialReport(selectData).subscribe((resData: FactoryMineServiceNs.UfastHttpAnyResModel) => {
      if (resData.code !== 0) {
        this.messageService.showToastMessage(resData.message, 'warning');
      }
      this.emitFinish(true);
      this.messageService.showToastMessage('操作成功', 'success');
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  public handIn(id: string) {
    if (id.length === 0) {
      this.messageService.showToastMessage('请选择物料名称', 'warning');
      return;
    }
    let data = {};
    this.beforeNameDataSet.forEach((item) => {
      if (item.id === id) {
        data = item;
      }
    });
    if (data['name'] === '选择') {
      this.messageService.showToastMessage('请选择物料名称', 'warning');
      return;
    }
    if (data['materialType'] !== 2) {
      data['deviceName'] = '';
      data['deviceModel'] = '';
    }
    data['materialDesc'] = data['name'] + '|'
      + data['deviceName'] + '|' + data['deviceModel'] + '|' + data['specificationModel'] + '|'
      + data['drawingNumber'] + '|' + data['material'] + '|' + data['importOrDomestic'] + '|' + data['brand'];
    this.factoryMinService.addMaterialReport(data).subscribe((resData: FactoryMineServiceNs.UfastHttpAnyResModel) => {
      if (resData.code !== 0) {
        this.messageService.showToastMessage(resData.message, 'warning');
      }
      this.emitFinish(true);
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }


  ngOnInit(): void {
    this.getData();
  }
}
