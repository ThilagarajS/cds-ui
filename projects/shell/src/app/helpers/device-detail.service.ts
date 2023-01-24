import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetailService {

  constructor(
    private http: HttpClient
  ) { }

  getDeviceDetails(): Observable<any>{
    return this.http.get('http://130.145.132.128:7979/getLastUploadedData');
  }
}
