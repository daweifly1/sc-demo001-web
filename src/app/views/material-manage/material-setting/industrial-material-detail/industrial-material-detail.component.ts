import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FactoryMineService, FactoryMineServiceNs } from '../../../../core/trans/factoryMine.service';
import { ShowMessageService } from '../../../../widget/show-message/show-message';
import { Services } from '@angular/core/src/view';
enum MaterialType {
  Material,
  SparePart,
  Equipment
}
@Component({
  selector: 'app-industrial-material-detail',
  templateUrl: './industrial-material-detail.component.html',
  styleUrls: ['./industrial-material-detail.component.scss']
})
export class IndustrialMaterialDetailComponent implements OnInit {
  @Output() finish: EventEmitter<any>;
  @Input() detailId: string;
  materialInfo: any;
  factoryInformation: any;
  locationDataSet: {
    id: string,
    storageSpaceId: string,
    storageCode: string,
    keeperId: string,
    keeperName: string,
    isDefault: number,
    _checked: boolean,
    materialId: string
  }[];

  constructor(private fb: FormBuilder,
    private messageService: ShowMessageService, private factoryMineService: FactoryMineService) {
    this.finish = new EventEmitter<any>();
    this.materialInfo = {};
    this.factoryInformation = {};
  }
  public trackByNewsId(index: number, item: any) {
    return item.id;
  }

  // 详情
  getItemData = () => {
    this.factoryMineService.getIndustrialMaterialDetail(this.detailId).subscribe((resData) => {
      if (resData.code !== 0) {
        this.messageService.showAlertMessage('', resData.message, 'warning');
        return;
      }
      this.materialInfo = resData.value.materialVO;
      this.factoryInformation = resData.value;
      this.locationDataSet = resData.value.factoryMaterialSpaceVOS;
    }, (error: any) => {
      this.messageService.showAlertMessage('', error.message, 'error');
    });
  }

  public emitFinish() {
    this.finish.emit();
  }
  ngOnInit() {
    this.getItemData();

  }

}
