import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UfastTableNs } from '../../../layout/ufast-table/ufast-table.component';
import { MaterialManageService, MaterialManageServiceNs } from '../../../core/trans/materialManage.service';
import { ShowMessageService } from '../../../widget/show-message/show-message';
import { ActionCode} from '../../../../environments/actionCode';
interface FilterItem {
  materialName?: string;
  materialType?: string;
  firstType?: string;
  secondType?: string;
  thirdType?: string;
}

enum TabPageType {
  ManagePage,
  AddPage,
  EditPage,
  DetailPage
}

@Component({
  selector: 'app-material-model',
  templateUrl: './material-model.component.html',
  styleUrls: ['./material-model.component.scss']
})
export class MaterialModelComponent implements OnInit {
  selectedPage: TabPageType;
  filters: FilterItem;
  dataList: MaterialManageServiceNs.MaterialTempleteModel[];
  fullSearchShow: boolean;
  searchPlaceholder: string;
  editItemId: string;
  @ViewChild('operation') operation: TemplateRef<any>;

  tableConfig: UfastTableNs.TableConfig;
  materialClassArry: any;
  materialClass: any;
  ActionCode = ActionCode;

  constructor(private materialManageService: MaterialManageService, private messageService: ShowMessageService) {
    this.selectedPage = TabPageType.ManagePage;
    this.dataList = [];
    this.searchPlaceholder = '物料名称';
    this.fullSearchShow = false;
    this.filters = {};
    this.materialClassArry = [];
  }

  showMaterialClass(value) {
    if (value) {
      this.getMaterialClass('0', undefined);
    }
  }


  getMaterialClass(pId: string, materialClassArry?: any[]) {
    const param: { pId: string, materialType?: number } = { pId: pId };
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

  selectMaterialClassItem(selectedItem) {
    if (selectedItem.option.isLeaf) {
      return;
    }
    selectedItem.option.children.shift();
    this.getMaterialClass(selectedItem.option.value, selectedItem.option.children);
  }

  public fullSearch() {
    this.fullSearchShow = !this.fullSearchShow;
  }

  toAddPage(): void {
    this.editItemId = null;
    this.selectedPage = TabPageType.AddPage;
  }

  backToList(): void {
    this.selectedPage = TabPageType.ManagePage;
    this.getDataList();
  }

  update(id: string): void {
    this.editItemId = id;
    this.selectedPage = TabPageType.AddPage;
  }

  public reset() {
    this.filters = {};
    this.materialClass = '';
    this.getDataList();
  }

  public getDataList = () => {
    this.tableConfig.loading = true;
    if (this.materialClass) {
      this.filters.firstType = this.materialClass[0];
      this.filters.secondType = this.materialClass[1];
      this.filters.thirdType = this.materialClass[2];
    }
    const filter = {
      pageNum: this.tableConfig.pageNum,
      pageSize: this.tableConfig.pageSize,
      filters: this.filters
    };
    this.materialManageService.getMaterialTempleteList(filter).subscribe((resData: MaterialManageServiceNs.UfastHttpAnyResModel) => {
      if (resData.code !== 0) {
        this.tableConfig.loading = false;
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.tableConfig.loading = false;
      this.dataList = resData.value.list;
      this.tableConfig.total = resData.value.total;
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
      headers: [{ title: '操作', tdTemplate: this.operation, width: 50, fixed: true },
      { title: '物料类别', field: 'materialType', width: 150, pipe: 'materialType2' },
      { title: '物料名称', field: 'materialName', width: 150 },
      { title: '一级分类', field: 'firstLevel', width: 150 },
      { title: '二级分类', field: 'secondLevel', width: 150 },
      { title: '三级分类', field: 'thirdLevel', width: 150 },
      { title: '计量单位', field: 'unit', width: 150 }
      ]
    };
    this.getDataList();
  }
}
