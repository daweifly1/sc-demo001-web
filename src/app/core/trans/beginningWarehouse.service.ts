import { Injectable, Injector } from '@angular/core';
import { HttpUtilNs, HttpUtilService } from '../infra/http/http-util.service';
import { Observable } from 'rxjs/Observable';

export namespace BeginningWarehouseServiceNs {
  // 入库状态
  export enum StockInStatus {
    Undone,
    Part,
    All,
    Finish
  }
  export enum BarcodeFlag {
    UnBarcode,
    Barcode
  }
  export interface UfastHttpAnyResModel extends HttpUtilNs.UfastHttpResT<any> {
  }
  export interface UfastHttpResT<T> extends HttpUtilNs.UfastHttpResT<T> {
  }

  export interface OutLocationModel {
    description?: string;
    id?: string;
    orgId?: string;
    warehouseCode?: string;
  }

  export interface ReservoirModel {
    areaCode?: string;
    description?: string;
    id?: string;
    sapCode?: string;
    warehouseId?: string;
  }

  export class BeginningWarehouseServiceClass {
    private http: HttpUtilService;
    constructor(private injector: Injector) {
      this.http = this.injector.get(HttpUtilService);
    }

    public getBeginningWarehouseList(filter: {
      pageNum: number, pageSize: number, filters: any
    }): Observable<UfastHttpAnyResModel> {
      const config: HttpUtilNs.UfastHttpConfig = {};
      config.gateway = HttpUtilNs.GatewayKey.Ss;
      return this.http.Post('/initialInventory/listBill', filter, config);
    }

    // 入库--详情接口
    public getStockInDetailMaterialList(filter: { pageNum: number, pageSize: number, filters: any }): Observable<UfastHttpAnyResModel> {
      const config: HttpUtilNs.UfastHttpConfig = {};
      config.gateway = HttpUtilNs.GatewayKey.Ss;
      return this.http.Post('/initialInventory/listWithStorage', filter, config);
    }
    // 详情接口
    public getDetailMaterialList(filter: { pageNum: number, pageSize: number, filters: any }): Observable<UfastHttpAnyResModel> {
      const config: HttpUtilNs.UfastHttpConfig = {};
      config.gateway = HttpUtilNs.GatewayKey.Ss;
      return this.http.Post('/initialInventory/listMaterials', filter, config);
    }

    public statementFinish(billNo: string, materialsNo: string): Observable<UfastHttpResT<any>> {
      const config: HttpUtilNs.UfastHttpConfig = {};
      config.gateway = HttpUtilNs.GatewayKey.Ss;
      return this.http.Post<UfastHttpResT<any>>('/initialInventory/manualFinish', {
        billNo: billNo,
        materialsNo: materialsNo || null
      }, config);
    }

    public getOutWareHouseList(filter: { filters: any, pageNum: number, pageSize: number }): Observable<UfastHttpResT<any>> {
      const config: HttpUtilNs.UfastHttpConfig = {};
      config.gateway = HttpUtilNs.GatewayKey.Ss;
      const data = {
        pageNum: filter.pageNum + '',
        pageSize: filter.pageSize + '',
        filters: filter.filters
      };
      return this.http.Post<UfastHttpResT<any>>('/warehouse/list', data, config);
    }

    // 根据仓库编码查找库区
    public getCodeAreaWareHouseList(filter: { warehouseCode: any, pageNum: number, pageSize: number }): Observable<UfastHttpResT<any>> {
      const config: HttpUtilNs.UfastHttpConfig = {};
      config.gateway = HttpUtilNs.GatewayKey.Ss;
      const data = {
        pageNum: filter.pageNum + '',
        pageSize: filter.pageSize + '',
        warehouseCode: filter.warehouseCode + '',
      };
      return this.http.Get<UfastHttpResT<any>>('/warehouse/areaCodeListPage', data, config);
    }

    public printTpl(CurPage: string, PageSize: string, TemplateType: string): Observable<UfastHttpResT<any>> {
      const config: HttpUtilNs.UfastHttpConfig = {};
      config.gateway = HttpUtilNs.GatewayKey.Ss;
      return this.http.Get<UfastHttpResT<any>>('/printTemplate/list', {
        CurPage,
        PageSize,
        TemplateType
      }, config);
    }
  }
}
@Injectable()
export class BeginningWarehouseService extends BeginningWarehouseServiceNs.BeginningWarehouseServiceClass {
  constructor(injector: Injector) {
    super(injector);
  }
}

