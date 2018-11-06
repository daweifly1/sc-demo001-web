import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { UfastTableNs } from '../../../layout/ufast-table/ufast-table.component';
import { MaterialManageService, MaterialManageServiceNs } from '../../../core/trans/materialManage.service';
import { ShowMessageService } from '../../../widget/show-message/show-message';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActionCode} from '../../../../environments/actionCode';
interface TabPageType {
  ManagePage: number;
  ReportPage: number;
}
enum MaxLenInputEnum {
  Default = 50
}
interface ButtonState {
  Pass: boolean;
  Reject: boolean;
}
@Component({
  selector: 'app-material-report',
  templateUrl: './material-report.component.html',
  styleUrls: ['./material-report.component.scss']
})

export class MaterialReportComponent implements OnInit {
  maxLenInputEnum = MaxLenInputEnum;
  tabPageType: TabPageType;
  selectedPage: number;
  materialReportList: {
    id?: string;
    materialDesc?: string;
    materialType?: string;
    firstLevel?: string;
    secondLevel?: string;
    thirdLevel?: string;
    materialLevel?: string;
    firstType?: string;
    secondType?: string;
    thirdType?: string;
    name?: string; // 物料名称
    formerName?: string; // 曾用名
    unit?: string;
    specificationModel?: string; // 型号规格
    drawingNumber?: string; // 图号
    material?: string; // 材质
    brand?: string; // 品牌
    importOrDomestic?: string; // 进口国产,下拉框
    importance?: string; // 重要度，下拉框
    materialClassification?: string; // 物资分类，下拉框
    reportUserName?: string; // 提报人
    reportDept?: string; // 提报部门
    createDate?: string; // 提报时间
    _checked?: boolean;
    status?: number;
  }[];
  unitType: any;
  allChecked = false;
  filters: any;
  materialClass: any;


