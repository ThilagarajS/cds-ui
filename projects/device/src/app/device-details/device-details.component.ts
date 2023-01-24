import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { DeviceDetailService } from '../../../../shell/src/app/helpers/device-detail.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
  providers: [DeviceDetailService]
})
export class DeviceDetailsComponent implements OnInit {
  deviceDetails: any;
  canShowDetails!: boolean;
  deviceDetailCounter = 0;

  constructor(
    private deviceDetailService: DeviceDetailService
  ) { }

  ngOnInit(): void {
    this.fetchDeviceDetails();
  }

  fetchDeviceDetails() {
    this.canShowDetails = false;
    this.deviceDetailService.getDeviceDetails().subscribe(res => {
      this.deviceDetails = res;
      this.canShowDetails = true;
      if (this.deviceDetailCounter === 0) {
        this.fetchDeviceDetailOnInt();
      }
      this.deviceDetailCounter++;
    });
  }

  fetchDeviceDetailOnInt() {
    interval(5* 1000).subscribe(() => {
      this.fetchDeviceDetails();
    })
  }

}
