import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {LayoutModule} from '../../layout/layout.module';
import {PrintSettingRoutingModule} from './print-setting-routing.module';
import { PrinterComponent } from './printer/printer.component';
import { PrintTemplateComponent } from './print-template/print-template.component';
import { TemplateListComponent } from './print-template/template-list/template-list.component';
import { TemplateConfigComponent } from './print-template/template-config/template-config.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    LayoutModule,
    PrintSettingRoutingModule
  ],
  declarations: [
    PrinterComponent,
    PrintTemplateComponent,
    TemplateListComponent,
    TemplateConfigComponent
  ]
})
export class PrintSettingModule {
}
