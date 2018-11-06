import { Component, OnInit, EventEmitter, Output, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FactoryMineService, FactoryMineServiceNs } from '../../../../core/trans/factoryMine.service';
import { ShowMessageService } from '../../../../widget/show-message/show-message';

enum MaterialType {
  Material,
  SparePart,
  Equipment
}
interface MaterialInfo {
  materialCode?: string; // 物料编码
  materialType?: number; // 物料类别
  materialClassId?: string; // 物料分类
  deviceName?: string; // 设备名称
  name?: string; // 物料名称
  specificationModel?: string; // 规格型号
  unit?: string; // 计量单位
  drawingNumber?: string; // 图号
  material?: string; // 材质
  brand?: string; // 品牌
  importOrDomestic?: string; // 进口或国产
  importance?: string; // 重要程度
  materialClassification?: string; // 物资分类
  taxRate?: string; // 增值税税率
  planPrice?: string; // 计划价
  assemblyOrPart?: string; // 总成或部装
  shortDress?: string; // 允许溢短装
  divideWorkId?: string; // 分工管理
  supplyRange?: string; // 所属供应范围
  // 提前采购期
}
interface LocationType {
  name?: string;
  userId?: string;
}
@Component({
  selector: 'app-industrial-material-edit',
  templateUrl: './industrial-material-edit.component.html',
  styleUrls: ['./industrial-material-edit.component.scss']
})
export class IndustrialMaterialEditComponent implements OnInit {
  @Output() finish: EventEmitter<any>;
  @Output() ok: EventEmitter<any>;
  @Input() detailId: string;
  @ViewChild('chooseLocation') chooseLocation: TemplateRef<any>;
  materialInfo: any;
  managementModel: number;
  form: FormGroup;
  locationDataSet: {
    id: string,
    storageSpaceId: string,
    storageCode: string,
    keeperId: string,
    keeperName: string,
    isDefault: number,
    _checked: boolean,
    materialId: string
  }[];
  locationDataList: any[];
  locationFilter: LocationType;
  locationFlag: number;
  selectLocationId: string;   // 选中的储位行

  taxRate: number;
  assemblyOrPart: number;
  shortDress: number;
  placeholder: string;

  /**物料类别 */
  materialTypeList: any[];
  /**采购组 */
  purchasingGroupList: any[];
  constructor(private fb: FormBuilder,
    private messageService: ShowMessageService, private factoryMineService: FactoryMineService) {
    this.finish = new EventEmitter<any>();
    this.materialInfo = {};
    this.managementModel = 1;
    this.locationFlag = 1;
    this.locationDataSet = [
      {
        id: this.locationFlag + '',
        storageSpaceId: '',
        storageCode: '选择',
        keeperId: '',
        keeperName: '',
        isDefault: 0,
        _checked: false,
        materialId: this.detailId
      }
    ];
    this.selectLocationId = '';
    this.taxRate = 1;
    this.assemblyOrPart = 0;
    this.shortDress = 0;
    this.placeholder = '请选择储位';
    this.materialTypeList = [
      { value: '1', label: '材料' },
      { value: '2', label: '备件' },
      { value: '3', label: '设备' }
    ];
    this.purchasingGroupList = [
      { value: '1', label: '材料采购组' },
      { value: '2', label: '备件采购组' },
      { value: '3', label: '设备采购组' }
    ];
  }
  public trackByNewsId(index: number, item: any) {
    return item.id;
  }
  formatterPercent = value => `${value} %`;
  parserPercent = value => value.replace(' %', '');

  // 详情
  getItemData = () => {

    this.factoryMineService.getIndustrialMaterialDetail(this.detailId).subscribe((resData) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.materialInfo = resData.value.materialVO;
      this.form.patchValue(resData.value);
      this.managementModel = resData.value.managementMode || 0;
      this.locationDataSet = resData.value.factoryMaterialSpaceVOS;
      this.locationDataSet.forEach((item) => {
        if (item.isDefault === 1) {
          item._checked = true;
        }
      });
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  /*曾用名table相关方法*/
  addRow(): void {
    this.locationFlag++;
    this.locationDataSet = [...this.locationDataSet, {
      id: this.locationFlag + '',
      storageSpaceId: ``,
      storageCode: '选择',
      keeperId: ``,
      keeperName: ``,
      isDefault: 0,
      _checked: false,
      materialId: this.detailId
    }];
  }
  deleteRow(i: number): void {
    this.locationDataSet = this.locationDataSet.filter((item, index, array) => {
      return i !== index;
    });
  }

  refreshStatus(event, id): void {
    this.locationDataSet.forEach((item) => {
      item._checked = false;
      item.isDefault = 0;
    });
    this.locationDataSet.forEach((item) => {
      if (item.id === id) {
        item._checked = true;
        item.isDefault = 1;
      }
    });
  }
  public save() {
    let keeperNameFlag = false;
    this.form.controls['managementMode'].patchValue(this.managementModel);
    Object.keys(this.form.controls).forEach((key: string) => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
    if (this.form.invalid) {
      return;
    }
    if (this.locationDataSet.length === 0) {
      this.messageService.showToastMessage('请添加储位信息', 'warning');
      return;
    }
    this.locationDataSet.forEach((item) => {
      if (item.keeperName === '') {
        this.messageService.showToastMessage('请先选择储位', 'warning');
        keeperNameFlag = true;
        return;
      }
    });
    if (keeperNameFlag) {
      return;
    }
    const data = this.form.value;
    data.factoryMaterialSpaceVOS = this.locationDataSet;
    this.factoryMineService.industrialMaterialEdit(data)
      .subscribe((resData: FactoryMineServiceNs.UfastHttpAnyResModel) => {
        if (resData.code !== 0) {
          this.messageService.showToastMessage(resData.message, 'warning');
        }
        this.messageService.showToastMessage('操作成功', 'success');
        this.emitFinish();
      }, (error: any) => {
        this.messageService.showAlertMessage('', error.message, 'error');
      });
  }
  public emitFinish() {
    this.finish.emit();
  }
  public location(event) {
    event.forEach((item) => {
      this.locationDataSet.forEach((locationItem) => {
        if (item.code === locationItem.storageCode) {
          locationItem.keeperId = item.keeperId;
          locationItem.keeperName = item.keeperName;
          locationItem.storageSpaceId = item.id;
        }
      });
    });
  }
  ngOnInit() {
    this.form = this.fb.group({
      id: [{ value: this.detailId }],
      materialCode: [{ value: this.materialInfo.code }],
      planner: [{ value: null }, [Validators.required]],
      purchasingGroupName: [null],
      planDec: [null],
      oldCode: [null],
      managementMode: [{ value: null }, [Validators.required]]
    });
    this.getItemData();

  }

}
