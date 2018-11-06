import { Component, OnInit, Input } from '@angular/core';
import {PrintServiceNs} from '../../core/trans/print.service';
import {LodopPrintService, LodopPrintServiceNs} from '../../core/infra/lodop-print.service';
import {localDataKeyObj} from '../../../environments/environment';
import {UfastUtilService} from '../../core/infra/ufast-util.service';
export namespace PrintOrderTplComNs {
  export interface DataModel {
    config: PrintServiceNs.TemplateItemModel;
    data: {
      headerInfo: any;
      dataList: any[];
    };
    printTempBdDiction: any;
    cacheHeaderFootDiction: any;
  }

  export interface FormatDataModel {
    contentSetting: any;
    pageSetting: any;
    footerColInfo: any;
    bodyColumnInfo: any;
    headerColInfo: any;
  }
}
@Component({
  selector: 'app-print-order-tpl',
  templateUrl: './print-order-tpl.component.html',
})
export class PrintOrderTplComponent implements OnInit {
  @Input()
  set data(value: PrintOrderTplComNs.DataModel) {
    this._data = value;
    if (!this._formatData) {
      try {
        this.copyBodyOrHeader(JSON.parse(value.config.headerFooterColumnInfo), JSON.parse(value.config.bodyColumnInfo));
        this.contentSetting = JSON.parse(value.config.contentSetting);
        this.pageSetting = JSON.parse(value.config.pageSetting);
        this.setPrinter();
      } catch (e) {
      }
      this.setPreviewStyle(this._preview);
    }
  }
  @Input()
  set formatData(value: PrintOrderTplComNs.FormatDataModel) {
    this._formatData = value;
    this.contentSetting = value.contentSetting;
    this.pageSetting = value.pageSetting;
    this.bodyColumnInfo = value.bodyColumnInfo;
    this.headerColInfo = value.headerColInfo;
    this.footerColInfo = value.footerColInfo;
    this.setPrinter();
    this.setPreviewStyle(this._preview);
  }
  @Input()
  set preview(value: boolean) {
    this._preview = value;
    this.setPreviewStyle(value);
  }
  headerColInfo: any[];
  footerColInfo: any[];
  bodyColumnInfo: any[];
  pageSetting: {paperMargin: any; paperConfig: any; printDir: number };
  contentSetting: any;
  _data: PrintOrderTplComNs.DataModel;
  paperPadding: string;
  _formatData: PrintOrderTplComNs.FormatDataModel;
  _preview: boolean;
  previewStyle: any;
  constructor(private utilService: UfastUtilService, private lodopService: LodopPrintService) {
    this.preview = false;
    this._formatData = null;
    this.paperPadding = '';
    this.contentSetting = {};
    this.pageSetting = {
      paperMargin: {},
      paperConfig: {},
      printDir: LodopPrintServiceNs.PageSizeDir.Default
    };
  }
  private setPreviewStyle(value: boolean) {
    if (value) {
      this.previewStyle = this.pageSetting;
      this.previewStyle.borderWidth = '1px';
    } else {
      this.previewStyle = {
        paperConfig: {
          width: '100%',
          height: '100%',
          unit: ''
        },
        paperMargin: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          unit: ''
        },
        borderWidth: '0'
      };
    }
  }
  private setPrinter () {
    this.lodopService.initPrintTask();
    const printer = this.utilService.getLocalData(localDataKeyObj.invoicePrinterKey);
    this.lodopService.setPrinter(printer);
    if (this.pageSetting.printDir === null || this.pageSetting.printDir === undefined) {
      this.pageSetting.printDir = LodopPrintServiceNs.PageSizeDir.Default;
    }
    this.lodopService.setPageSize(this.pageSetting.printDir, this.pageSetting.paperConfig.width,
      this.pageSetting.paperConfig.height, '');
    this.lodopService.setPrintMode('FULL_WIDTH_FOR_OVERFLOW', false);
    this.lodopService.setPrintMode('FULL_HEIGHT_FOR_OVERFLOW', false);
    this.lodopService.setPrintMode('RESELECT_PAGESIZE', true);
    this.lodopService.setPrintMargin({
      top: this.pageSetting.paperMargin.top + 'mm',
      bottom: this.pageSetting.paperMargin.bottom + 'mm',
      left: this.pageSetting.paperMargin.left + 'mm',
      right: this.pageSetting.paperMargin.right + 'mm',
    });

  }
  public copyBodyOrHeader(headAndFooter?: any[], body?: any[]) {
    if (headAndFooter) {
      this.headerColInfo = [];
      this.footerColInfo = [];
      headAndFooter.forEach((item: any) => {
        const obj = {};
        Object.keys(item).forEach((key: string) => {
          obj[key] = item[key];
        });
        if (item.isHeader) {
          this.headerColInfo.push(obj);
        } else {
          this.footerColInfo.push(obj);
        }
      });
    }
    if (body) {
      this.bodyColumnInfo = [];
      body.forEach((item: any) => {
        const obj = {};
        Object.keys(item).forEach((key: string) => {
          obj[key] = item[key];
        });
        this.bodyColumnInfo.push(obj);
      });
    }
  }
  ngOnInit() {
  }

}
