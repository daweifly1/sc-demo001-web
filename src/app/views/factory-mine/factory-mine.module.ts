import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FactoryMineRoutingModule} from './factory-mine-routing.module';
import {LayoutModule} from '../../layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { MaterialComponent } from './material/material.component';
import { MaterialAddComponent } from './material/add-material/add-material.component';
import { MaterialSelectComponent } from './material/material-select/material-select.component';
import { MaterialEditComponent } from './material/edit-material/edit-material.component';
import { IndustrialMaterialComponent } from './industrial-material/industrial-material.component';
import { NameMatchComponent } from './material/name-match/name-match.component';
import { IndustrialMaterialDetailComponent } from './industrial-material/industrial-material-detail/industrial-material-detail.component';
import { IndustrialMaterialEditComponent } from './industrial-material/industrial-material-edit/industrial-material-edit.component';
import { DirectivesModule } from '../../directives/directives.module';
import { MaterialTemplateReportComponent } from './material-template-report/material-template-report.component';
import { MaterialTemplateReportAddComponent
} from './material-template-report/material-template-report-add/material-template-report-add.component';
import { MaterialManageModule } from '../material-manage/material-manage.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    LayoutModule,
    DirectivesModule,
    FactoryMineRoutingModule,
    MaterialManageModule

  ],
  declarations: [
    MaterialComponent,
    MaterialAddComponent,
    MaterialSelectComponent,
    MaterialEditComponent,
    IndustrialMaterialComponent,
    NameMatchComponent,
    IndustrialMaterialDetailComponent,
    IndustrialMaterialEditComponent,
    MaterialTemplateReportComponent,
    MaterialTemplateReportAddComponent
  ]
})
export class FactoryMineModule {
}
