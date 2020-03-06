import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PwaComponent } from './user/pwa/pwa.component';

@NgModule({
  declarations: [PwaComponent, AppComponent],
  entryComponents: [PwaComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
