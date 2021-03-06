import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { UfastTableNs } from '../../../layout/ufast-table/ufast-table.component';
import { FactoryMineService, FactoryMineServiceNs } from '../../../core/trans/factoryMine.service';
import { ShowMessageService } from '../../../widget/show-message/show-message';
import { ActionCode } from '../../../../environments/actionCode';
import { Observable } from 'rxjs/Observable';
interface TabPageType {
  ManagePage: number;
  EditPage: number;
  DetailPage: number;
}
interface FilterModel {
  name?: string;  // 物料名称
  code?: string;  // 物料编码
  materialType?: string; // 类别
  // 物料分类
  firstType?: string;
  secondType?: string;
  thirdType?: string;
  drawingNumber?: string; // 图号
  material?: string;      // 材质
  brand?: string; // 品牌
  unit?: string;  // 单位
}
interface ButtonState {
  edit: boolean;
  freeze: boolean;
  thaw: boolean;
}
enum IsDelete {
  Freeze,
  Thaw
}
@Component({
  selector: 'app-industrial-material',
  templateUrl: './industrial-material.component.html',
  styleUrls: ['./industrial-material.component.scss']
})
export class IndustrialMaterialComponent implements OnInit {
  @Output() finish: EventEmitter<any>;
  tabPageType: TabPageType;
  selectedPage: number;
  materialList: any;
  filters: FilterModel;
  tableConfig: UfastTableNs.TableConfig;
  fullSearchShow: boolean;
  @ViewChild('operation') operation: TemplateRef<any>;
  @ViewChild('codeTpl') codeTpl: TemplateRef<any>;
  @ViewChild('nameTpl') nameTpl: TemplateRef<any>;

  isSparePart: boolean;
  materialClassArry: any[];
  choosedEquipmentList: any[];
  editItemId: string;
  materialClassId: any;

  values: any[] = null;
  buttonState: { [index: string]: ButtonState };
  ActionCode = ActionCode;
  /**物料类别 */
  materialTypeList: any[];
  /**单位 */
  unitList: any[];
  constructor(private factoryMineService: FactoryMineService, private messageService: ShowMessageService) {
    this.tabPageType = {
      ManagePage: 0,
      EditPage: 1,
      DetailPage: 2,
    };
    this.selectedPage = this.tabPageType.ManagePage;
    this.materialList = [];
    this.fullSearchShow = false;
    this.filters = {};
    this.editItemId = '';
    this.materialClassId = [];
    this.buttonState = {};
    this.materialTypeList = [
      { value: '1', label: '材料' },
      { value: '2', label: '备件' },
      { value: '3', label: '设备' }
    ];
    this.unitList = [
      { value: '吨', label: '吨' },
      { value: '件', label: '件' },
      { value: '个', label: '个' }
    ];
  }

  public fullSearch() {
    this.fullSearchShow = !this.fullSearchShow;
  }

  public fullSearchClose() {
    this.fullSearchShow = false;
  }

