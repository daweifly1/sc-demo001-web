import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

import {InternalRoutingModule} from './internal-routing.module';
import {LayoutModule} from '../../layout/layout.module';
import {DirectivesModule} from '../../directives/directives.module';

import {DeptManageComponent} from './dept-manage/dept-manage.component';
import {RoleManageComponent} from './role-manage/role-manage.component';
import {UserManageComponent} from './user-manage/user-manage.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { AddParamTypeComponent } from './dictionary/add-param-type/add-param-type.component';
import { ParamComponent } from './dictionary/param/param.component';
import { AddParamComponent } from './dictionary/add-param/add-param.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    InternalRoutingModule,
    LayoutModule,
    DirectivesModule
  ],
  declarations: [
    DeptManageComponent,
    RoleManageComponent,
    UserManageComponent,
    DictionaryComponent,
    AddParamTypeComponent,
    ParamComponent,
    AddParamComponent
  ]
})
export class InternalModule {
}
