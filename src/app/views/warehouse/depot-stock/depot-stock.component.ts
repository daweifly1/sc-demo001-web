import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ShowMessageService} from '../../../widget/show-message/show-message';
import {UfastTableNs} from '../../../layout/layout.module';
import {InventoryService, InventoryServiceNs} from '../../../core/trans/inventory.service';

interface TabPageType {
  ManagePage: number;
  DetailPage: number;
}

// 定义高级搜索所用到的字段模型
interface FilterItem {
  materialName?: string;
  materialNo?: string;
  warehouseCode?: string;
  areaCode?: string;
  locationCode?: string;
}

@Component({
  selector: 'app-depot-stock',
  templateUrl: './depot-stock.component.html',
  styleUrls: ['./depot-stock.component.scss']
})
export class DepotStockComponent implements OnInit {
  tabPageType: TabPageType;
  filters: FilterItem;
  selectedPage: number;
  selectedListIds: any[];
  tableConfig: UfastTableNs.TableConfig;
  DataList: any[];
  fullSearchShow: boolean;
  locationCode: string;
  materialNo: string;
  @ViewChild('materialNoTpl') materialNoTpl: TemplateRef<any>;

  constructor(private messageService: ShowMessageService,
              private inventoryService: InventoryService) {
    this.selectedListIds = [];
    this.DataList = [];
    this.locationCode = '';
    this.materialNo = '';
    this.fullSearchShow = false;
    this.filters = {};
    this.tabPageType = {
      ManagePage: 0,
      DetailPage: 1,
    };
    this.selectedPage = this.tabPageType.ManagePage;
  }

  getList = (pageNum?: number) => {
    this.DataList = [];
    this.tableConfig.checkAll = false;
    Object.keys(this.filters).filter(item => typeof this.filters[item] === 'string').forEach((key: string) => {
      this.filters[key] = this.filters[key].trim();
    });
    const filter = {
      pageNum: pageNum || this.tableConfig.pageNum,
      pageSize: this.tableConfig.pageSize,
      filters: this.filters
    };
    this.tableConfig.loading = true;
    this.inventoryService.getWarehouseInventoryList(filter).subscribe((resData: InventoryServiceNs.UfastHttpResT<any>) => {
      this.tableConfig.loading = false;
      if (resData.code !== 0) {
        this.messageService.showToastMessage(resData.message, 'warning');
        return;
      }
      this.DataList = resData.value.list;
      this.tableConfig.total = resData.value.total;
    }, (error: any) => {
      this.tableConfig.loading = false;
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  public detailDepotStock(locationCode: string, materialNo: string) {
    this.selectedPage = this.tabPageType.DetailPage;
    this.locationCode = locationCode;
    this.materialNo = materialNo;
  }

  public onChildFinish() {
    this.getList();
    this.selectedPage = this.tabPageType.ManagePage;
  }

  // 高级搜索
  public fullSearch() {
    this.fullSearchShow = !this.fullSearchShow;
  }

  public fullSearchClose() {
    this.fullSearchShow = false;
  }

  public fullSearchReset() {
    this.filters = {};
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
      headers: [
        {title: '物料编码', tdTemplate: this.materialNoTpl, width: 150, fixed: true},
        {title: '物料描述', field: 'materialName', width: 140},
        {title: '物料分类', field: 'materialType', width: 120},
        {title: '仓库编码', field: 'warehouseCode', width: 100},
        {title: '库区', field: 'areaCode', width: 100},
        {title: '储位', field: 'locationCode', width: 200},
        {title: '协议号', field: 'agreementCode', width: 180},
        {title: '库存数量', field: 'amount', width: 100},
        {title: '计量单位', field: 'unit', width: 100},
        {title: '保管员', field: 'keeperName', width: 120}
      ]
    };

    this.getList();
  }

}
