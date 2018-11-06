import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MaterialCurrCompComponent } from '../../material-curr-comp/material-curr-comp.component';
import { ShowMessageService } from '../../../../widget/show-message/show-message';
import { MaterialManageService, MaterialManageServiceNs } from '../../../../core/trans/materialManage.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-material-add',
  templateUrl: './material-add.component.html',
  styleUrls: ['./material-add.component.scss']
})
export class MaterialAddComponent implements OnInit {
  isSaved: boolean;
  formValue: any;

  @Output() backToListPage: EventEmitter<any>;
  @Input() id: string;
  @ViewChild('currComp')
  currComp: MaterialCurrCompComponent;

  constructor(private materialManageService: MaterialManageService, private messageService: ShowMessageService) {
    this.isSaved = false;
    this.formValue = null;
    this.backToListPage = new EventEmitter<any>();
  }


  save(): void {
    this.formValue = this.currComp.outPutFormValue();
    if (this.formValue) {
      if (this.formValue.materialClassId instanceof Array) {
        this.formValue.firstType = this.formValue.materialClassId[0];
        this.formValue.secondType = this.formValue.materialClassId[1];
        this.formValue.thirdType = this.formValue.materialClassId[2];
        this.formValue.materialClassId = this.formValue.materialClassId.pop();
      } else {
        this.formValue.materialClassId = this.formValue.thirdType;
      }
      this.formValue.unit = this.formValue.unit;
      this.formValue.materialType = Number(this.formValue.materialType);
      if (this.id === null) {
        const param: MaterialManageServiceNs.MaterialTempModel = this.formValue;
        this.backFn(this.materialManageService.insertMaterialTempleteList(param));
      } else {
        const param: MaterialManageServiceNs.MaterialTempModel = this.formValue;
        param.id = this.id;
        param.deviceTemplateId = this.formValue.deviceTemplateId;
        this.backFn(this.materialManageService.updateMaterialTempleteItem(param));
      }
    }
    this.isSaved = true;
  }

  back(): void {
    this.backToListPage.emit();
  }

  public backFn = (service: Observable<MaterialManageServiceNs.UfastHttpAnyResModel>) => {
    service.subscribe((resData: MaterialManageServiceNs.UfastHttpAnyResModel) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.messageService.showToastMessage('操作成功', 'success');
      this.back();
    });
  }
  ngOnInit(): void {
    if (this.id) {
      const param = {
        id: this.id
      };
    }
  }
}