  form: FormGroup;
  reportData: any;
  reportFlag: number;
  fullSearchShow: boolean;
  materialClassArry: any[];
  tableConfig: UfastTableNs.TableConfig;
  ActionCode = ActionCode;
  buttonState: {[index: string]: ButtonState};
  constructor(private materialManageService: MaterialManageService, private messageService: ShowMessageService, private fb: FormBuilder) {
    this.tabPageType = {
      ManagePage: 0,
      ReportPage: 1
    };
    this.selectedPage = this.tabPageType.ManagePage;
    this.materialReportList = <any>[];
    this.filters = <any>{};
    this.fullSearchShow = false;
    this.reportFlag = 0;
    this.buttonState = {};
  }
  public getDataList = (pageNum?: number, pageSize?: number) => {
    Object.keys(this.filters).filter(item => typeof this.filters[item] === 'string').forEach((key: string) => {
      this.filters[key] = this.filters[key].trim();
    });
    if (this.materialClass) {
      this.filters.firstType = this.materialClass[0];
      this.filters.secondType = this.materialClass[1];
      this.filters.thirdType = this.materialClass[2];
    }
    const filter = {
      pageNum: this.tableConfig.pageNum,
      pageSize: this.tableConfig.pageSize,
      filters: this.filters
    };
    this.materialManageService.getMaterialReportList(filter).subscribe((resData: MaterialManageServiceNs.UfastHttpAnyResModel) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.materialReportList = resData.value.list;
      this.materialReportList.forEach((item) => {
        this.buttonState[item.id] = {
          Pass: item.status === MaterialManageServiceNs.AuditStatus.Wait,
          Reject: item.status === MaterialManageServiceNs.AuditStatus.Wait,
        };
      });
      this.materialReportList.forEach((item) => {
        item.materialLevel = item.firstLevel + '/' + item.secondLevel + '/' + item.thirdLevel;
      });
    });
  }

  public fullSearch() {
    this.fullSearchShow = !this.fullSearchShow;
  }

  public fullSearchClose() {
    this.fullSearchShow = false;
  }

  public advanceSearchReset() {
    Object.keys(this.filters).forEach((item: string) => {
      this.filters[item] = '';
    });
    this.materialClass = [];
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

  selectMaterialClassItem(selectedItem) {
    if (selectedItem.option.isLeaf) {
      return;
    }
    selectedItem.option.children.shift();
    this.getMaterialClass(selectedItem.option.value, selectedItem.option.children);
  }


  refreshStatus(): void {
    this.allChecked = this.materialReportList.every((item) => {
      return item._checked === true;
    });
  }

  checkAll(value: boolean): void {
    this.checkAll ? this.isAllChoose(true) : this.isAllChoose(false);
    this.materialReportList.forEach(data => data._checked = value);
    this.refreshStatus();
  }

  public isAllChoose(isAllChoose: boolean): void {
    for (let i = 0, len = this.materialReportList.length; i < len; i++) {
      this.materialReportList[i]._checked = isAllChoose;
    }
  }
  public batchAuditPass() {
    const selectData = [];
    let audited = false;
    this.materialReportList.forEach((item) => {
      if (item._checked) {
        selectData.push(item);
      }
    });
    if (!selectData.length) {
      this.messageService.showToastMessage('请选择要通过的数据', 'warning');
      return;
    }
    selectData.forEach((item) => {
      if (item.status !== 0) {
        audited = true;
      }
      return;
    });
    if (audited) {
      this.messageService.showToastMessage( '所选数据包含已审核过的,请选择未审核的数据', 'warning');
      return; }
    // 批量通过
    const submit = this.materialManageService.materialReportBatchAuditPass(selectData);
    this.fun(submit);
  }
  public batchAuditNotPass() {
    const selectData = [];
    let audited = false;
    this.materialReportList.forEach((item) => {
      if (item._checked) {
        selectData.push(item);
      }
    });
    if (!selectData.length) {
      this.messageService.showToastMessage('请选择要拒绝的数据', 'warning');
      return;
    }
    selectData.forEach((item) => {
      if (item.status !== 0) {
        audited = true;
        return;
      }
    });
    if (audited) {
      this.messageService.showAlertMessage('', '所选数据包含已审核过的,请选择未审核的数据', 'error');
      return; }
    // 批量拒绝
    this.reportData = selectData;
    this.selectedPage = this.tabPageType.ReportPage;
    this.reportFlag = 2;
  }
  public auditPass(data) {
    if (!this.buttonState[data.id].Pass) {
      return;
    }
    const materialLevelList = data.materialLevel.split('/');
    data.firstLevel = materialLevelList[0];
    data.secondLevel = materialLevelList[1];
    data.thirdLevel = materialLevelList[2];
    const submit = this.materialManageService.materialReportAuditPass(data);
    this.fun(submit);
  }
  public aduitNotPass(data) {
    if (!this.buttonState[data.id].Reject) {
      return;
    }
    this.selectedPage = this.tabPageType.ReportPage;
    this.reportData = data;
    this.reportFlag = 1;
  }
  public confirm() {
    Object.keys(this.form.controls).forEach((item) => {
      this.form.controls[item].markAsDirty();
      this.form.controls[item].updateValueAndValidity();
    });
    if (!this.form.valid) {
      return;
    }
    const materialLevelList = this.reportData.materialLevel.split('/');
    this.reportData.firstLevel = materialLevelList[0];
    this.reportData.secondLevel = materialLevelList[1];
    this.reportData.thirdLevel = materialLevelList[2];
    if (this.reportFlag === 1) {
      this.reportData.auditRemark = this.form.value.auditRemark;
      const submit = this.materialManageService.materialReportAuditNotPass(this.reportData);
      this.fun(submit);
    } else {
      this.reportData.forEach((item) => {
        item.auditRemark = this.form.value.auditRemark;
        const submit = this.materialManageService.materialReportBatchAuditNotPass(this.reportData);
        this.fun(submit);
      });
    }
  }
  public fun(submit) {
    submit.subscribe((
      resData: MaterialManageServiceNs.UfastHttpAnyResModel) => {
      if (resData.code !== 0) {
        this.messageService.showToastMessage(resData.message, 'warning');
      }
      if (this.reportFlag) {
        this.selectedPage = this.tabPageType.ManagePage;
      }
      this.getDataList();
      this.messageService.showToastMessage('操作成功', 'success');
      this.form.controls['auditRemark'].patchValue(null);
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  public cancel() {
    this.selectedPage = this.tabPageType.ManagePage;
  }

  ngOnInit() {
    this.form = this.fb.group({
      auditRemark: [null, [Validators.required, Validators.maxLength(this.maxLenInputEnum.Default)]]
    });
    this.tableConfig = {
      pageSize: 10,
      showCheckbox: true,
      showPagination: true,
      checkRowField: '_checked',
      checkAll: false,
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageNum: 1,
      total: 0,
      loading: false,
      headers: [
        { title: '操作', field: 'materialName', width: 100, fixed: true },
      { title: '物料名称', field: 'materialName', width: 150, fixed: true },
      { title: '物料类别', field: 'materialType', width: 80, pipe: 'materialType2' },
      { title: '物料描述', field: 'firstLevel', width: 150 },
      { title: '分类', field: 'secondLevel', width: 150 },
      { title: '曾用名', field: 'thirdLevel', width: 100 },
      { title: '计量单位', field: 'unit', width: 150 },
      { title: '型号规格', field: 'status', width: 150, pipe: 'auditStatus' },
      { title: '图号', field: 'unit', width: 150 },
      { title: '材质', field: 'unit', width: 150 },
      { title: '品牌', field: 'unit', width: 150 },
      { title: '进口国产', field: 'unit', width: 150 },
      { title: '重要度', field: 'reportDept', width: 150 },
      { title: '物资分类', field: 'reportDept', width: 150 },
      { title: '提报人', field: 'reportUserName', width: 150 },
      { title: '提报部门', field: 'reportDept', width: 150 },
      { title: '提交时间', field: 'createDate', width: 150, pipe: 'date:yyyy-MM-dd HH:mm' }

      ]
    };
    this.getDataList();

  }

}
