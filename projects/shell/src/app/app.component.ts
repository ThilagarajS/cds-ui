import { Component, OnInit } from '@angular/core';
import { MFEConfigService } from './helpers/mfe-config.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'shell';
  mfeDetail: any;
  canShowMFE = false;

  constructor(
    private config: MFEConfigService
  ){}

  ngOnInit(){
    this.mfeDetail = _.cloneDeep(this.config.getMFEConfig()).microFrontEnds[0];
    this.canShowMFE = true;
  }
}
