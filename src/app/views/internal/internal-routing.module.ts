import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RoleManageComponent} from './role-manage/role-manage.component';
import {UserManageComponent} from './user-manage/user-manage.component';
import {DeptManageComponent} from './dept-manage/dept-manage.component';
import { DictionaryComponent } from './dictionary/dictionary.component';

const routes: Routes = [
  {path: '', redirectTo: 'roleManage', pathMatch: 'full'},
  {path: 'roleManage', component: RoleManageComponent},
  {path: 'userManage', component: UserManageComponent},
  {path: 'deptManage', component: DeptManageComponent},
  {path: 'dictionary', component: DictionaryComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InternalRoutingModule {
}
