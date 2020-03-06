import { Router } from '@angular/router';
import { Component, Injector } from '@angular/core';
import { PwaComponent } from './user/pwa/pwa.component';
import { EventManager } from '@angular/platform-browser';
import { utilsService } from './providers/utils.service';
import { Platform, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  exit = false;
  supportPWA = false;

  constructor(
    private router: Router,
    private injector: Injector,
    private platform: Platform,
    private eventManager: EventManager,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.setTheme(Math.random());
      utilsService.injector = this.injector;
      // this.platform.backButton.subscribe(() => {
      //   if (this.router.url.includes('/tabs/')) {
      //     if (this.exit) {
      //       navigator['app'].exitApp();
      //     } else {
      //       utilsService.toast('再按一次退出 [农村大集]');
      //       this.exit = true;
      //       setTimeout(() => this.exit = false, 1500);
      //     }
      //   };
      // });
      this.eventManager.addGlobalEventListener('window', 'popstate', (event) => {
        if (this.router.url.includes('/tabs/')) {
          if (this.exit) {
            //window.close();
            //window.opener = null;
            window.close();
            // window.open('about:blank', '_self').close();
          } else {
            utilsService.toast('再按一次退出 [农村大集]');
            window.history.pushState(null, null);
            this.exit = true;
          }
        }
      });

      this.eventManager.addGlobalEventListener('window', 'beforeinstallprompt', (event) => {
        this.supportPWA = true;
      });

      /* this.eventManager.addGlobalEventListener('window', 'appinstalled', async (event) => {
         alert(event);
         if (popover) {
           await popover.dismiss();
         }
       });*/
      //this.checkUpdate();

      let hl = document.getElementsByTagName('html')[0];
      hl.style.height = screen.height + 'px';
      hl.style.overflow = 'auto';
      // window.scrollTo(0, 50);
      setTimeout(async () => {
        // why invalid?
        window.scrollTo(0, 1);

        if (this.supportPWA || this.platform.is('iphone')) {
          const popover = await this.injector.get(PopoverController).create({
            component: PwaComponent,
            backdropDismiss: false,
            cssClass: 'bottom-sheet-popover-pwa',
          });
          await popover.present();
        }
      }, 3000);

    });
  }

  theme = { mycolor: '', mytextcolor: '' };

  setTheme(random: number) {
    if (random <= 0.25) {
      this.theme = { mycolor: 'rebeccapurple', mytextcolor: '#fff' };
      //this.statusBar.styleLightContent()
    } else if (0.25 < random && random <= 0.5) {
      this.theme = { mycolor: 'orangered', mytextcolor: '#fff' };
      //this.statusBar.styleLightContent()
    } else if (0.5 < random && random <= 0.75) {
      this.theme = { mycolor: '#3880ff', mytextcolor: '#fff' };
      //this.statusBar.styleLightContent()
    } else {
      this.theme = { mycolor: '#10dc60', mytextcolor: '#222428' };
      //this.statusBar.styleDefault();
    }

    Object.keys(this.theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, this.theme[k])
    );

    // Chrome, Firefox OS and Opera
    document.getElementsByTagName('meta')['theme-color'].content = this.theme.mycolor;
    //  iOS Safari <!-- 可选default、black、black-translucent? -->
    document.getElementsByTagName('meta')['apple-mobile-web-app-status-bar-style'].content = 'black-translucent';
    if (navigator.userAgent.indexOf('Safari') > -1 && this.platform.is('iphone')) {
      let els = document.getElementsByTagName('ion-app');
      els[0].style.background = 'white';
      els[0].style.marginTop = '20px';
      document.body.style.background = this.theme.mycolor;
    }
  }

  /*checkUpdate() {
    this.appVersion.getVersionNumber().then(value => {
      //alert('appVersion:' + value);
      this.http.get('https://raw.githubusercontent.com/emart-io/client/master/platforms/android/app/build/outputs/apk/release/output.json').subscribe(data => {
        // alert(JSON.stringify(data));
        // alert(data[0].apkInfo.versionName);
        if (data[0].apkInfo.versionName != value) {
          utilsService.toast('发现新版本[v' + data[0].apkInfo.versionName + ']，开始自动下载.');
          const fileTransfer: FileTransferObject = this.transfer.create();
          let saveurl = this.file.externalDataDirectory ? this.file.externalDataDirectory : this.file.dataDirectory;
          let apk = saveurl + 'download/' + 'daji.apk';
          const url = 'https://github.com/emart-io/client/raw/master/platforms/android/app/build/outputs/apk/release/app-release.apk';

          fileTransfer.download(url, apk, true).then((entry) => {
            this.fileOpener.open(entry.toURL(),
              'application/vnd.android.package-archive')
              .then(() => {
                console.log('File is opened');
              }).catch(e => {
                console.log('Error openening file', e)
                utilsService.alert(JSON.stringify(e));
              });
          }).catch(error => {
            console.log(error)
            utilsService.alert(JSON.stringify(error));
          });
        };
      });
    }).catch(err => {
      console.log(JSON.stringify(err));
    });
  }*/
}
