import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MaterialComponent} from './material/material.component';
import { IndustrialMaterialComponent } from './industrial-material/industrial-material.component';
import { MaterialTemplateReportComponent } from './material-template-report/material-template-report.component';

const routes: Routes = [
  {path: '', redirectTo: 'materialReport', pathMatch: 'full'},
  {path: 'materialReport', component: MaterialComponent},
  {path: 'material', component: IndustrialMaterialComponent},
  {path: 'materialTemplateReport', component: MaterialTemplateReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryMineRoutingModule { }
