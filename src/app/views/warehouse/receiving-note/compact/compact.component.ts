import { Component, EventEmitter, OnInit, TemplateRef, ViewChild, Input, Output } from '@angular/core';
import { UfastTableNs } from '../../../../layout/layout.module';
import { ShowMessageService } from '../../../../widget/show-message/show-message';
import { ReceivingNoteService, ReceivingNoteServiceNs } from '../../../../core/trans/receiving-note.service';
import { UfastUtilService } from '../../../../core/infra/ufast-util.service';
enum ContractType {
  Purchase = 1,         // 采购订单
  Protocol = 2          // 年度协议
}
enum TabPageType {
  ContractPage,
  OrderPage
}
// 合同列表查询字段
interface ContractFiltersType {
  contractType?: string;
  purchaseNo?: string;
  goodsReceivor?: string;
  startDate?: string;
  endDate?: string;
}
interface ContractListType {
  id: number;
  type: string;
}

@Component({
  selector: 'app-compact',
  templateUrl: './compact.component.html',
  styleUrls: ['./compact.component.scss']
})
export class CompactComponent implements OnInit {

  tabPageType = TabPageType;
  currentPageType: number;
  contractTableConfig: UfastTableNs.TableConfig;
  contractList: ReceivingNoteServiceNs.ContractList[];
  contractFilters: ContractFiltersType; // 就在Ts里定义，合同列表查询

  @ViewChild('deliverTpl') deliverTpl: TemplateRef<any>;
  @ViewChild('operationTpl') operationTpl: TemplateRef<any>;
  @Output() finish: EventEmitter<any>;

  contractTypeList: ContractListType[];
  advancedSearchShow: boolean;

  contractType: number;
  contractNo: string;
  constructor(private receivingNoteService: ReceivingNoteService,
    private messageService: ShowMessageService,
    private ufastUtilService: UfastUtilService) {
    this.currentPageType = this.tabPageType.ContractPage;
    this.finish = new EventEmitter<any>();
    this.contractTypeList = [
      { id: 1, type: '采购订单' },
      { id: 2, type: '年度协议' }
    ];
    this.contractFilters = {};
    this.advancedSearchShow = false;
  }
  public addDispatch(poHeaderId: string, contractType: number) {
    this.contractType = contractType;
    this.contractNo = poHeaderId;
    this.currentPageType = this.tabPageType.OrderPage;
  }
  getContractList = (pageNum?: number, pageSize?: number) => {
    Object.keys(this.contractFilters).filter(item => typeof this.contractFilters[item] === 'string').forEach((key: string) => {
      this.contractFilters[key] = this.contractFilters[key].trim();
    });
    if (this.contractFilters.endDate) {
      this.contractFilters.endDate = this.ufastUtilService.getEndDate(this.contractFilters.endDate).toUTCString();
    }
    if (this.contractFilters.startDate) {
      this.contractFilters.startDate = this.ufastUtilService.getStartDate(this.contractFilters.startDate).toUTCString();
    }
    const filter = {
      pageNum: this.contractTableConfig.pageNum || pageNum,
      pageSize: this.contractTableConfig.pageSize || pageSize,
      filters: this.contractFilters
    };
    this.contractTableConfig.loading = true;
    this.receivingNoteService.getContractList(filter).subscribe((resData: ReceivingNoteServiceNs.UfastHttpResT<any>) => {
      this.contractTableConfig.loading = false;
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.contractList = resData.value.list;
      console.log(this.contractTableConfig.total);
      console.log(resData.value);
      this.contractTableConfig.total = resData.value.total;
    }, (error: any) => {
      this.contractTableConfig.loading = false;
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  public advancedSearchReset() {
    Object.keys(this.contractFilters).forEach((item: string) => {
      this.contractFilters[item] = '';
    });
  }
  public toggleAdvancedSearch() {
    this.advancedSearchShow = !this.advancedSearchShow;
  }
  public onChildFinish(exit: boolean) {
    if (exit) {
      this.emitFinish();
    } else {
      this.currentPageType = this.tabPageType.ContractPage;
    }
  }
  public emitFinish() {
    this.finish.emit();
  }
  ngOnInit() {
    this.contractTableConfig = {
      pageSize: 10,
      showCheckbox: false,
      showPagination: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageNum: 1,
      total: 0,
      loading: false,
      headers: [
        { title: '操作', tdTemplate: this.operationTpl, width: 100, fixed: true },
        { title: '合同编号', field: 'purchaseNo', width: 200, fixed: true },
        { title: '发货状态', field: '', width: 100, pipe: 'deliverGoodsStatus' },
        { title: '合同类型', field: 'contractType', width: 150, pipe: 'contractType' },
        { title: '签约日期', field: 'contractDate', width: 150 },
        // { title: '交货日期', field: 'validDate', width: 150 },
        { title: '供应商', field: 'vendorName', width: 200 },
        { title: '业务实体', field: 'name', width: 180 },
        { title: '收货方', field: 'shipToName', width: 180 },
        { title: '收单方', field: 'billReceivor', width: 180 }
      ]
    };
    this.getContractList();
  }

}
