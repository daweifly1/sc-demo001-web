import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, ControlContainer, FormArray } from '@angular/forms';
import { VendorService, VendorServiceNs } from '../../../core/trans/vendor.service';
import { ShowMessageService } from '../../../widget/show-message/show-message';


@Component({
  selector: 'app-add-vendors',
  templateUrl: './vendor-manage.component.html',
  styleUrls: ['./vendor-manage.component.scss']
})
export class VendorManageComponent implements OnInit {
  newVendorForm: FormGroup;
  vendorTableConfig: any;
  vendorList: VendorServiceNs.VendorInfoModel[];
  selectedVendorList: string[];
  PageType: any;
  selectedPage: number;
  dateFormat = 'yyyy/MM/dd';
  editid: string;
  detailVendor: FormGroup;
  advancedSearch: boolean;
  dateRange = [];

  // information = ['基本资料', '企业联系人', '资质文件信息', '评价等级'];

  // 企业联系人的赋值
  i = 1;
  editCache = {};
  dataSet = [
    {
      key: '0',
      name: '姓名',
      position: '职务',
      mobile: '电话',
      mail: '邮箱'
    }
  ];

  constructor(private formBuilder: FormBuilder,
    private messageService: ShowMessageService,
    private vendorService: VendorService
  ) {
    this.advancedSearch = false;
    this.PageType = {
      MainListPage: 0,
      AddPage: 1,
      EditPage: 2,
      LookPage: 3
    };
    this.selectedPage = this.PageType.MainListPage;
    this.vendorTableConfig = {
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      allChecked: false,
      pageSizeOptions: [10, 20, 30, 40, 50],
      filters: {},
      headers: [
        {
          name: '序号',
          field: 'id',
          width: '120px'
        }, {
          name: '统一社会信用代码',
          field: 'unifiedSocialCreditcode',
          width: '150px',
        }, {
          name: '公司名称',
          field: 'companyName',
          width: '150px',
        }, {
          name: '经营类型',
          field: 'businessType',
          width: '120px',
          pipe: 'businessType'
        }, {
          name: '注册状态',
          field: 'state',
          width: '100px'
        }, {
          name: '等级',
          field: 'levelRate',
          width: '100px'
        }]
    };
    this.vendorList = [];
    this.editid = '';
  }

  // 企业联系人表单
  // get connecters() {
  //   return this.newVendorForm.get('connecters') as FormArray;
  // }

  // private createForm(connecter?) {
  //   connecter = connecter || {};
  //   return this.formBuilder.group({
  //     name: [connecter.name || '', Validators.required],
  //     position: [connecter.position || '', Validators.required],
  //     mobile: [connecter.mobile || '', Validators.required],
  //     mail: [connecter.mail || '', Validators.required]
  //   });
  // }

