import { Component, Injectable} from '@angular/core';
import {NzModalRef, NzModalService} from 'ng-zorro-antd';
import {ShowMessageService} from '../show-message/show-message';
import {PrintService, PrintServiceNs} from '../../core/trans/print.service';
import {LodopPrintService, LodopPrintServiceNs} from '../../core/infra/lodop-print.service';
import { PrintOrderTplComponent, PrintOrderTplComNs} from '../../layout/print-order-tpl/print-order-tpl.component';
import {concatMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {PrintErrorService} from '../print-error/print-error';

export namespace PrintTplSelectorNs {
  export interface TplDataModel {
    headerInfo: any;      // 单据头部信息
    dataList: any[];      // 单据列表信息
    printConfig: any;     // 单据的打印配置项
  }
}


@Injectable()
export class PrintTplSelectorService {
  public modalSubject: NzModalRef;
  private tplData: PrintTplSelectorNs.TplDataModel;
  constructor( private modalService: NzModalService, private messageService: ShowMessageService,
               private printErrorService: PrintErrorService, private lodopService: LodopPrintService) {
  }
  public showTplSelector(data: PrintTplSelectorNs.TplDataModel): Observable<any> {
    if (!this.lodopService.isInitSuccess()) {
      this.printErrorService.showInitError();
      return;
    }
    this.tplData = data;
    this.modalSubject = this.modalService.create({
      nzTitle: '选择打印模板',
      nzContent: PrintTplSelectorComponent,
      nzMaskClosable: true,
      nzFooter: null,
      nzClosable: true,
    });
    return this.modalSubject.afterClose.pipe(concatMap((type: string) => {
      return Observable.of('');
    }));
  }
  public getTplData(): PrintTplSelectorNs.TplDataModel {
    return this.tplData;
  }
}


@Component({
  templateUrl: './print-tpl-selector.component.html',
  styleUrls: ['./print-tpl-selector.component.scss']
})
export class PrintTplSelectorComponent {
  templateList: PrintServiceNs.TemplateItemModel[];
  selectedIndex: number;
  private tplData:  PrintTplSelectorNs.TplDataModel;
  constructor(private printService: PrintService, private msgService: ShowMessageService, private selfService: PrintTplSelectorService,
              private lodopService: LodopPrintService
              ) {
    this.tplData = this.selfService.getTplData();
    this.selectedIndex = null;
    const filterBody = {
      CurPage: '1',
      PageSize: '0',
      TemplateType: this.tplData.printConfig.TemplateType
    };
    this.templateList = [];
    this.selectedIndex = 0;
    this.printService.getTemplateList(filterBody).subscribe((resData: PrintServiceNs.UfastHttpRes) => {
      if (resData.code !== 0) {
        this.msgService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.templateList = resData.value;
      for (let i = 0, len = this.templateList.length; i < len; i++) {
        if (this.templateList[i].isDel) {
          this.selectedIndex = i;
          break;
        }
      }
    }, (error: any) => {
      this.msgService.showAlertMessage('', error.message, 'error');
    });
  }
  public previewTpl() {
    this.setPrint(true);
  }
  public printTpl() {
    this.setPrint(false);
  }
  private setPrint(isPre: boolean) {
    if (this.selectedIndex === null) {
      this.selfService.modalSubject.destroy('onCancel');
      return;
    }
    const data: PrintOrderTplComNs.DataModel = {
      cacheHeaderFootDiction: this.tplData.printConfig.cacheHeaderFootDiction,
      printTempBdDiction: this.tplData.printConfig.printTempBdDiction,
      config: this.templateList[this.selectedIndex],
      data: {
        headerInfo: this.tplData.headerInfo,
        dataList: this.tplData.dataList
      }
    };
    let handler: Promise<any>;
    if (isPre) {
      handler = this.lodopService.preview(PrintOrderTplComponent, data, 'data');
    } else {
      handler = this.lodopService.print(PrintOrderTplComponent, data, 'data');
    }
    this.msgService.showToastMessage('已发送打印指令', 'success');
    this.selfService.modalSubject.destroy('onOk');
    handler.then(() => {
    }, () => {
      this.msgService.showToastMessage('打印出错', 'error');
    });
  }
}

