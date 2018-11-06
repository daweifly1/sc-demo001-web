import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { UfastTableNs } from '../../../../layout/layout.module';
import { DispatchBillService, DispatchBillServiceNs } from '../../../../core/trans/dispatch-bill.service';
import { ShowMessageService } from '../../../../widget/show-message/show-message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { UploadFile } from 'ng-zorro-antd';
import {UfastValidatorsService} from '../../../../core/infra/validators/validators.service';


enum MaxLenInputEnum {
  Default = 50,
  IdCard = 18
}
@Component({
  selector: 'app-batch-logistics-delivery',
  templateUrl: './batch-logistics-delivery.component.html',
  styleUrls: ['./batch-logistics-delivery.component.scss']
})
export class BatchLogisticsDeliveryComponent implements OnInit {
  maxLenInputEnum = MaxLenInputEnum;
  tableConfig: UfastTableNs.TableConfig;
  @Output() finish: EventEmitter<any>;
  @Input() orderList: DispatchBillServiceNs.ShippingInformationList[]; // 接口获取的发货信息 点击批量物流带过来的
  informationForm: FormGroup; // 接口获取的物流信息
  fileList: any;   // 物流附件
  fileServiceUrl: string;
  previewImage: string;
  previewVisible: boolean;
  deliveryDate: string; // 发货时间
  uploadUrl: string;
  constructor(private dispatchBillService: DispatchBillService,
    private messageService: ShowMessageService,  private ufastValidatorsService: UfastValidatorsService,
    private formBuilder: FormBuilder) {
    this.uploadUrl = environment.baseUrl.bs + '/uploading/file';
    this.finish = new EventEmitter<any>();
    this.orderList = [];
    this.fileList = [];
    this.fileServiceUrl = environment.otherData.fileServiceUrl; // 文件服务器url
    this.previewImage = '';
    this.previewVisible = false;
    this.deliveryDate = '';

  }

  public emitFinish() {
    this.finish.emit();
  }
  // deliveryDateChange(event): void {
  //   console.log(event);
  //   this.informationForm.value.deliveryDate = event;
  // }
  uploadFileChange($event) {
    if ($event.type === 'progress' || $event.type === 'start') {
      return;
    }
    if ($event.file.status === 'removed') {
      this.fileList.length--;
      return;
    }
    if (this.fileList[0].response.code !== 0) {
      this.messageService.showAlertMessage('', '附件上传失败', 'error');
      this.fileList = [];
      return;
    }
    if (!/\.(jpg|png|jepg)$/.test(this.fileList[0].response.value)) {
      this.messageService.showAlertMessage('', '请上传图片', 'error');
      this.fileList = [];
      return;
    }
    this.informationForm.value.logisticsAttach = this.fileList[0].response.value;

  }
  // 物流附件查看关闭
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
  public dispatch() {
    Object.keys(this.informationForm.controls).forEach((keys: string) => {
      this.informationForm.controls[keys].markAsDirty();
      this.informationForm.controls[keys].updateValueAndValidity();
    });
    if (this.informationForm.invalid) {
      return;
    }
    const data = this.informationForm.value;
    const idList = [];
    this.orderList.forEach((item) => {
      idList.push(item.invoiceNo);
    });
    this.dispatchBillService.batchDelivery(data, idList).subscribe((resData: DispatchBillServiceNs.UfastHttpResT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.messageService.showToastMessage('操作成功', 'success');
      this.finish.emit();
    }, (error) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }



  ngOnInit() {
    this.tableConfig = {
      pageSize: 10,
      showCheckbox: false,
      showPagination: true,
      pageSizeOptions: [10, 20, 30, 40, 50],
      pageNum: 1,
      total: 0,
      loading: false,
      headers: [
        { title: '发货类型', field: 'deliveryType', width: 60, pipe: 'deliverGoodsType' },
        { title: '发货单号', field: 'invoiceNo', width: 100 },
        { title: '采购合同号', field: 'purchaseNo', width: 150 },
        { title: '合同类型', field: 'contractType', width: 80, pipe: 'contractType' },
        { title: '业务实体', field: 'businessEntity', width: 80 },
        { title: '收货方', field: 'goodsReceivor', width: 100 },
        { title: '收单方', field: 'billReceivor', width: 100 }
      ]
    };
    this.informationForm = this.formBuilder.group({
      logisticsNo: ['', [Validators.required]],
      logisticsContact: ['', [Validators.required]],
      logisticsAttach: [''],
      logisticsCompany: ['', [Validators.required]],
      logisticsPhone: ['', [Validators.required, this.ufastValidatorsService.mobileOrTeleValidator()]],
      logisticsContactIdCard: [null, [Validators.maxLength(this.maxLenInputEnum.IdCard), this.ufastValidatorsService.idNoValidator()]],
      deliveryDate: ['', [Validators.required]],
      licensePlate: ['']
    });
  }

}
