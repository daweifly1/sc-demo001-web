import { Component, OnInit, Input } from '@angular/core';
import { ShowMessageService } from '../../../widget/show-message/show-message';
import { UfastTableNs } from '../../../layout/layout.module';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DevanningPrintServiceNs, DevanningPrintService } from '../../../core/trans/devanningPrint.service';
import { LodopPrintService } from '../../../core/infra/lodop-print.service';
import { PrintErrorService } from '../../../widget/print-error/print-error';
import { NormalTicketTplComponent, TemplateDataDigger } from '../../../layout/print-template/normal-ticket-tpl/normal-ticket-tpl.component';
import { UfastUtilService } from '../../../core/infra/ufast-util.service';
import { ReturnIn } from '../../../../environments/printData';
import { empty } from 'rxjs/Observer';

interface PageType {
  MainPage: number;
  DetailPage: number;
  LeadInPage: number;
}
interface SelectedData {
  materialsNo: string;
  materialsDes: string;
  totalQty: number;
  currentQty: number;
  barcodeStatus: string;
  printTime: string;
  printName: string;
  billNo: string;
  barcode: string;
  barcodeFlag: string;
  vinid: string;
  orawyd: string;
  barcodeDesc: string;
  model: string;
}
@Component({
  selector: 'app-devanning-print',
  templateUrl: './devanning-print.component.html',
  styleUrls: ['./devanning-print.component.scss']
})
export class DevanningPrintComponent implements OnInit {
  @Input() searchText: string;
  tableConfig: UfastTableNs.TableConfig;
  printConfigurationForm: FormGroup;
  devanningPrintDataList: DevanningPrintServiceNs.DevanningPrintListModel[];
  show: boolean;
  printModelTitle: string;
  printTpl: object;
  searchPlaceholder: string;
  advancedSearchShow: boolean;
  filters: any;
  selected: number;
  selectedList: SelectedData[];
  selectedListIds: SelectedData[];
  currentQty: number;
  totalQty: number;
  formGroup: FormGroup;
  dynamicData: Array<{ currentQty: number, vinid: string, barcodeDesc?: string, model?: string, orawyd?: string }> = [];
  barcode: string;
  printData: TemplateDataDigger[];
  configurationList: any;
  constructor(private devanningPrintService: DevanningPrintService, private utilService: UfastUtilService,
    private messageService: ShowMessageService, private formBuilder: FormBuilder,
    private lodopService: LodopPrintService, private printErrorService: PrintErrorService) {
    this.devanningPrintDataList = [];
    this.show = false;
    this.printModelTitle = '条码打印配置';
    this.printTpl = [
      { type: 1, printTplName: '模板1' },
      { type: 2, printTplName: '模板2' }
    ];
    this.advancedSearchShow = false;
    this.filters = {};
    this.searchPlaceholder = '物料编码';
    this.selected = null;
    this.selectedList = [];
    this.selectedListIds = [];
    this.currentQty = null;
    this.totalQty = null;
    this.printData = [];
    this.configurationList = {
      edition: true,
      vin: true,
      hasPackNumber: true
    };
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
  getDevanningPrintList = () => {
    this.devanningPrintDataList = [];
    this.dynamicData = [];
    this.currentQty = null;
    this.printConfigurationForm.reset();
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
    this.devanningPrintService.getDevanningPrintList(filters).subscribe((
      resData: DevanningPrintServiceNs.UfastHttpAnyResModel) => {
      this.tableConfig.loading = false;
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.devanningPrintDataList = resData.value.list;
      this.tableConfig.total = resData.value.total;
    }, (error: any) => {
      this.tableConfig.loading = false;
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  public onClick(event: Event) {
    this.show = !this.show;
    event.stopPropagation();
  }

  public searchTextChange(searchText) {
    this.filters.materialsNo = searchText;
  }
  public advancedSearch() {
    this.advancedSearchShow = !this.advancedSearchShow;
  }
  public advancedSearchClose() {
    this.advancedSearchShow = false;
  }
  public advancedSearchReset() {
    this.filters = {};
    this.getDevanningPrintList();
  }


  get devanningData() {
    return this.formGroup.get('devanningData') as FormArray;
  }
  private createForm(devanningData?: any) {
    devanningData = devanningData || {};
    return this.formBuilder.group({
      currentQty: [devanningData.currentQty || ''],
      vinid: [devanningData.vinid || ''],
    });
  }
  public setDynamicData() {
    this.dynamicData = [];
    for (let i = 1; i <= this.currentQty; i++) {
      const totalQty = Math.floor(this.totalQty);

      const decimals = this.utilService.sub(this.totalQty, totalQty);
      const remainder = totalQty % this.currentQty;
      // const quotient = this.totalQty / this.currentQty;
      const minus = this.utilService.sub(totalQty, remainder);
      const quotient = this.utilService.div(minus, this.currentQty);
      if (remainder === 0) {
        this.dynamicData.push({ 'currentQty': quotient, 'vinid': '' });
      } else {
        if (i !== this.currentQty) {
          this.dynamicData.push({ 'currentQty': quotient, 'vinid': '' });
        } else {

          const mulData = this.utilService.mul(quotient, (this.currentQty - 1));
          // const sub = this.utilService.sub(this.totalQty, mulData);
          // const product = this.utilService.mul(quotient)
          // const currentQty = this.totalQty - Math.floor(quotient) * (i - 1);
          const currentLastQty = this.utilService.sub(this.totalQty, mulData);
          // const x = this.utilService.add(currentLastQty, decimals);
          this.dynamicData.push({ 'currentQty': currentLastQty, 'vinid': '' });
        }
      }
    }
  }


  public changeSelect(value: UfastTableNs.SelectedChange) {
    this.devanningPrintDataList.forEach((item) => {
      item._checked = false;
    });
    this.devanningPrintDataList[value.index]._checked = true;
    const selectedData = this.devanningPrintDataList[value.index];
    if (selectedData.currentQty < 1) {
      this.messageService.showToastMessage('打印数量至少为1才能拆箱', 'error');
      return;
    }
    this.barcode = selectedData.barcode;
    this.printConfigurationForm.controls['totalQty'].patchValue(selectedData.currentQty);
    this.totalQty = selectedData.currentQty;
    this.currentQty = 2;
    this.setDynamicData();
  }

  public currentQtyChange(event) {
    if (!this.printConfigurationForm.controls['totalQty'].value) {
      this.messageService.showToastMessage('请选择要打印的数据', 'warning');
      return;
    }
    this.currentQty = event;
    this.currentQty = this.currentQty * 1;
    this.setDynamicData();
  }
  public print(btn: string) {
    if (!this.barcode) {
      this.messageService.showToastMessage('请选择要打印的数据', 'warning');
      return;
    }
    if (!this.lodopService.isInitSuccess()) {
      this.printErrorService.showInitError();
      return;
    }
    let sum = 0;
    let printStop = false;
    this.dynamicData.forEach((item) => {
      item.model = this.printConfigurationForm.value.model;
      item.barcodeDesc = this.printConfigurationForm.value.barcodeDesc;
      item.orawyd = this.printConfigurationForm.value.orawyd;
      sum += item.currentQty;
      if (!item.currentQty) {
        printStop = true;
        return;
      }
    });
    if (printStop) {
      this.messageService.showToastMessage('每包数量不能为空和0', 'warning');
      return;
    }
    if (sum > this.printConfigurationForm.value.totalQty) {
      this.messageService.showToastMessage('每包数量总和不得超过最大数量!', 'warning');
      return;
    }
    if (sum < this.printConfigurationForm.value.totalQty) {
      this.messageService.showToastMessage('每包数量总和必须等于总数量!', 'warning');
      return;
    }
    this.devanningPrintService.print(this.barcode, this.dynamicData).subscribe((
      resData: DevanningPrintServiceNs.UfastHttpAnyResModel) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.printData = resData.value;
      this.printData.forEach((item) => {
        item.printDate = new Date();
        item.hasPackNumber = this.configurationList.hasPackNumber;
        item.edition = this.configurationList.edition;
        item.vin = this.configurationList.vin;
        item['orderNo'] = item['billNo'];
      });
      if (btn === 'preview') {
        this.lodopService.preview(NormalTicketTplComponent, this.printData, 'data');
        this.getDevanningPrintList();
      }
      if (btn === 'print') {
        this.lodopService.print(NormalTicketTplComponent, this.printData, 'data');
        this.getDevanningPrintList();
      }
      this.printConfigurationForm.reset();
      this.currentQty = null;
    }, (error: any) => {
      this.tableConfig.loading = false;
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  ngOnInit() {
    this.tableConfig = {
      pageSize: 10,
      showCheckbox: true,
      checkAll: false,
      disabledCheckAll: true,
      showPagination: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageNum: 1,
      total: 0,
      loading: false,
      headers: [{
        title: '物料编码',
        field: 'materialsNo',
        width: 150,
        fixed: true
      }, {
        title: '物料名称',
        field: 'materialsDes',
        width: 200,
        fixed: true
      }, {
        title: '原始数量',
        field: 'totalQty',
        width: 100,
      }, {
        title: '打印数量',
        field: 'currentQty',
        width: 100,
      }, {
        title: '状态',
        field: 'barcodeStatus',
        width: 150,
        pipe: 'barcodeStatus'
      }, {
        title: '操作时间',
        field: 'printTime',
        width: 150,
        pipe: 'date:yyyy-MM-dd HH:mm'
      }, {
        title: '操作人',
        field: 'printName',
        width: 150,
      }, {
        title: '单据号',
        field: 'billNo',
        width: 180,
      }, {
        title: '条码',
        field: 'barcode',
        width: 160,
      }, {
        title: '条码类型',
        field: 'barcodeFlag',
        width: 150,
        pipe: 'barcodeFlag'
      }, {
        title: 'VIN码',
        field: 'vinid',
        width: 150,
      }, {
        title: '图号',
        field: 'orawyd',
        width: 150,
      }, {
        title: '条码描述',
        field: 'barcodeDesc',
        width: 150,
      }, {
        title: '规格描述',
        field: 'model',
        width: 150,
      }
      ]
    };
    this.filters = {
      barcodeFlag: 1,
      billNo: this.filters.billNo || '',
      materialsNo: this.filters.materialsNo,
      beginDate: this.filters.beginDate || '',
      endDate: this.filters.endDate || ''
    };
    this.printConfigurationForm = this.formBuilder.group({
      orawyd: [null],
      barcodeDesc: [null],
      model: [null],
      totalQty: [null]
    });
    this.formGroup = this.formBuilder.group({
      currentQty: [null],
      vinid: [null],
      devanningData: this.formBuilder.array([this.createForm()])
    });
    this.getDevanningPrintList();
  }

}
