import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MaterialModelComponent} from './material-model/material-model.component';
import {MaterialModelExamComponent} from './material-model-exam/material-model-exam.component';
import {MaterialSettingComponent} from './material-setting/material-setting.component';
import {MaterialClassComponent} from './material-class/material-class.component';
import { EquipmentModelComponent } from './equipment-model/equipment-model.component';
import { MaterialReportComponent } from './material-report/material-report.component';
import {DivisionManagementComponent} from './division-management/division-management.component';


const routes: Routes = [
  {path: '', redirectTo: 'materialModel', pathMatch: 'full'},
  {path: 'materialModel', component: MaterialModelComponent},
  {path: 'materialModelExamine', component: MaterialModelExamComponent},
  {path: 'materialClass', component: MaterialClassComponent},
  {path: 'materialSetting', component: MaterialSettingComponent},
  {path: 'equipmentModel', component: EquipmentModelComponent},
  {path: 'report', component: MaterialReportComponent},
  {path: 'divisionManagement', component: DivisionManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialManageRoutingModule { }
