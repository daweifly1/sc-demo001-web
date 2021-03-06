import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UfastTableNs } from '../../../layout/ufast-table/ufast-table.component';
import { MaterialManageService, MaterialManageServiceNs } from '../../../core/trans/materialManage.service';
import { ShowMessageService } from '../../../widget/show-message/show-message';
import { Observable } from 'rxjs/Observable';
import { ActionCode } from '../../../../environments/actionCode';
enum PageType {
  ManagePage = 0,
  AddPage = 1,
  EditPage = 2,
  DetailPage = 3,
  SelectPage = 4
}
interface ButtonState {
  edit: boolean;
  thaw: boolean;
  freeze: boolean;
}

@Component({
  selector: 'app-material-setting',
  templateUrl: './material-setting.component.html',
  styleUrls: ['./material-setting.component.scss']
})
export class MaterialSettingComponent implements OnInit {
  tabPageType = PageType;
  selectedPage: number;

  fullSearchShow: boolean;
  @ViewChild('operation') operation: TemplateRef<any>;
  @ViewChild('codeTpl') codeTpl: TemplateRef<any>;

  tableConfig: UfastTableNs.TableConfig;

  public values: any[] = null;
  filters: any; // interface定义
  dataList: any; // 在服务里定义
  editId: string;
  materialClassArry: any[];
  materialClassId: any[];
  detailId: string;
  buttonState: {[index: string]: ButtonState};
  ActionCode = ActionCode;
  constructor(private materialManageService: MaterialManageService, private messageService: ShowMessageService) {
    this.selectedPage = this.tabPageType.ManagePage;
    this.fullSearchShow = false;
    this.filters = {};
    this.materialClassId = [];
    this.buttonState = {};
  }

  public fullSearch() {
    this.fullSearchShow = !this.fullSearchShow;
  }
  public advanceSearchReset() {
    Object.keys(this.filters).forEach((item: string) => {
      this.filters[item] = '';
    });
    this.materialClassId = [];
    this.getList();
  }

  public fullSearchClose() {
    this.fullSearchShow = false;
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

  getList = (pageNum?: number, pageSize?: number) => {
    this.tableConfig.loading = true;
    Object.keys(this.filters).filter(item => typeof this.filters[item] === 'string').forEach((key: string) => {
      this.filters[key] = this.filters[key].trim();
    });
    if (this.materialClassId instanceof Array) {
      this.filters.firstType = this.materialClassId[0];
      this.filters.secondType = this.materialClassId[1];
      this.filters.thirdType = this.materialClassId[2];
    }
    const filter = {
      pageNum: this.tableConfig.pageNum || pageNum,
      pageSize: this.tableConfig.pageSize || pageSize,
      filters: this.filters
    };
    this.materialManageService.getMaterialSettingList(filter).subscribe((resData: MaterialManageServiceNs.UfastHttpAnyResModel) => {
      if (resData.code !== 0) {
        this.tableConfig.loading = false;
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.tableConfig.loading = false;
      this.dataList = resData.value.list;
      this.tableConfig.total = resData.value.total;
      this.dataList.forEach((item) => {
        this.buttonState[item.id] = {
          edit: item.isDelete === 0,
          freeze: item.isDelete === 0,
          thaw: item.isDelete === 1

        };
      });
    });
  }


  public update(id) {
    this.editId = id;
    this.selectedPage = this.tabPageType.EditPage;
  }
  public freezeOrThaw(isDelete, id) {
    this.tableConfig.loading = true;
    const message: string = isDelete === 0 ? '冻结' : '解冻';
    this.messageService.showAlertMessage('', `确定${message}该条信息吗?`, 'confirm').afterClose.subscribe((type: string) => {
      if (type !== 'onOk') {
        return;
      }
      if (isDelete === 0) {
        this.commonResDeal(this.materialManageService.freeze(id), true);
      } else {
        this.commonResDeal(this.materialManageService.thaw(id), true);
      }
    });
    // this.materialManageService.freeze(id).subscribe((resData: MaterialManageServiceNs.UfastHttpAnyResModel) => {
    //   if (resData.code !== 0) {
    //     this.tableConfig.loading = false;
    //     this.messageService.showAlertMessage('', resData.message, 'error');
    //     return;
    //   }
    //   this.messageService.showToastMessage('操作成功', 'success');
    //   this.tableConfig.loading = false;
    // });
  }

  private commonResDeal(observer: Observable<any>, refresh: boolean = false) {
    observer.subscribe((resData: MaterialManageServiceNs.UfastHttpAnyResModel) => {
      if (resData.code === 0) {
        this.messageService.showToastMessage('操作成功', 'success');
        if (refresh) {
          this.getList();
        }
      } else {
        this.messageService.showToastMessage(resData.message, 'warning');
      }
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  public detail(id) {
    this.detailId = id;
    this.selectedPage = this.tabPageType.DetailPage;
  }
  toAddPage(): void {

    // this.selectedPage = this.tabPageType.AddPage;
    this.selectedPage = this.tabPageType.SelectPage;
  }

  backToList(): void {
    this.selectedPage = this.tabPageType.ManagePage;
    this.getList();
  }

  ngOnInit() {
    this.tableConfig = {
      pageSize: 10,
      showCheckbox: true,
      showPagination: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageNum: 1,
      total: 0,
      loading: false,
      headers: [{ title: '操作', tdTemplate: this.operation, width: 150, fixed: true },
      { title: '物料编码', tdTemplate: this.codeTpl, width: 200, fixed: true },
      { title: '物料名称', field: 'name', width: 150, fixed: true },
      { title: '物料类别', field: 'materialType', width: 100, pipe: 'materialType2' },
      { title: '一级分类', field: 'firstLevel', width: 150 },
      { title: '二级分类', field: 'secondLevel', width: 150 },
      { title: '三级分类', field: 'thirdLevel', width: 150 },
      { title: '状态', field: 'isDelete', width: 100, pipe: 'materialSettingStatus' },
      { title: '型号规格', field: 'specificationModel', width: 150 },
      { title: '图号', field: 'drawingNumber', width: 150 },
      { title: '材质', field: 'material', width: 150 },
      { title: '品牌', field: 'brand', width: 150 },
      { title: '进口/国产', field: 'importOrDomestic', width: 150 },
      { title: '物资分类', field: 'materialClassification', width: 150 },

      ]
    };
    this.getList();
  }

}
