import { Component, OnInit, AfterContentInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { ShowMessageService } from '../../../widget/show-message/show-message';
import { UfastTableNs } from '../../../layout/layout.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PackBarcodePatchServiceNs, PackBarcodePatchService } from '../../../core/trans/packBarcodePatch.service';
import { NormalTicketTplComponent, TemplateDataDigger } from '../../../layout/print-template/normal-ticket-tpl/normal-ticket-tpl.component';
import { LodopPrintService, LodopPrintServiceNs } from '../../../core/infra/lodop-print.service';
import { PrintErrorService } from '../../../widget/print-error/print-error';
import {UfastUtilService} from '../../../core/infra/ufast-util.service';
interface PageType {
    MainPage: number;
    DetailPage: number;
    LeadInPage: number;
}
@Component({
    selector: 'app-pack-barcode-patch',
    templateUrl: './pack-barcode-patch.component.html',
    styleUrls: ['./pack-barcode-patch.component.scss']
})
export class PackBarcodePatchComponent implements OnInit {
    @ViewChild('operationTpl') operationTpl: TemplateRef<any>;
    @Input() searchText: string;
    tableConfig: UfastTableNs.TableConfig;
    printConfigurationForm: FormGroup;
    printDataList: any;
    show: boolean;
    printModelTitle: string;
    printTpl: object;
    searchPlaceholder: string;
    advancedSearchShow: boolean;
    filters: any;
    barCodeType: any;
    printState: any;
    printData: TemplateDataDigger[];
    selectedList: any[];
    selectedListIds: number[];
    configurationList: any;
    constructor(private packBarcodePatchService: PackBarcodePatchService,
        private messageService: ShowMessageService, private utilService: UfastUtilService,
        private formBuilder: FormBuilder,
        private lodopService: LodopPrintService,
        private printErrorService: PrintErrorService) {
        this.printDataList = [];
        this.selectedList = [];
        this.selectedListIds = [];
        this.show = false;
        this.printModelTitle = '条码打印配置';
        this.printTpl = [
            { type: 1, printTplName: '模板1' }
        ];
        this.barCodeType = [
            { type: 0, typeName: '总条码' },
            { type: 1, typeName: '分条码' }
        ];
        this.printState = [
            { type: 0, state: '已打印' },
            { type: 1, state: '已入库' },
            { type: 2, state: '已出库' },
            { type: 3, state: '已拆分' }
        ];
        this.advancedSearchShow = false;
        this.filters = {};
        this.searchPlaceholder = '物料编码';
        this.printData = [];
        this.configurationList = {
            edition: true,
            vin: true,
            hasPackNumber: true
        };
    }

    public isAllChoose(isAllChoose: boolean): void {
      for (let i = 0, len = this.printDataList.length; i < len; i++) {
        this.printDataList[i][this.tableConfig.checkRowField] = isAllChoose;
      }
    }

    public changeSelect(value: UfastTableNs.SelectedChange) {
      if (value.index === -1) {
        this.tableConfig.checkAll ? this.isAllChoose(true) : this.isAllChoose(false);
      } else {
        this.tableConfig.checkAll = this.printDataList.every((item) => {
          return item._checked === true;
        });
      }
    }
  disabledStart = (startDate: Date) => {
    if (!startDate || !this.filters.endDate) {
      return false;
    }
    return startDate.getTime() > this.filters.endDate.getTime();
  }
  disabledEnd = (endDate: Date) => {
    if (!endDate || !this.filters.beginDate) {
      return false;
    }
    return endDate.getTime() <= this.filters.beginDate.getTime();
  }
    getprintDataList = () => {
      this.printDataList = [];
      this.selectedList = [];
      this.tableConfig.checkAll = false;
      this.filters.startDate = this.filters.startDate ?
        this.utilService.getStartDate(this.filters.startDate) : undefined;
      this.filters.endDate = this.filters.endDate ?
        this.utilService.getEndDate(this.filters.endDate) : undefined;
        const filters = {
            pageNum: this.tableConfig.pageNum,
            pageSize: this.tableConfig.pageSize,
            filters: this.filters
        };
        this.tableConfig.loading = true;
        this.packBarcodePatchService.getPackBarcodePatchList(filters).subscribe((
            resData: PackBarcodePatchServiceNs.UfastHttpAnyResModel) => {
            this.tableConfig.loading = false;
            if (resData.code !== 0) {
                this.messageService.showAlertMessage('', resData.message, 'warning');
                return;
            }
            this.printDataList = resData.value.list;
            this.tableConfig.total = resData.value.total;
        }, (error: any) => {
            this.tableConfig.loading = false;
            this.messageService.showAlertMessage('', error.message, 'error');
        });
    }

    public printConfiguration(event: Event) {
        event.stopPropagation();
        this.show = !this.show;
    }
    public advancedSearch() {
        this.advancedSearchShow = !this.advancedSearchShow;
    }
    public advancedSearchClose() {
        this.advancedSearchShow = false;
    }
    public advancedSearchReset() {
        this.filters = {};
        this.getprintDataList();
    }
    public preview(barcode?: string, btn?: string) {
        if (!this.lodopService.isInitSuccess()) {
            this.printErrorService.showInitError();
            return;
        }
        this.printData = [];
        const data = {
            pageNum: this.tableConfig.pageNum,
            pageSize: this.tableConfig.pageSize,
            filters: {
                barcode
            }
        };
        this.packBarcodePatchService.getPackBarcodePatchList(data).subscribe((
            resData: PackBarcodePatchServiceNs.UfastHttpAnyResModel) => {
            this.tableConfig.loading = false;
            if (resData.code !== 0) {
                this.messageService.showAlertMessage('', resData.message, 'warning');
                return;
            }
            this.printData = resData.value.list;
            this.printData.forEach((item) => {
                item.hasPackNumber = this.configurationList.hasPackNumber;
                item.edition = this.configurationList.edition;
                item.vin = this.configurationList.vin;
                item.orderNo = item['billNo'];
            });
            this.printData[0].printDate = new Date();
            if (btn === 'preview') {
                this.lodopService.preview(NormalTicketTplComponent, this.printData, 'data');
                this.getprintDataList();
            }
            if (btn === 'print') {
                this.lodopService.print(NormalTicketTplComponent, this.printData, 'data');
                this.getprintDataList();
                this.packBarcodePatchService.updatePrintCount(barcode);
            }
            const barcodeList = [];
            barcodeList.push(barcode);
            this.packBarcodePatchService.updatePrintCount(barcodeList).subscribe(
                (res: PackBarcodePatchServiceNs.UfastHttpAnyResModel) => {
                    if (res.code !== 0) {
                        this.messageService.showAlertMessage('', res.message, 'warning');
                        return;
                    }
                    this.getprintDataList();
                }, (error: any) => {
                    this.messageService.showAlertMessage('', error.message, 'error');
                });
        }, (error: any) => {
            this.messageService.showAlertMessage('', error.message, 'error');
        });
    }
    public batchPreview(btn: string) {
      this.printData = [];
      this.printDataList.forEach((item) => {
        if (item._checked) {
          this.printData.push(item);
          return;
        }
      });
        if (!this.lodopService.isInitSuccess()) {
            this.printErrorService.showInitError();
            return;
        }
        if (!this.printData.length) {
            this.messageService.showAlertMessage('', '请选择要打印的数据', 'error');
            return;
        }
        // this.printData = this.selectedList;
        for (let i = 0; i < this.printData.length; i++) {
            this.printData[i].printDate = new Date();
        }
        this.printData.forEach((item) => {
            item.hasPackNumber = this.configurationList.hasPackNumber;
            item.edition = this.configurationList.edition;
            item.vin = this.configurationList.vin;
            item['orderNo'] = item['billNo'];
        });
        if (btn === 'preview') {
            this.lodopService.preview(NormalTicketTplComponent, this.printData, 'data');
            this.getprintDataList();
        }
        if (btn === 'print') {
            this.lodopService.print(NormalTicketTplComponent, this.printData, 'data');
            this.getprintDataList();
        }
        const barcodeList = [];
        this.printData.forEach((item) => {
            barcodeList.push(item.barcode);
        });
        this.packBarcodePatchService.updatePrintCount(barcodeList).subscribe(
            (res: PackBarcodePatchServiceNs.UfastHttpAnyResModel) => {
                if (res.code !== 0) {
                    this.messageService.showAlertMessage('', res.message, 'warning');
                    return;
                }
                this.getprintDataList();
            }, (error: any) => {
                this.messageService.showAlertMessage('', error.message, 'error');
            });
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
            headers: [{
                title: '操作',
                tdTemplate: this.operationTpl,
                width: 150,
                fixed: true
            }, {
                title: '物料编码',
                field: 'materialsNo',
                width: 100,
                fixed: true
            }, {
                title: '物料名称',
                field: 'materialsDes',
                width: 200,
                fixed: true
            }, {
                title: '原始数量',
                field: 'totalQty',
                width: 80,
            }, {
                title: '打印数量',
                field: 'currentQty',
                width: 80,
            }, {
                title: '补打次数',
                field: 'reprintCount',
                width: 80,
            }, {
                title: '状态',
                field: 'barcodeStatus',
                width: 100,
                pipe: 'barcodeStatus'
            }, {
                title: '序号',
                field: 'seq',
                width: 80,
            }, {
                title: '操作时间',
                field: 'printTime',
                width: 150,
                pipe: 'date:yyyy-MM-dd HH:mm'
            }, {
                title: '操作人',
                field: 'printName',
                width: 100,
            }, {
                title: '单据号',
                field: 'billNo',
                width: 170,
            }, {
                title: '条码',
                field: 'barcode',
                width: 170,
            }, {
                title: '条码类型',
                field: 'barcodeFlag',
                width: 100,
                pipe: 'barcodeFlag'
            }, {
                title: 'VIN码',
                field: 'vinid',
                width: 100,
            }, {
                title: '图号',
                field: 'orawyd',
                width: 100,
            }, {
                title: '条码描述',
                field: 'barcodeDesc',
                width: 100,
            }, {
                title: '规格描述',
                field: 'model',
                width: 100,
            }
            ]
        };
        this.filters = {
            billNo: this.filters.billNo || '',
            materialsNo: this.filters.materialsNo,
            barcode: this.filters.barcode || '',
            barcodeFlag: this.filters.barcodeFlag || '',
            barcodeStatus: this.filters.barcodeStatus || '',
            beginDate: this.filters.beginDate || '',
            endDate: this.filters.endDate || ''
        };
        this.printConfigurationForm = this.formBuilder.group({
            orawyd: [null],
            barcodeDesc: [null],
            model: [null],
            totalQty: [{ value: null, disabled: true }],
            currentQty: [null, Validators.required],
        });
        this.getprintDataList();
    }

}
