import { Router } from '@angular/router';
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
    private router: Router,
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
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setTheme(Math.random());
      utilsService.injector = this.injector;
      this.platform.backButton.subscribe(() => {
        if (this.router.url == '/tabs/home') {
          utilsService.confirm('退出', () => {
            navigator['app'].exitApp();
          }, '确认退出[农村大集]客户端？');
        };
      })
    });
  }

  theme = { mycolor: '', mytextcolor: '' };

  setTheme(random: number) {
    if (random <= 0.25) {
      this.theme = { mycolor: 'rebeccapurple', mytextcolor: '#fff' };
      this.statusBar.styleLightContent()
    } else if (0.25 < random && random <= 0.5) {
      this.theme = { mycolor: 'orangered', mytextcolor: '#fff' };
      this.statusBar.styleLightContent()
    } else if (0.5 < random && random <= 0.75) {
      this.theme = { mycolor: '#3880ff', mytextcolor: '#fff' };
      this.statusBar.styleLightContent()
    } else {
      this.theme = { mycolor: '#10dc60', mytextcolor: '#222428' };
      this.statusBar.styleDefault();
    }

    Object.keys(this.theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, this.theme[k])
    );
  }
}
