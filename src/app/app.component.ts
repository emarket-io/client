import { Component, Injector } from '@angular/core';
import { apiService } from './provider/api.service'
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private injector: Injector,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      apiService.injector = this.injector;
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString("#000000")
      this.splashScreen.hide();
    });
  }
}