  // public newForm(data) {
  //   if (data.controls.length === 3) { return; }
  //   const arr = this.newVendorForm.get('connecters') as FormArray;
  //   arr.push(this.createForm());
  // }
  // public removeForm(i: number) {
  //   if (i === 0) { return; }
  //   const arr = this.newVendorForm.get('connecters') as FormArray;
  //   arr.removeAt(i);
  // }
  public showAdvanced() {
    this.advancedSearch = !this.advancedSearch;
  }
  public resetSearch() {
    this.vendorTableConfig.filters = {};
  }
  public getVendors(pageNum?: number): void {
    const body = {
      filters: this.vendorTableConfig.filters,
      pageSize: this.vendorTableConfig.pageSize,
      pageNum: pageNum || this.vendorTableConfig.pageNum
    };
    this.vendorTableConfig.loading = true;
    this.vendorService.getVendorList(body).subscribe((resData: VendorServiceNs.VendorListResModel) => {
      this.vendorTableConfig.loading = false;
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      this.vendorList = resData.value.list;
      this.vendorTableConfig.total = resData.value.total;
    }, (error: any) => {
      this.vendorTableConfig.loading = false;
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }
  public trackByTableHead(index: number, header: any) {
    return header.field;
  }
  public trackByVendorId(index: number, vendor: VendorServiceNs.VendorInfoModel) {
    return vendor.id;
  }
  public checkAll(value: boolean) {
    this.selectedVendorList = [];
    for (let i = 0, len = this.vendorList.length; i < len; i++) {
      this.vendorList[i].checked = value;
      if (value) {
        this.selectedVendorList.push(this.vendorList[i].id);
      }
    }
  }

  public checkSingle(value: boolean, item: VendorServiceNs.VendorInfoModel) {
    if (value) {
      this.selectedVendorList.push(item.id);
      if (this.selectedVendorList.length === this.vendorList.length) {
        this.vendorTableConfig.allChecked = true;
      }
    } else {
      this.vendorTableConfig.allChecked = false;
    }
  }

  public toggleManagePage() {
    this.selectedPage = this.PageType.MainListPage;
    this.newVendorForm.reset();
  }

  public switchTab(pageType: string, id?: string) {
    if (pageType === 'addVendor') {
      this.selectedPage = 1;
      this.newVendorForm.addControl('accountName', this.formBuilder.control(null, [Validators.required]));
      this.newVendorForm.addControl('password', this.formBuilder.control(null, [Validators.required]));
      // this.setConnecters([{}]);
    }
    if (pageType === 'editVendor') {
      this.selectedPage = 2;
      this.newVendorForm.removeControl('accountName');
      this.newVendorForm.removeControl('password');
      this.editid = id;
      this.getVendor(id);

    }
    if (pageType === 'lookOver') {
      this.selectedPage = 3;
      this.getVendor(id);
    }
  }

  // private setConnecters(connecters) {
  //   const addressFGs = connecters.map(connecter => this.createForm(connecter));
  //   const addressFormArray = this.formBuilder.array(addressFGs);
  //   this.newVendorForm.setControl('connecters', addressFormArray);
  // }

  private getVendor(id: string) {
    this.vendorService.getVendor(id).subscribe((resData: VendorServiceNs.VendorResModelT<any>) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'error');
        return;
      }
      if (this.selectedPage === 2) {
        this.newVendorForm.patchValue(resData.value);
        this.newVendorForm.patchValue({establishDate: new Date(resData.value.establishDate)});
        // this.setConnecters(resData.value.connecters);
      }
      if (this.selectedPage === 3) {
        this.detailVendor = resData.value;
      }
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });

  }

  public submitVendor(form) {
    for (const i of Object.keys(this.newVendorForm.controls)) {
      this.newVendorForm.controls[i].markAsDirty();
      this.newVendorForm.controls[i].updateValueAndValidity();
    }
    if (!form.valid) {
      return;
    }
    // form.value.connecters[0].master = true;
    if (this.selectedPage === 1) {
      this.vendorService.addVendor(form.value).subscribe((resData: VendorServiceNs.VendorListResModel) => {
        if (resData.code !== 0) {
          this.messageService.showAlertMessage('出错啦', resData.message, 'error');
          return;
        }
        this.selectedPage = this.PageType.MainListPage;
        this.newVendorForm.reset();
      }, (error: any) => {
        this.messageService.showAlertMessage('', error.message, 'error');
      });
    } else {
      form.value.id = this.editid;
      this.vendorService.updateVendor(form.value).subscribe((resData: VendorServiceNs.VendorListResModelT<any>) => {
        if (resData.code !== 0) {
          this.messageService.showAlertMessage('出错啦', resData.message, 'warning');
          return;
        }
        this.selectedPage = this.PageType.MainListPage;
      }, (error: any) => {
        this.messageService.showAlertMessage('', error.message, 'error');
      });
    }
    this.getVendors();

  }

  // 企业联系人表格用到的方法
  // public addRow(): void {
  //   this.i++;
  //   if (this.i > 3) { return; }
  //   this.updateEditCache();
  // }
  // public updateEditCache(): void {
  //   this.dataSet.forEach(item => {
  //     if (!this.editCache[item.key]) {
  //       this.editCache[item.key] = {
  //         edit: false,
  //         name: item.name,
  //         position: item.position,
  //         mobile: item.mobile,
  //         mail: item.mail
  //       };
  //     }
  //   });
  // }


  ngOnInit() {
    this.getVendors();
    this.newVendorForm = this.formBuilder.group({
      companyName: [null],
      shortName: [null],
      unifiedSocialCreditcode: [null],
      companyType: [null],
      address: [null],
      legalName: [null],
      registeredCapital: [null],
      establishDate: [null],
      mobile: [null],
      fax: [null],
      bank: [null],
      areaCode: [null],
      bankAccount: [null],
      business: [null],
      businessScope: [null],
      businessType: [null],
      introduction: [null],
      website: [null],
      mailAddress: [null],
      zipCode: [null],
      erpCode: [null],
      // connecters: this.formBuilder.array([this.createForm()])
    });
    this.detailVendor = this.formBuilder.group({
      accountName: [null, Validators.required],
      companyName: [null, Validators.required],
      shortName: [null],
      unifiedSocialCreditcode: [null, Validators.required],
      companyType: [null, Validators.required],
      address: [null, Validators.required],
      legalName: [null, Validators.required],
      registeredCapital: [null, Validators.required],
      establishDate: [null, Validators.required],
      mobile: [null, Validators.required],
      fax: [null, Validators.required],
      bank: [null, Validators.required],
      areaCode: [null, Validators.required],
      bankAccount: [null, Validators.required],
      business: [null, Validators.required],
      businessScope: [null, Validators.required],
      businessType: [null, Validators.required],
      introduction: [null, Validators.required],
      website: [null, Validators.required],
      mailAddress: [null, Validators.required],
      zipCode: [null, Validators.required],
      erpCode: [null],
      // connecters: this.formBuilder.array([this.createForm()])
    });
    // 企业联系人初始化
    // this.updateEditCache();
  }



}
