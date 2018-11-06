import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShowMessageService} from '../../../../widget/show-message/show-message';
import {MaterialDivisionManagementVO} from '../../../../core/vo/material/MaterialDivisionManagementVO';
import {MaterialDivisionManagementService} from '../../../../core/trans/material/MaterialDivisionManagementService';

@Component({
  selector: 'app-division-management-add',
  templateUrl: './division-management-add.html',
  styleUrls: ['./division-management-add.scss']
})
export class DivisionManagementAddComponent implements OnInit {
  form: FormGroup;
  @Output() backToListPage: EventEmitter<any>;
  @Input() dataItem: MaterialDivisionManagementVO;
  salesmanVOs = [{'salesmanId': '1', 'salesmanName': '张三'},
    {'salesmanId': '2', 'salesmanName': '李四'},
    {'salesmanId': '3', 'salesmanName': '王五'}
  ];

  constructor(private fb: FormBuilder, private divisionManagementService: MaterialDivisionManagementService,
              private messageService: ShowMessageService) {
    this.backToListPage = new EventEmitter<any>();
    this.dataItem = null;
  }

  ngOnInit() {
    this.form = this.fb.group({
      divisionName: [null, [Validators.required]],
      salesmanId: [null, [Validators.required]]
    });

    if (this.dataItem) {
      this.setFormValue(this.dataItem);
    }
  }

  /**
   * 填充表单数据
   * @param {MaterialDivisionManagementVO} dataItem
   */
  setFormValue(dataItem: MaterialDivisionManagementVO) {
    this.form.patchValue(
      {
        divisionName: dataItem.divisionName + '',
        salesmanId: dataItem.salesmanId
      }
    );
  }

  /**
   * 表单提交、验证
   */
  submitForm(): void {
    Object.keys(this.form.value).forEach((item) => {
      this.form.controls[item].markAsDirty();
      this.form.controls[item].updateValueAndValidity();
    });
    if (!this.form.valid) {
      return;
    }
    this.messageService.showLoading('正在提交');
    this.saveData();
  }

  /**
   * 数据保存
   */
  saveData() {
    if (this.form.value.salesmanId) {
      this.form.value.salesmanId = Number(this.form.value.salesmanId);
    }
    const param: MaterialDivisionManagementVO = this.form.value;
    const selectedSalemanVOs = this.salesmanVOs.filter((item) => {
      return item.salesmanId == this.form.value.salesmanId;
    });
    if (this.salesmanVOs.length > 0) {
      param.salesmanName = selectedSalemanVOs[0].salesmanName;
    }

    let service: any = this.divisionManagementService.insert(param);
    if (!!this.dataItem) {
      const updataParam = {...param, id: this.dataItem.id};
      service = this.divisionManagementService.update(updataParam);
    }
    service.subscribe((resData) => {
      this.messageService.closeLoading();
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.messageService.showToastMessage('操作成功', 'success');
      this.back();
    });
  }

  /**
   * 触发返回列表事件
   */
  back(): void {
    this.backToListPage.emit();
  }
}
