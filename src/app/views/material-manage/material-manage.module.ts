import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialManageRoutingModule} from './material-manage-routing.module';
import {MaterialModelComponent} from './material-model/material-model.component';
import {LayoutModule} from '../../layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { MaterialAddComponent } from './material-model/material-add/material-add.component';
import { MaterialCurrCompComponent } from './material-curr-comp/material-curr-comp.component';
import { MaterialModelExamComponent } from './material-model-exam/material-model-exam.component';
import { MaterialSettingComponent } from './material-setting/material-setting.component';
import { MaterialSettingAddComponent } from './material-setting/material-setting-add/material-setting-add.component';
import { MaterialClassComponent } from './material-class/material-class.component';
import { MaterialClassAddComponent } from './material-class/material-class-add/material-class-add.component';
import { MaterialSettingDetailComponent } from './material-setting/material-setting-detail/material-setting-detail.component';
import { EquipmentModelComponent } from './equipment-model/equipment-model.component';
import { EquipmentModelAddComponent } from './equipment-model/equipment-model-add/equipment-model-add.component';
import { MaterialReportComponent } from './material-report/material-report.component';
import {DivisionManagementComponent} from './division-management/division-management.component';
import {DivisionManagementAddComponent} from './division-management/division-management-add/division-management-add';
import { IndustrialMaterialDetailComponent } from './material-setting/industrial-material-detail/industrial-material-detail.component';
import { DirectivesModule } from '../../directives/directives.module';
import { MaterialModelExamEditComponent } from './material-model-exam/material-model-exam-edit/material-model-exam-edit.component';
import { MaterialSelectComponent } from './material-setting/material-select/material-select.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    LayoutModule,
    MaterialManageRoutingModule,
    DirectivesModule

  ],
  declarations: [
    MaterialModelComponent,
    MaterialAddComponent,
    MaterialCurrCompComponent,
    MaterialModelExamComponent,
    MaterialSettingComponent,
    MaterialSettingAddComponent,
    MaterialClassComponent,
    MaterialClassAddComponent,
    MaterialSettingDetailComponent,
    EquipmentModelComponent,
    EquipmentModelAddComponent,
    MaterialReportComponent,
    DivisionManagementComponent,
    DivisionManagementAddComponent,
    IndustrialMaterialDetailComponent,
    MaterialModelExamEditComponent,
    MaterialSelectComponent
  ]
})
export class MaterialManageModule {
}
