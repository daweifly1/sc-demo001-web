import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UfastTableNs } from '../../../layout/layout.module';
import { RegionalAllocationService, RegionalAllocationServiceNs } from '../../../core/trans/regionalAllocation.service';
import { ShowMessageService } from '../../../widget/show-message/show-message';
import { UfastUtilService } from '../../../core/infra/ufast-util.service';
import { Observable } from 'rxjs/Observable';
enum PageTypeEnum {
  ManagePage,
  AddPage,
  EditPage,
  DetailPage,
  AuditPage,
}
interface ButtonState {
  print: boolean;
  audit: boolean;
  edit: boolean;
  del: boolean;
}
@Component({
  selector: 'app-regional-allocation',
  templateUrl: './regional-allocation.component.html',
  styleUrls: ['./regional-allocation.component.scss']
})
export class RegionalAllocationComponent implements OnInit {
  tabPageType = PageTypeEnum;
  currentPage: PageTypeEnum;
  tableConfig: UfastTableNs.TableConfig;
  @ViewChild('operationTpl') operationTpl: TemplateRef<any>;
  @ViewChild('orderTpl') orderTpl: TemplateRef<any>;
  showAdvancedSearch: boolean;
  filters: any;
  regionAllotDataList: any[];
  /**
   * 编辑,详情id
   */
  editId: string;
  /**
   * 是否是审核页
   */
  isAuditPage: boolean;
  /**
   * 操作按钮
   */
  buttonState: { [index: string]: ButtonState };
  /**
   * 调入/出状态
   */
  inOutState: any[];
  constructor(private regionalAllocationService: RegionalAllocationService,
    private messageService: ShowMessageService,
    private utilService: UfastUtilService) {
    this.currentPage = this.tabPageType.ManagePage;
    this.showAdvancedSearch = false;
    this.filters = {};
    this.regionAllotDataList = [];
    this.editId = '';
    this.isAuditPage = false;
    this.buttonState = {};
    this.inOutState = [
      { label: '未完成', value: 0 },
      { label: '部分完成', value: 1 },
      { label: '已完成', value: 2 }
    ];
  }
  public trackByItem(index: number, item: any) {
    return item;
  }
  disabledStart = (startDate: Date) => {
    if (!startDate || !this.filters.createDateEnd) {
      return false;
    }
    return startDate.getTime() > this.filters.createDateEnd.getTime();
  }
  disabledEnd = (endDate: Date) => {
    if (!endDate || !this.filters.createDateStart) {
      return false;
    }
    return endDate.getTime() <= this.filters.createDateStart.getTime();
  }
  public onAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }
  public reset() {
    this.filters = {};
    this.getRegionAllotDataList();
  }

  /**
   * 列表
   */
  getRegionAllotDataList = () => {
    this.tableConfig.checkAll = false;
    this.regionAllotDataList = [];
    this.buttonState = {};
    Object.keys(this.filters).filter(item => typeof this.filters[item] === 'string').forEach((key: string) => {
      this.filters[key] = this.filters[key].trim();
    });
    this.filters.startDate = this.filters.startDate ?
      this.utilService.getStartDate(this.filters.startDate) : undefined;
    this.filters.endDate = this.filters.endDate ?
      this.utilService.getEndDate(this.filters.endDate) : undefined;
    const filter = {
      pageNum: this.tableConfig.pageNum,
      pageSize: this.tableConfig.pageSize,
      filters: this.filters
    };
    this.tableConfig.loading = true;
    this.regionalAllocationService.getRegionAllotList(filter).subscribe((resData: any) => {
      this.tableConfig.loading = false;
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.regionAllotDataList = resData.value.list;
      this.tableConfig.total = resData.value.total;
      this.regionAllotDataList.forEach((item) => {
        this.buttonState[item.id] = {
          print: true,
          audit: item.billStatus === '1',
          edit: item.billStatus === '1',
          del: item.billStatus === '1'
        };
      });
    }, (error: any) => {
      this.tableConfig.loading = false;
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  /**
   * 选择
   */
  public isAllChoose(isAllChoose: boolean): void {
    for (let i = 0, len = this.regionAllotDataList.length; i < len; i++) {
      this.regionAllotDataList[i][this.tableConfig.checkRowField] = isAllChoose;
    }
  }
  public changeSelect(value: UfastTableNs.SelectedChange) {
    if (value.index === -1) {
      this.tableConfig.checkAll ? this.isAllChoose(true) : this.isAllChoose(false);
    } else {
      this.tableConfig.checkAll = this.regionAllotDataList.every((item, index, array) => {
        return item._checked === true;
      });
    }
  }
  public childPageFinish() {
    this.currentPage = this.tabPageType.ManagePage;
    this.getRegionAllotDataList();
  }

  /**
   * 新增
   */
  public add() {
    this.editId = '';
    this.currentPage = this.tabPageType.AddPage;
  }
  /**
   * 导出
   */
  public export() {
    let exportFlag = false;
    const ids = [];
    this.regionAllotDataList.forEach((item) => {
      if (item._checked) {
        exportFlag = true;
        ids.push(item.id);
        return;
      }
    });
    if (!exportFlag) {
      this.messageService.showToastMessage('请选择要导出的数据', 'warning');
      return;
    }
    this.tableConfig.loading = true;
    this.regionalAllocationService.export(ids).subscribe((resData: any) => {
      this.tableConfig.loading = false;
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.messageService.showToastMessage('操作成功', 'success');
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  /**
   * 导出全部
   */
  public exportAll() { }
  /**
   * 编辑
   */
  public edit(id) {
    this.currentPage = this.tabPageType.EditPage;
    this.editId = id;
  }
  /**
   * 详情
   */
  public detail(id) {
    this.currentPage = this.tabPageType.DetailPage;
    this.isAuditPage = false;
    this.editId = id;
  }
  /**
   * 审核
   */
  public audit(id) {
    this.editId = id;
    this.currentPage = this.tabPageType.AuditPage;
    this.isAuditPage = true;
  }
  /**
   * 删除
   */
  private commonResDeal(observer: Observable<any>, refresh: boolean = false) {
    this.tableConfig.loading = true;
    observer.subscribe((resData: RegionalAllocationServiceNs.UfastHttpResT<any>) => {
      this.tableConfig.loading = false;
      if (resData.code === 0) {
        this.messageService.showToastMessage('操作成功', 'success');
        if (refresh) {
          this.getRegionAllotDataList();
        }
      } else {
        this.tableConfig.loading = false;
        this.messageService.showToastMessage(resData.message, 'warning');
      }
    }, (error: any) => {
      this.tableConfig.loading = false;
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  public deleteRegionAllot(id) {
    const ids = [];
    ids.push(id);
    this.messageService.showAlertMessage('', '确定要删除吗?', 'confirm').afterClose.subscribe((type: string) => {
      if (type !== 'onOk') {
        return;
      }
      this.commonResDeal(this.regionalAllocationService.deleteRegionAllot(ids), true);
    });
  }

  ngOnInit() {
    this.tableConfig = {
      pageSize: 10,
      pageNum: 1,
      showCheckbox: true,
      checkRowField: '_checked',
      checkAll: false,
      showPagination: false,
      pageSizeOptions: [10, 20, 30, 40, 50],
      total: 0,
      loading: false,
      headers: [{ title: '操作', tdTemplate: this.operationTpl, width: 170, fixed: true },
      { title: '调拨单号', tdTemplate: this.orderTpl, width: 200, fixed: true },
      { title: '调度员', field: 'dispatcherName', width: 100 },
      { title: '移出仓库', field: 'outLocation', width: 100 },
      { title: '领出物料凭证', field: '', width: 120 },
      { title: '单据状态', field: 'billStatus', width: 100, pipe: 'billStatus' },
      { title: '调出状态', field: 'outState', width: 100, pipe: 'inOutState' },
      { title: '领出过账状态', field: '', width: 120 },
      { title: '移入仓库', field: 'inLocation', width: 100 },
      { title: '领入物料凭证', field: '', width: 120 },
      { title: '调入状态', field: 'inState', width: 100, pipe: 'inOutState' },
      { title: '领入过账状态', field: '', width: 120 },
      { title: '移动类型', field: 'moveType', width: 100 },
      { title: '制单时间', field: 'createDate', width: 150, pipe: 'date:yyyy-MM-dd HH:mm' },
      { title: '制单部门', field: 'deptName', width: 100 },
      { title: '制单人', field: 'createName', width: 100 },
      { title: 'CRM单号', field: '', width: 120 }
      ]
    };
    this.getRegionAllotDataList();
  }

}
