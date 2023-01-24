import { Directive, Input, OnChanges, ViewContainerRef } from '@angular/core';
import { RemoteMFEDetail } from '../models/remote-mfe-detail.model';
import { MFEComponentLoaderService } from './mfe-component-loader.service';

@Directive({
    selector: '[appMicroFrontEndCompLoader]'
})

export class MFEComponentLoaderDirective implements OnChanges {

    @Input() appMicroFrontEndCompLoader!: RemoteMFEDetail;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private loader: MFEComponentLoaderService
    ) { }

    ngOnChanges(): void {
        this.loader.loadComponent(this.viewContainerRef, this.appMicroFrontEndCompLoader);
    }

}
