import { Component, EventEmitter, Input, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
import { ShowMessageService } from '../../../../widget/show-message/show-message';
import { UfastTableNs } from '../../../../layout/layout.module';
import { InventoryService, InventoryServiceNs } from '../../../../core/trans/inventory.service';
import { materialize } from 'rxjs/operators';

interface TabPageType {
  ManagePage: number;
  AddPage: number;
  DetailPage: number;
}

@Component({
  selector: 'app-detailinventory',
  templateUrl: './detailinventory.component.html',
  styleUrls: ['./detailinventory.component.scss']
})
export class DetailinventoryComponent implements OnInit {

  tabPageType: TabPageType;
  @Input() selectRowId: string;
  @Input() selectCheckOrderNo: string;
  @Input() detailPage: boolean;
  @Output() finish: EventEmitter<any>;
  @ViewChild('actAmountTpl') actAmountTpl: TemplateRef<any>;
  tableConfig: UfastTableNs.TableConfig;
  materialDataList: any[];
  InventoryDetail: any;

  constructor(private inventoryService: InventoryService,
    private messageService: ShowMessageService) {
    this.finish = new EventEmitter<any>();
    this.tabPageType = {
      ManagePage: 0,
      AddPage: 1,
      DetailPage: 2,
    };
    this.materialDataList = [];
    this.InventoryDetail = {};
  }

  public emitFinish() {
    this.finish.emit();
  }

  // 获取盘点单详情
  public getInventoryDetail() {
    this.inventoryService.getInventoryDetail(this.selectRowId).subscribe((resData: InventoryServiceNs.UfastHttpResT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.InventoryDetail = resData.value;
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  getMaterialList = () => {
    this.materialDataList = [];
    let filter = <any>{};
    filter = {
      pageNum: this.tableConfig.pageNum,
      pageSize: this.tableConfig.pageSize,
      filters: {
        checkOrderNo: this.selectCheckOrderNo
      }
    };
    if (!this.detailPage) {
      filter.filters.state = 0;
    }
    this.messageService.showLoading();
    this.inventoryService.getMaterialList(filter).subscribe((resData: InventoryServiceNs.UfastHttpResT<any>) => {
      this.messageService.closeLoading();
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      resData.value.list.forEach((item) => {
        let temp = [];
        temp = item;
        if (!this.detailPage) {
          temp['actAmount'] = temp['sysAmount'];
        }
        temp['_this'] = temp;
        this.materialDataList.push(temp);
      });
      this.tableConfig.total = resData.value.total;
    }, (error: any) => {
      this.messageService.closeLoading();
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  public inventory() {
    const materialList = [];
    this.materialDataList.forEach((item) => {
      const temp = {
        id: item.id,
        sysAmount: item.sysAmount,
        actAmount: item.actAmount
      };
      materialList.push(temp);
    });
    this.messageService.showLoading();
    this.inventoryService.inventory(materialList).subscribe((resData: InventoryServiceNs.UfastHttpResT<any>) => {
      this.messageService.closeLoading();
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.emitFinish();
    }, (error: any) => {
      this.messageService.closeLoading();
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }


  ngOnInit() {
    const tableHeaders: UfastTableNs.TableHeader[] = [
      { title: '盘点条码', field: 'barCode', width: 100 },
      { title: '物料编码', field: 'materialsNo', width: 150 },
      { title: '物料描述', field: 'materialsDes', width: 150 },
      { title: '储位', field: 'loactionCode', width: 100 },
      { title: '原始数量', field: 'sysAmount', width: 100 },
      { title: '保管员', field: 'depositaryName', width: 100 },
      { title: '盘点状态', field: 'resultType', width: 100, pipe: 'checkResultState' },
      { title: '盘点人', field: 'inventoryUserName', width: 100 }
    ];
    if (this.detailPage) {
      tableHeaders.splice(5, 0,
        { title: '盘点数量', field: 'actAmount', width: 100 },
      );
    } else {
      tableHeaders.splice(5, 0, {
        title: '盘点数量', tdTemplate: this.actAmountTpl, width: 100
      });
    }
    this.tableConfig = {
      pageSize: 10,
      showCheckbox: false,
      showPagination: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageNum: 1,
      total: 0,
      loading: false,
      headers: tableHeaders
    };
    this.getInventoryDetail();
    this.getMaterialList();
  }

}
