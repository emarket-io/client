import { Router } from '@angular/router';
import { Component, Injector } from '@angular/core';
import { utilsService } from './providers/utils.service'
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  exit = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private injector: Injector,
    private platform: Platform,
    private appVersion: AppVersion,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private transfer: FileTransfer,
    private file: File,
    private fileOpener: FileOpener
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
        if (this.router.url.includes('/tabs/')) {
          if (this.exit) {
            navigator['app'].exitApp();
          } else {
            utilsService.show('再按一次将退出[农村大集]');
            this.exit = true;
            setTimeout(() => this.exit = false, 1500);
          }
        };
      });
      this.handleUpdate();
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

  handleUpdate() {
    this.appVersion.getVersionNumber().then(value => {
      alert('appVersion:' + value);
      this.http.get(`http://129.28.202.47/assets/apk/output.json`).subscribe(data => {
        alert(JSON.stringify(data));
        alert(data[0].apkInfo.versionName);
      });
    }).catch(err => {
      alert(JSON.stringify(err));
    });
    const fileTransfer: FileTransferObject = this.transfer.create();
    let saveurl = this.file.externalDataDirectory ? this.file.externalDataDirectory : this.file.dataDirectory;
    //let apk = saveurl + 'download/' + 'daji.apk';
    let apk = this.file.dataDirectory + 'aaa.apk';
    fileTransfer.download('http://129.28.202.47/assets/apk/app-release.apk', apk, true).then((entry) => {
      // this.fileOpener.open(apk, "application/vnd.android.package-archive")
      // .then((e) => { console.log(e})
      // .catch(e => { console.log(e});
      this.fileOpener.open(apk,
        'application/vnd.android.package-archive')
        .then(() => {
          console.log('File is opened')
        })
        .catch(e => {
          console.log('Error openening file', e)
          alert(JSON.stringify(e));
        });
    }, (error) => {
      console.log(error)
      alert(JSON.stringify(error));
    });
  }
}
