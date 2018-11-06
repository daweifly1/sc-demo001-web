import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

import {WarehouseRoutingModule} from './warehouse-routing.module';
import {LayoutModule} from '../../layout/layout.module';
import {DirectivesModule} from '../../directives/directives.module';

import {WarehouseManageComponent} from './warehouse-manage/warehouse-manage.component';
import { AddWarehouseAreaComponent } from './warehouse-manage/add-warehouse-area/add-warehouse-area.component';
import { AddLocationComponent } from './warehouse-manage/add-location/add-location.component';
import { WarehouseAreaManageComponent } from './warehouse-manage/warehouse-area-manage/warehouse-area-manage.component';
import { LocationManageComponent } from './warehouse-manage/location-manage/location-manage.component';
import { AddWarehouseComponent } from './warehouse-manage/add-warehouse/add-warehouse.component';
import {OtherWarehouseComponent} from './other-warehouse/other-warehouse.component';
import {AddotherComponent} from './other-warehouse/addother/addother.component';
import { OtherDetailComponent } from './other-warehouse/other-detail/other-detail.component';
import { OtherEditComponent } from './other-warehouse/other-edit/other-edit.component';
import { BeginningWarehouseComponent } from './beginning-warehouse/beginning-warehouse.component';
import { BeginningDetailComponent } from './beginning-warehouse/beginning-detail/beginning-detail.component';
import { MaterialManageComponent } from './material-manage/material-manage.component';
import { AddMaterialComponent } from './material-manage/add-material/add-material.component';
import { MaterialDetailComponent } from './material-manage/material-detail/material-detail.component';
import { StorageRecordsComponent } from './storage-records/storage-records.component';
import { DepotStockComponent } from './depot-stock/depot-stock.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AbnormalOutComponent } from './abnormal-out/abnormal-out.component';
import { AbnormalDetailComponent } from './abnormal-out/abnormal-detail/abnormal-detail.component';
import { DetailStockComponent } from './depot-stock/detail-stock/detail-stock.component';
import { AddAbnormalOutComponent } from './abnormal-out/add-abnormal-out/add-abnormal-out.component';
import { EditAbnormalOutComponent } from './abnormal-out/edit-abnormal-out/edit-abnormal-out.component';
import { AddinventoryComponent } from './inventory/addinventory/addinventory.component';
import { DetailinventoryComponent } from './inventory/detailinventory/detailinventory.component';
import { BillTypeComponent } from './bill-type/bill-type.component';
import { AddBillComponent } from './bill-type/add-bill/add-bill.component';
import { DevanningPrintComponent } from './devanning-print/devanning-print.component';
import { PackBarcodePatchComponent } from './pack-barcode-patch/pack-barcode-patch.component';
import { PackageCodeComponent } from './package-code/package-code.component';
import { BasisCodeComponent } from './basis-code/basis-code.component';
import { ReceivingNoteComponent } from './receiving-note/receiving-note.component';
import { DispatchBillComponent } from './dispatch-bill/dispatch-bill.component';
import { DispatchBillDetailComponent } from './dispatch-bill/dispatch-bill-detail/dispatch-bill-detail.component';
import { EditDispatchBillComponent } from './dispatch-bill/edit-dispatch-bill/edit-dispatch-bill.component';
import { ContractComponent } from './dispatch-bill/contract/contract.component';
import { LogisticsDeliveryComponent } from './dispatch-bill/logistics-delivery/logistics-delivery.component';
import { BatchLogisticsDeliveryComponent } from './dispatch-bill/batch-logistics-delivery/batch-logistics-delivery.component';
import { ReceivingNoteDetailComponent } from './receiving-note/receiving-note-detail/receiving-note-detail.component';
import { AddReceivingNoteComponent } from './receiving-note/add-receiving-note/add-receiving-note.component';
import { WarehouseWarrantComponent } from './warehouse-warrant/warehouse-warrant.component';
import { WarehouseWarrantDetailComponent } from './warehouse-warrant/warehouse-warrant-detail/warehouse-warrant-detail.component';
import { CompactComponent } from './receiving-note/compact/compact.component';
import { PickingApplyComponent } from './picking-apply/picking-apply.component';
import { AddEditPickingApplyComponent } from './picking-apply/add-edit-picking-apply/add-edit-picking-apply.component';
import { PickingApplyDeliveryComponent } from './picking-apply/picking-apply-delivery/picking-apply-delivery.component';
import { PickingDeliveryComponent } from './picking-delivery/picking-delivery.component';
import { ReceivingNoteConfirmComponent } from './receiving-note/receiving-note-confirm/receiving-note-confirm.component';
import { AddPickingDeliveryComponent } from './picking-delivery/add-picking-delivery/add-picking-delivery.component';
import { QuitWarehouseComponent } from './warehouse-warrant/quit-warehouse/quit-warehouse.component';
import { RegionalAllocationComponent } from './regional-allocation/regional-allocation.component';
import { AddRegionAllotComponent } from './regional-allocation/add-region-allot/add-region-allot.component';
import { DetailRetionAllotComponent } from './regional-allocation/detail-retion-allot/detail-retion-allot.component';
import { PurchaseOutComponent } from './purchase-out/purchase-out.component';
import { AddPurchaseOutComponent } from './purchase-out/add-purchase-out/add-purchase-out.component';
import { DetailPurchaseOutComponent } from './purchase-out/detail-purchase-out/detail-purchase-out.component';
import { StockRecordSelectComponent } from './purchase-out/stock-record-select/stock-record-select.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    WarehouseRoutingModule,
    LayoutModule,
    DirectivesModule
  ],
  declarations: [
    WarehouseManageComponent,
    AddWarehouseAreaComponent,
    AddLocationComponent,
    WarehouseAreaManageComponent,
    LocationManageComponent,
    AddWarehouseComponent,
    OtherWarehouseComponent,
    AddotherComponent,
    OtherDetailComponent,
    OtherEditComponent,
    BeginningWarehouseComponent,
    BeginningDetailComponent,
    MaterialManageComponent,
    AddMaterialComponent,
    MaterialDetailComponent,
    StorageRecordsComponent,
    DepotStockComponent,
    InventoryComponent,
    AbnormalOutComponent,
    AbnormalDetailComponent,
    DetailStockComponent,
    AddAbnormalOutComponent,
    EditAbnormalOutComponent,
    AddinventoryComponent,
    DetailinventoryComponent,
    BillTypeComponent,
    AddBillComponent,
    DevanningPrintComponent,
    PackBarcodePatchComponent,
    PackageCodeComponent,
    BasisCodeComponent,
    ReceivingNoteComponent,
    DispatchBillComponent,
    DispatchBillDetailComponent,
    EditDispatchBillComponent,
    ContractComponent,
    LogisticsDeliveryComponent,
    BatchLogisticsDeliveryComponent,
    ReceivingNoteDetailComponent,
    AddReceivingNoteComponent,
    WarehouseWarrantComponent,
    WarehouseWarrantDetailComponent,
    CompactComponent,
    PickingApplyComponent,
    AddEditPickingApplyComponent,
    PickingApplyDeliveryComponent,
    PickingDeliveryComponent,
    ReceivingNoteConfirmComponent,
    AddPickingDeliveryComponent,
    QuitWarehouseComponent,
    RegionalAllocationComponent,
    AddRegionAllotComponent,
    DetailRetionAllotComponent,
    PurchaseOutComponent,
    AddPurchaseOutComponent,
    DetailPurchaseOutComponent,
    StockRecordSelectComponent,
  ]
})
export class WarehouseModule {
}
