import { Component, Injector } from '@angular/core';
import { utilsService } from './providers/utils.service'
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
      this.statusBar.overlaysWebView(true);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setTheme(Math.random());
      utilsService.injector = this.injector;
    });
  }

  theme = { mycolor: '', mytextcolor: '' };

  setTheme(random: number) {
    if (random <= 0.3) {
      this.theme = { mycolor: 'rebeccapurple', mytextcolor: '#fff' };
    } else if (0.3 < random && random <= 0.6) {
      this.theme = { mycolor: '#fa8704', mytextcolor: '#fff' };
    } else {
      this.theme = { mycolor: '#10dc60', mytextcolor: '#222428' };
    }

    Object.keys(this.theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, this.theme[k])
    );
  }
}
