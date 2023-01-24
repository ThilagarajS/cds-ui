import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../../device/src/environments/environment";
import { RemoteMFEDetail, RemoteMFEDetailCollection } from "../models/remote-mfe-detail.model";

@Injectable()

export class MFEConfigService {
    private mfeConfig!: RemoteMFEDetailCollection;

    constructor(
        private http: HttpClient
    ) { }

    loadMFEConfig(): Promise<any> {
        let url = 'assets/';
        url += environment.production ? 'mfe-config.json' : 'mfe-dev-config.json';
        const config = firstValueFrom(this.http.get<RemoteMFEDetailCollection>(url));
        config.then(data => {
            this.mfeConfig = data;
            this.mfeConfig.microFrontEnds.forEach((mfeConfigData: RemoteMFEDetail) => {
                (window as any)[(mfeConfigData as any).publicPathWindowObject] = mfeConfigData.remoteUrl + '/';
            });
        })
        return config;
    }

    getMFEConfig() {
        return this.mfeConfig;
    }

    createMFEDetail(mfeName: string): RemoteMFEDetail {
        let mfeDetail!: RemoteMFEDetail;
        const mfesDetail = this.getMFEConfig();
        mfesDetail.microFrontEnds.forEach(mfeConfigDetail => {
            if (mfeConfigDetail.name === mfeName) {
                mfeDetail = mfeConfigDetail;
            }
        });
        return mfeDetail;
    }
}