  public advanceSearchReset() {
    Object.keys(this.filters).forEach((item: string) => {
      this.filters[item] = '';
    });
    this.materialClassId = [];
    this.getDataList();
  }
  public getDataList = (pageNum?: number, pageSize?: number) => {
    this.tableConfig.loading = true;
    this.materialList = [];
    Object.keys(this.filters).filter(item => typeof this.filters[item] === 'string').forEach((key: string) => {
      this.filters[key] = this.filters[key].trim();
    });
    if (this.materialClassId.lenth !== 0) {
      this.filters.firstType = this.materialClassId[0];
      this.filters.secondType = this.materialClassId[1];
      this.filters.thirdType = this.materialClassId[2];
    }
    const filter = {
      pageNum: this.tableConfig.pageNum || pageNum,
      pageSize: this.tableConfig.pageSize || pageSize,
      filters: this.filters
    };
    this.factoryMineService.getMaterialList(filter).subscribe((resData: FactoryMineServiceNs.UfastHttpAnyResModel) => {
      this.tableConfig.loading = false;
      if (resData.code !== 0) {
        this.tableConfig.loading = false;
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      resData.value.list.forEach((item) => {
        let temp = <any>{};
        temp = item.materialVO;
        temp['materialCode'] = item.materialVO['code'];
        temp['isFreeze'] = Number(((item.freeze !== 1) && (item.materialVO['isDelete'] === 1)) ||
          ((item.freeze === 1) && (item.materialVO['isDelete'] === 1)) ||
          ((item.freeze === 1) && (item.materialVO['isDelete'] === 0)));
        this.materialList.push(temp);
        this.tableConfig.total = resData.value.total;
      });
      this.materialList.forEach((item) => {
        this.buttonState[item.id] = {
          edit: item.isFreeze === FactoryMineServiceNs.MaterialStatus.Normal,
          freeze: item.isFreeze === FactoryMineServiceNs.MaterialStatus.Normal,
          thaw: item.isFreeze === FactoryMineServiceNs.MaterialStatus.Thaw
        };
      });
    }, (error) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  public onChildPageFinish() {
    this.selectedPage = this.tabPageType.ManagePage;
    this.getDataList();
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


  getMaterialClass(pId: string, materialClassArry?: any[]) {
    const param: { pId: string, materialType?: number } = { pId: pId };
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

  public detail(id) {
    this.editItemId = id;
    this.selectedPage = this.tabPageType.DetailPage;
  }
  public update(id) {
    this.editItemId = id;
    this.selectedPage = this.tabPageType.EditPage;
  }

  // 弹框提示
  private commonResDeal(observer: Observable<any>, refresh: boolean = false) {
    observer.subscribe((resData: FactoryMineServiceNs.UfastHttpAnyResModel) => {
      if (resData.code === 0) {
        this.messageService.showToastMessage('操作成功', 'success');
        if (refresh) {
          this.getDataList();
        }
      } else {
        this.messageService.showToastMessage(resData.message, 'warning');
      }
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  // 冻结
  public freeze(id) {
    this.messageService.showAlertMessage('', '确定要冻结此物料吗?', 'confirm').afterClose.subscribe((type: string) => {
      if (type !== 'onOk') {
        return;
      }
      this.commonResDeal(this.factoryMineService.freeze(id), true);
    });
  }

  // 解冻
  public thaw(id) {
    this.messageService.showAlertMessage('', '确定要解冻此物料吗?', 'confirm').afterClose.subscribe((type: string) => {
      if (type !== 'onOk') {
        return;
      }
      this.commonResDeal(this.factoryMineService.thaw(id), true);
    });
  }



  ngOnInit() {
    this.tableConfig = {
      pageSize: 10,
      showCheckbox: false,
      showPagination: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageNum: 1,
      total: 0,
      loading: false,
      headers: [{ title: '操作', tdTemplate: this.operation, width: 150, fixed: true },
      { title: '物料编码', tdTemplate: this.codeTpl, width: 180 },
      { title: '物料名称', tdTemplate: this.nameTpl, width: 300 },
      { title: '物料类别', field: 'materialType', width: 150, pipe: 'materialType2' },
      { title: '一级分类', field: 'firstLevel', width: 150 },
      { title: '二级分类', field: 'secondLevel', width: 150 },
      { title: '三级分类', field: 'thirdLevel', width: 150 },
      { title: '单位', field: 'unit', width: 150 },
      { title: '状态', field: 'isFreeze', width: 150, pipe: 'factoryMineStatus' },
      { title: '型号规格', field: 'specificationModel', width: 150 },
      { title: '图号', field: 'drawingNumber', width: 150 },
      { title: '材质', field: 'material', width: 150 },
      { title: '品牌', field: 'brand', width: 150 },
      { title: '进口/国产', field: 'importOrDomestic', width: 150 },
      { title: '物资分类', field: 'materialClassification', width: 150 }
      ]
    };
    this.getDataList();
  }

}
