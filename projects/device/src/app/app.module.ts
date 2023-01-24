import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { ProgressIndicatorModule } from '@wuitk/angular/components/progress-indicator';

@NgModule({
  declarations: [
    AppComponent,
    DeviceDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProgressIndicatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
