import { loadRemoteModule } from "@angular-architects/module-federation";
import { ComponentRef, Injectable, ViewContainerRef } from "@angular/core";
import { RemoteMFEDetail } from "../models/remote-mfe-detail.model";
import * as _ from 'lodash';


@Injectable({
    providedIn: 'root'
})

export class MFEComponentLoaderService {
    componentInstances: any[] = [];

    public loadComponent(viewContainerRef: ViewContainerRef, appDetail: RemoteMFEDetail) {
        const cdnUrl = appDetail.remoteUrl;
        if (!appDetail) return;
        loadRemoteModule({
            type: 'module',
            remoteEntry: `${cdnUrl}${appDetail.path}`,
            //remoteName: appDetail.name,
            exposedModule: `./${appDetail.component}`
        }).then(m => {
            let existingIndex = -1;
            if (this.componentInstances.length > 0) {
                existingIndex = this.componentInstances.findIndex(compInst => compInst.name === appDetail.component);
            }
            if (existingIndex === -1) {
                viewContainerRef.clear();
                const component: ComponentRef<any> = viewContainerRef.createComponent(m[appDetail.component]);
                if (appDetail.input) {
                    for (const input of Object.keys(appDetail.input)) {
                        component.instance[input] = appDetail.input[input];
                    }
                }
                if (appDetail.output) {
                    for (const output of Object.keys(appDetail.output)) {
                        component.instance[output].subscribe(appDetail.output[output]);
                    }
                }
                this.componentInstances.push({ component: component, name: appDetail.component, route: appDetail.route });
            } else {
                if (appDetail.input) {
                    for (const input of Object.keys(appDetail.input)) {
                        this.componentInstances[existingIndex].component.instance[input] = _.cloneDeep(appDetail.input[input]);
                    }
                }
                if (appDetail.output) {
                    for (const output of Object.keys(appDetail.output)) {
                        if (!this.componentInstances[existingIndex].component.instance.hasOwnProperty(output)) {
                            this.componentInstances[existingIndex].component.instance[output].subscribe(appDetail.output[output]);
                        }
                    }
                }
                this.componentInstances[existingIndex].component.instance.triggerManualOnChange();
            }
        });
    }
}