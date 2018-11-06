import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ViewsRoutingModule} from './views-routing.module';
import {CoreModule} from '../core/core.module';
import {LayoutModule} from '../layout/layout.module';

import {MainLayoutComponent} from './main-layout/main-layout.component';
import {LoginComponent} from './entrance/login-page/login.component';
import {WorkBoardComponent} from './work-board/work-board.component';
import { DefaultComponent } from './default/default.component';
import { RegisterComponent } from './entrance/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ViewsRoutingModule,
    NgZorroAntdModule,
    CoreModule,
    LayoutModule,
    FormsModule
  ],
  declarations: [
    MainLayoutComponent,
    LoginComponent,
    WorkBoardComponent,
    DefaultComponent,
    RegisterComponent,
  ],

  exports: [ViewsRoutingModule]
})
export class ViewsModule {
}
