import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UfastTableNs} from "../../../layout/ufast-table/ufast-table.component";
import {OtherWarehouseServiceNs} from "../../../core/trans/otherwarehouse.service";

interface TabPageType {
  ManagePage: number;
  AddPage: number;
  EditPage: number;
  DetailPage: number;
}

// 定义高级搜索所用到的字段模型
interface FilterItem {
  companyName:string,//公司名称
  companyType:string,//企业性质
}

@Component({
  selector: 'app-archives-list',
  templateUrl: './archives-list.component.html',
  styleUrls: ['./archives-list.component.scss']
})
export class ArchivesListComponent implements OnInit {
  tabPageType: TabPageType;
  selectedPage:number;

  fullSearchShow: boolean;
  searchPlaceholder: string;
  @ViewChild('operation') operation: TemplateRef<any>;

  tableConfig: UfastTableNs.TableConfig;//列表页面表格配置项
  contactsTableConfig:UfastTableNs.TableConfig;


  public options = [{
    value: 'zhejiang',
    label: '浙江',
    children: [{
      value: 'hangzhou',
      label: '杭州',
      children: [{
        value: 'xihu',
        label: '西湖',
        isLeaf: true
      }]
    }, {
      value: 'ningbo',
      label: '宁波',
      isLeaf: true
    }]
  }, {
    value: 'jiangsu',
    label: '江苏',
    children: [{
      value: 'nanjing',
      label: '南京',
      children: [{
        value: 'zhonghuamen',
        label: '孝陵卫',
        isLeaf: true
      }]
    }]
  }];

  public values: any[] = null;
  constructor() {
    this.tabPageType = {
      ManagePage: 0,
      AddPage: 1,
      EditPage: 2,
      DetailPage: 3,
    };
    this.selectedPage = this.tabPageType.ManagePage;
    this.searchPlaceholder = "代码";
    this.fullSearchShow = false;
  }

  public fullSearch() {
    this.fullSearchShow = !this.fullSearchShow;
  }

  public fullSearchClose() {
    this.fullSearchShow = false;
  }


  public onChanges(values: any): void {
    console.log(values, this.values);
  }

  getList = (pageNum?: number) => {
    const filter = {
      pageNum: pageNum || this.tableConfig.pageNum,
      pageSize: this.tableConfig.pageSize,
      filters: {

      }
    };
    this.tableConfig.loading = true;
    /*this.otherWareHouseService.getWareHouseList(filter).subscribe((resData: OtherWarehouseServiceNs.UfastHttpResT<any>) => {
      this.tableConfig.loading = false;
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.otherWarehouseDataList = resData.value.list;
      this.tableConfig.total = resData.value.total;
    }, (error: any) => {
      this.tableConfig.loading = false;
      this.messageService.showAlertMessage('', error.message, 'error');
    });*/
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
      headers: [{title: '操作', tdTemplate: this.operation, width: 200, fixed: true},
        {title: '代码', field: 'sapCode', width: 150},
        {title: '名称', field: '', width: 140},
        {title: '类别', field: 'type', width: 100},
        {title: '状态', field: 'inLocation', width: 100},
        {title: '等级', field: 'createName', width: 100},
        {title: '合同违约', field: 'applicationDate', width: 150, pipe: 'date:yyyy-MM-dd HH:mm'},
        {title: '质量问题', field: 'state', width: 80, pipe: 'state'},
        {title: '限定供应范围', field: 'isSynsap', width: 150, pipe: 'isSynsap'},
        {title: '企业性质', field: '', width: 80},
        {title: '企业类型', field: 'note', width: 100},
        {title: '证书过期', field: 'note', width: 100},
        {title: '办公地址', field: 'note', width: 100},
      ]
    };

  }

}
