import { Injectable, Injector } from '@angular/core';
import { HttpUtilNs, HttpUtilService } from '../infra/http/http-util.service';
import { Observable } from 'rxjs/Observable';

export namespace PackBarcodePatchServiceNs {

    export interface UfastHttpAnyResModel extends HttpUtilNs.UfastHttpResT<any> {
    }
    export interface UfastHttpResT<T> extends HttpUtilNs.UfastHttpResT<T> {
    }

    export class PackBarcodePatchServiceClass {
        private http: HttpUtilService;
        constructor(private injector: Injector) {
            this.http = this.injector.get(HttpUtilService);
        }

        public getPackBarcodePatchList(filter: {
            pageNum: number, pageSize: number, filters: any
        }): Observable<UfastHttpAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ss;
            return this.http.Post('/barcode/list', filter, config);
        }

        public updatePrintCount(barcodes: any): Observable<UfastHttpAnyResModel> {
            const config: HttpUtilNs.UfastHttpConfig = {};
            config.gateway = HttpUtilNs.GatewayKey.Ss;
            return this.http.Post('/barcode/updatePrintCount', {barcodes: barcodes}, config);
        }
    }
}
@Injectable()
export class PackBarcodePatchService extends PackBarcodePatchServiceNs.PackBarcodePatchServiceClass {
    constructor(injector: Injector) {
        super(injector);
    }
}

