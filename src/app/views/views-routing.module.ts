import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {LoginComponent} from './entrance/login-page/login.component';
import {RegisterComponent} from './entrance/register/register.component';
import {WorkBoardComponent} from './work-board/work-board.component';
import {DefaultComponent} from './default/default.component';


const routes: Routes = [
  // {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {cache: false}},
  {path: 'register', component: RegisterComponent},
  {
    path: 'main', component: MainLayoutComponent, children: [
    {path: '', redirectTo: 'workBoard', pathMatch: 'full'},
    {path: 'workBoard', component: WorkBoardComponent},
    {path: 'personal', loadChildren: './personal/personal.module#PersonalModule'},
    {path: 'internal', loadChildren: './internal/internal.module#InternalModule'},
    {path: 'material', loadChildren: './material/material.module#MaterialModule'},
    {path: 'vendors', loadChildren: './vendors/vendors.module#VendorsModule'},
    {path: 'cloudSettle', loadChildren: './cloud-settle/cloud-settle.module#CloudSettleModule'},
    {path: 'warehouse', loadChildren: './warehouse/warehouse.module#WarehouseModule'},
    {path: 'printSetting', loadChildren: './print-setting/print-setting.module#PrintSettingModule'},
    {path: 'materialManage', loadChildren: './material-manage/material-manage.module#MaterialManageModule'},
    {path: 'factoryMine', loadChildren: './factory-mine/factory-mine.module#FactoryMineModule'}
  ]
  },
  {path: '**', component: DefaultComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],

  exports: [RouterModule]
})
export class ViewsRoutingModule {
}
