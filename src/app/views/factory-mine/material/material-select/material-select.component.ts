import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import {UfastTableNs} from '../../../../layout/ufast-table/ufast-table.component';
import {FactoryMineService, FactoryMineServiceNs} from '../../../../core/trans/factoryMine.service';
import {ShowMessageService} from '../../../../widget/show-message/show-message';

interface FilterItem {
  materialName?: string;
  materialType?: string;
}

interface TabPageType {
  ManagePage: number;
  AddPage: number;
}
interface MaterialModelFilter {
  materialName?: string;
  materialType?: string;
  firstType?: string;
  secondType?: string;
  thirdType?: string;
  materialClassId: string;
}
@Component({
  selector: 'app-material-select',
  templateUrl: './material-select.component.html',
  styleUrls: ['./material-select.component.scss']
})
export class MaterialSelectComponent implements OnInit {
  tabPageType: TabPageType;
  materialModelConfig: UfastTableNs.TableConfig;
  materialModelList: any;
  selectData: any;
  @Output()finish: EventEmitter<any>;
  materialClassArry: any;
  materialClass: any;



  selectedPage: number;
  filters: MaterialModelFilter;
  // dataList: MaterialManageServiceNs.MaterialTempleteModel[];
  fullSearchShow: boolean;

  editItemId: string;
  @ViewChild('operation') operation: TemplateRef<any>;

  tableConfig: UfastTableNs.TableConfig;


  constructor(private factoryMineService: FactoryMineService, private messageService: ShowMessageService) {
    this.tabPageType = {
      ManagePage: 0,
      AddPage: 1,
    };
    this.selectedPage = this.tabPageType.ManagePage;
    this.selectData = [];
    this.finish = new EventEmitter();

    this.fullSearchShow = false;
    this.filters = <any>{};
    this.materialModelList = [];
    this.materialClassArry = [];
  }
  public getMaterialModelList = (pageNum?: number, pageSize?: number) => {
    Object.keys(this.filters).filter(item => typeof this.filters[item] === 'string').forEach((key: string) => {
      this.filters[key] = this.filters[key].trim();
    });
    if (this.materialClass) {
      this.filters.materialClassId = this.materialClass;
      this.filters.firstType = this.filters.materialClassId[0];
      this.filters.secondType = this.filters.materialClassId[1];
      this.filters.thirdType = this.filters.materialClassId[2];
  }
  this.filters.materialClassId = this.filters.thirdType;
    this.materialModelConfig.loading = true;
    const filter = {
      pageNum: this.materialModelConfig.pageNum || pageNum,
      pageSize: this.materialModelConfig.pageSize || pageSize,
      filters: this.filters
    };
    this.factoryMineService.getMaterialTempleteList(filter).subscribe((resData: FactoryMineServiceNs.UfastHttpAnyResModel) => {
      if (resData.code !== 0) {
        this.tableConfig.loading = false;
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.materialModelConfig.loading = false;
      this.materialModelList = resData.value.list;
      this.materialModelConfig.total = resData.value.total;
    });
  }
  showMaterialClass(value) {
    if (value) {
      this.getMaterialClass('0', undefined);
    }
  }
  selectMaterialClassItem(selectedItem) {
    if (selectedItem.option.isLeaf) {
      return;
    }
    selectedItem.option.children.shift();
    this.getMaterialClass(selectedItem.option.value, selectedItem.option.children);
  }
  getMaterialClass(pId: string, materialClassArry?: any[], ) {
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
  public isAllChoose(isAllChoose: boolean): void {
    for (let i = 0, len = this.materialModelList.length; i < len; i++) {
      this.materialModelList[i][this.materialModelConfig.checkRowField] = isAllChoose;
    }
  }
  public changeSelect(value: UfastTableNs.SelectedChange) {
    if (value.index === -1) {
      this.materialModelConfig.checkAll ? this.isAllChoose(true) : this.isAllChoose(false);
    } else {
      this.materialModelConfig.checkAll = this.materialModelList.every((item) => {
        return item._checked === true;
      });
    }
  }
  public confirm() {
    this.selectData = [];
    this.materialModelList.forEach((item) => {
      if (item._checked === true) {
        this.selectData.push(item);
      }
    });
    if (this.selectData.length > 0) {
      this.selectedPage = this.tabPageType.AddPage;

    } else {
      this.messageService.showToastMessage('请选择物料模板', 'warning');
      return;
    }
  }

  public goback() {
    this.emitFinish();
  }
  public emitFinish() {
    this.finish.emit();
  }
  public onChildPageFinish(value: boolean) {
    if (value) {
      this.emitFinish();
    } else {
      this.selectedPage = this.tabPageType.ManagePage;
    }
  }
  public fullSearch() {
    this.fullSearchShow = !this.fullSearchShow;
  }
  public advancedSearchReset() {
    Object.keys(this.filters).forEach((item: string) => {
      this.filters[item] = '';
    });
    this.materialClass = [];
  }
  public fullSearchClose() {
    this.fullSearchShow = false;
}

  ngOnInit() {
    this.materialModelConfig = {
      pageSize: 10,
      showCheckbox: true,
      checkAll: false,
      checkRowField: '_checked',
      showPagination: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageNum: 1,
      total: 0,
      loading: false,
      headers: [
      { title: '物料类别', field: 'materialType', width: 150, pipe: 'materialType2' },
      { title: '一级分类', field: 'firstLevel', width: 140 },
      { title: '二级分类', field: 'secondLevel', width: 100 },
      { title: '三级分类', field: 'thirdLevel', width: 100 },
      { title: '物料名称', field: 'materialName', width: 150 },
      { title: '单位', field: 'unit', width: 150 }

      ]
    };
    this.getMaterialModelList();
  }
}
