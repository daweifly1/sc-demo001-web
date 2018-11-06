import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WarehouseManageComponent} from './warehouse-manage/warehouse-manage.component';
import {OtherWarehouseComponent} from './other-warehouse/other-warehouse.component';
import {BeginningWarehouseComponent} from './beginning-warehouse/beginning-warehouse.component';
import {MaterialManageComponent} from './material-manage/material-manage.component';
import {InventoryComponent} from './inventory/inventory.component';
import {StorageRecordsComponent} from './storage-records/storage-records.component';
import {DepotStockComponent} from './depot-stock/depot-stock.component';
import {AbnormalOutComponent} from './abnormal-out/abnormal-out.component';
import {BillTypeComponent} from './bill-type/bill-type.component';
import {DevanningPrintComponent} from './devanning-print/devanning-print.component';
import {PackBarcodePatchComponent} from './pack-barcode-patch/pack-barcode-patch.component';
import {BasisCodeComponent} from './basis-code/basis-code.component';
import {PackageCodeComponent} from './package-code/package-code.component';
import {ReceivingNoteComponent} from './receiving-note/receiving-note.component';
import {DispatchBillComponent} from './dispatch-bill/dispatch-bill.component';
import {WarehouseWarrantComponent} from './warehouse-warrant/warehouse-warrant.component';
import {PickingApplyComponent} from './picking-apply/picking-apply.component';
import {PickingDeliveryComponent} from './picking-delivery/picking-delivery.component';
import {RegionalAllocationComponent} from '../warehouse/regional-allocation/regional-allocation.component';
import {PurchaseOutComponent} from '../warehouse/purchase-out/purchase-out.component';
const routes: Routes = [
  {path: '', redirectTo: 'warehouseManage', pathMatch: 'full'},
  {path: 'warehouseManage', component: WarehouseManageComponent},
  {path: 'otherWarehouseManage', component: OtherWarehouseComponent},
  {path: 'beginningWarehouseManage', component: BeginningWarehouseComponent},
  {path: 'materialManage', component: MaterialManageComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'storageRecords', component: StorageRecordsComponent},
  {path: 'depotStock', component: DepotStockComponent},
  {path: 'abnormalOut', component: AbnormalOutComponent},
  {path: 'billType', component: BillTypeComponent},
  {path: 'devanningPrint', component: DevanningPrintComponent},
  {path: 'packBarcodePatch', component: PackBarcodePatchComponent},
  {path: 'basisCode', component: BasisCodeComponent},
  {path: 'packageCode', component: PackageCodeComponent},
  {path: 'receivingNote', component: ReceivingNoteComponent},
  {path: 'dispatchBill', component: DispatchBillComponent},
  {path: 'warehouseWarrant', component: WarehouseWarrantComponent},
  {path: 'pickingApply', component: PickingApplyComponent},
  {path: 'pickingDelivery', component: PickingDeliveryComponent},
  {path: 'regionalAllocation', component: RegionalAllocationComponent},
  {path: 'purchaseReturnOut', component: PurchaseOutComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WarehouseRoutingModule {
}
