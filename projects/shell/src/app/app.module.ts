import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MFEComponentLoaderDirective } from './helpers/mfe-component-loader.directive';
import { MFEConfigService } from './helpers/mfe-config.service';

export function initMFEConfig(mfeConfig: MFEConfigService): unknown {
  return () => mfeConfig.loadMFEConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MFEComponentLoaderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    MFEConfigService,
    { provide: APP_INITIALIZER, useFactory: initMFEConfig, deps: [MFEConfigService], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
