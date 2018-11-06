import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShowMessageService } from '../../../../widget/show-message/show-message';
import { BillTypeService, BillTypeServiceNs } from '../../../../core/trans/billType.service';
enum MaxLenInputEnum {
  InnerOrder = 30,
  InnerOrderNote = 50
}
@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit {
  maxLenInputEnum = MaxLenInputEnum;
  @Output() finish: EventEmitter<any>;
  @Input() detailId: string;
  inOrOutType: string;
  FormGroup: FormGroup;
  controlArray: Array<{ id: number, controlInstance: string, controlInstanceNum: string }> = [];


  constructor(private formBuilder: FormBuilder,
    private messageService: ShowMessageService,
    private billTypeService: BillTypeService) {
    this.finish = new EventEmitter<any>();
    this.inOrOutType = '0';
  }
  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = (this.controlArray.length > 0) ? this.controlArray[this.controlArray.length - 1].id + 1 : 0;
    const control = {
      id,
      controlInstance: `passenger${id}`,
      controlInstanceNum: `passenge${id}`,
    };
    const index = this.controlArray.push(control);
    // this.FormGroup.addControl(this.controlArray[index - 1].controlInstance,
    //   new FormControl(null, [Validators.maxLength(this.maxLenInputEnum.InnerOrder)]));
    // this.FormGroup.addControl(this.controlArray[index - 1].controlInstanceNum,
    //   new FormControl(null, [Validators.maxLength(this.maxLenInputEnum.InnerOrderNote)]));

      this.FormGroup.addControl(this.controlArray[index - 1].controlInstance,
        this.formBuilder.control(null, [Validators.maxLength(this.maxLenInputEnum.InnerOrderNote)]));
      this.FormGroup.addControl(this.controlArray[index - 1].controlInstanceNum,
        this.formBuilder.control(null, [Validators.maxLength(this.maxLenInputEnum.InnerOrder)]));
  }
  removeField(i: { id: number, controlInstance: string, controlInstanceNum: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.controlArray.length > 1) {
      const index = this.controlArray.indexOf(i);
      this.controlArray.splice(index, 1);
      this.FormGroup.removeControl(i.controlInstance);
    }
  }

  public emitFinish() {
    this.finish.emit();
  }

  public submitBillType() {
    Object.keys(this.FormGroup.controls).forEach((keys: string) => {
      this.FormGroup.controls[keys].markAsDirty();
      this.FormGroup.controls[keys].updateValueAndValidity();
    });
    if (this.FormGroup.invalid) {
      return;
    }
    const detailList: any[] = [];
    for (let i = 0, len = this.controlArray.length; i < len; i++) {
      detailList.push({
        innerOrder: this.FormGroup.controls[this.controlArray[i].controlInstanceNum].value + '',
        innerOrderNote: this.FormGroup.controls[this.controlArray[i].controlInstance].value + '',
      });
    }
    let data = <any>{};
    data = {
      detailList: detailList,
      inOut: this.inOrOutType,
      moveType: this.FormGroup.controls['moveType'].value,
      type: this.FormGroup.controls['type'].value
    };
    let submit: any;
    if (this.detailId) {
      data.id = this.detailId;
      submit = this.billTypeService.updateBillType(data);
    } else {
      submit = this.billTypeService.addBillType(data);
    }
    this.subFunc(submit);
  }
  public subFunc(submit) {
    submit.subscribe((resData: BillTypeServiceNs.UfastHttpResT<any>) => {
      if (resData.code === 0) {
        this.messageService.showToastMessage('操作成功', 'success');
      } else {
        this.messageService.showToastMessage(resData.message, 'warning');
      }
      this.emitFinish();
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  public getBillTypeDetail() {
    this.billTypeService.getBillTypeDetail(this.detailId).subscribe((resData: BillTypeServiceNs.UfastHttpResT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.FormGroup.patchValue({
        type: resData.value.type,
        moveType: resData.value.moveType,
      });
      this.inOrOutType = resData.value.inOut + '';
      /**动态创建表单并赋值 */
      for (let i = 1, len = resData.value.detailList.length; i < len; i++) {
        const id = i;
        const control = {
          id,
          controlInstance: `passenger${id}`,
          controlInstanceNum: `passenge${id}`,
        };
        this.controlArray.push(control);
        // this.FormGroup.addControl(this.controlArray[i].controlInstance, new FormControl(null, Validators.required));
        this.FormGroup.addControl(this.controlArray[i].controlInstance, this.formBuilder.control(null));
        // this.FormGroup.addControl(this.controlArray[i].controlInstanceNum, new FormControl(null, Validators.required));
        this.FormGroup.addControl(this.controlArray[i].controlInstanceNum, this.formBuilder.control(null));

      }
      resData.value.detailList.forEach((item, index) => {
        this.FormGroup.controls[this.controlArray[index].controlInstanceNum].patchValue(item.innerOrder);
        this.FormGroup.controls[this.controlArray[index].controlInstance].patchValue(item.innerOrderNote);
      });
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }


  ngOnInit() {
    this.FormGroup = this.formBuilder.group({
      type: [null, [Validators.required]],
      moveType: [null],
      controlArray: [null]
    });
    this.addField();
    if (this.detailId) {
      this.getBillTypeDetail();
    }
  }

}
