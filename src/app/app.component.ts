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
  alreadyPopover = false;

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
      this.eventManager.addGlobalEventListener('window', 'popstate', (event) => {
        if (this.router.url.includes('/tabs/') || this.exit) {
          if (this.exit) {
            var length = history.length;
            for (var i = 0; i <= length; i++) {
              history.back();
            }
          } else {
            utilsService.toast('再按一次退出 [农村大集]');
            this.exit = true;
            setTimeout(() => this.exit = false, 1500);
          }
        }
      });

      this.eventManager.addGlobalEventListener('window', 'beforeinstallprompt', (event) => {
        if (!this.alreadyPopover) {
          this.popoverPWA();
        }
      });

      if (navigator.userAgent.toLowerCase().includes('micromessenger')) {
        utilsService.alert('请点击右上角->在浏览器打开');
      }

      /* this.eventManager.addGlobalEventListener('window', 'appinstalled', async (event) => {
         alert(event);
         if (popover) {
           await popover.dismiss();
         }
       });*/
      //this.checkUpdate();

      if (!location.search.includes('homescreen')) {
        let hl = document.getElementsByTagName('html')[0];
        hl.style.height = screen.height + 'px';
        hl.style.overflow = 'auto';
        // window.scrollTo(0, 50);
        setTimeout(() => {
          // why invalid?
          window.scrollTo(0, 1);
        }, 3000);

        if (this.platform.is('iphone') && !this.alreadyPopover) {
          this.popoverPWA();
        }
      }

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
    if (navigator.userAgent.includes('Safari') && this.platform.is('iphone') && location.search.includes('homescreen')) {
      let els = document.getElementsByTagName('ion-app');
      els[0].style.background = 'white';
      els[0].style.marginTop = '20px';
      document.body.style.background = this.theme.mycolor;
    }
  }

  async popoverPWA() {
    this.alreadyPopover = true;
    const popover = await this.injector.get(PopoverController).create({
      component: PwaComponent,
      backdropDismiss: false,
      cssClass: 'bottom-sheet-popover-pwa',
    });
    await popover.present();
  }
}
