import { Router } from '@angular/router';
import { Component, Injector } from '@angular/core';
import { utilsService } from './providers/utils.service'
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  exit = false;

  constructor(
    private router: Router,
    private injector: Injector,
    private platform: Platform,
    //private splashScreen: SplashScreen,
    //private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.overlaysWebView(true);
      // this.statusBar.styleDefault();
      //this.splashScreen.hide();
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
      window.addEventListener("popstate", e => {
        if (this.router.url.includes('/tabs/')) {
          if (this.exit) {
            //navigator['app'].exitApp();
            window.close();
          } else {
            utilsService.toast('再按一次退出 [农村大集]');
            this.exit = true;
          }
        }
      });
      //this.checkUpdate();
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

    document.getElementsByTagName('meta')['theme-color'].content = this.theme.mycolor;
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
