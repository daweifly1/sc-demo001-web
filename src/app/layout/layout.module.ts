/**
 * 此模块内不包含服务，不需要注册到根模块。
 * **/
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {OverlayModule} from '@angular/cdk/overlay';
import {FormsModule} from '@angular/forms';
import {DirectivesModule} from '../directives/directives.module';
import { QRCodeModule } from 'angularx-qrcode';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {NavBreadcrumbComponent} from './nav-breadcrumb/nav-breadcrumb.component';
import {UfastTabRouteComponent} from './ufast-tab-route/ufast-tab-route.component';
import {PageHeaderComponent} from './page-header/page-header.component';
import { UfastTableComponent } from './ufast-table/ufast-table.component';
import { UfastTableNavComponent } from './ufast-table-nav/ufast-table-nav.component';
import { RightSideBoxComponent } from './right-side-box/right-side-box.component';
import { PrintOrderTplComponent } from './print-order-tpl/print-order-tpl.component';
import { RightSideTableBoxComponent } from './right-side-table-box/right-side-table-box.component';
import { NormalTicketTplComponent } from './print-template/normal-ticket-tpl/normal-ticket-tpl.component';
import { InvoiceContactTplComponent } from './print-template/invoice-contact-tpl/invoice-contact-tpl.component';
import { UfastSelectComponent } from './ufast-select/ufast-select.component';
import { NormalLocationTplComponent } from './print-template/normal-location-tpl/normal-location-tpl.component';
import { LocationSelectorComponent } from './trans/location-selector/location-selector.component';
import { ActionGroupComponent } from './table-action/action-group.component';
import { ActionComponent } from './table-action/action/action.component';
import { AreaSelectorComponent } from './area-selector/area-selector.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgZorroAntdModule,
    DirectivesModule,
    QRCodeModule,
    OverlayModule
  ],
  declarations: [
    SideMenuComponent,
    NavBreadcrumbComponent,
    UfastTabRouteComponent,
    UfastTableComponent,
    UfastTableNavComponent,
    RightSideBoxComponent,
    UfastSelectComponent,
    PageHeaderComponent,
    RightSideTableBoxComponent,
    NormalTicketTplComponent,
    InvoiceContactTplComponent,
    NormalLocationTplComponent,
    LocationSelectorComponent,
    ActionGroupComponent,
    ActionComponent,
    AreaSelectorComponent,
    PrintOrderTplComponent,
  ],
  exports: [
    SideMenuComponent,
    NavBreadcrumbComponent,
    UfastTabRouteComponent,
    PageHeaderComponent,
    UfastTableComponent,
    UfastTableNavComponent,
    RightSideBoxComponent,
    UfastSelectComponent,
    PrintOrderTplComponent,
    RightSideTableBoxComponent,
    NormalTicketTplComponent,
    InvoiceContactTplComponent,
    NormalLocationTplComponent,
    LocationSelectorComponent,
    ActionGroupComponent,
    ActionComponent,
    AreaSelectorComponent
  ],
  entryComponents: [
    PrintOrderTplComponent,
    NormalTicketTplComponent,
    InvoiceContactTplComponent,
    NormalLocationTplComponent
  ]
})
export class LayoutModule {
}
export {UfastTableNs} from './ufast-table/ufast-table.component';
export { RightSideTableBoxNs } from './right-side-table-box/right-side-table-box.component';
