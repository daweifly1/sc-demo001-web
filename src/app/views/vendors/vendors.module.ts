import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

import {VendorsRoutingModule} from './vendors-routing.module';
import {LayoutModule} from '../../layout/layout.module';
import {DirectivesModule} from '../../directives/directives.module';


import {VendorManageComponent} from './vendor-manage/vendor-manage.component';
import { ArchivesListComponent } from './archives-list/archives-list.component';
import { ArchivesDetailComponent } from './archives-list/archives-detail/archives-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    LayoutModule,
    DirectivesModule,
    VendorsRoutingModule
  ],
  declarations: [
    VendorManageComponent,
    ArchivesListComponent,
    ArchivesDetailComponent
  ]
})
export class VendorsModule {
}
