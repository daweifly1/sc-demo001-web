import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VendorManageComponent} from './vendor-manage/vendor-manage.component';
import {ArchivesListComponent} from "./archives-list/archives-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'vendorManage', pathMatch: 'full'},
  {path: 'vendorManage', component: VendorManageComponent},
  {path: 'archives', component: ArchivesListComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VendorsRoutingModule {
}
