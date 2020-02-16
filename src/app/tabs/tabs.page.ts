import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { utilsService } from '../providers/utils.service'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) { }

  ionViewWillEnter() {
    console.log(this.router.url);
    utilsService.events(this.router.url).emit('enter');
    // if (this.router.url === '/tabs/home') {
    //   utilsService.events(this.router.url).emit('enter');
    // }
    // if (this.router.url === '/tabs/order') {
    //   utilsService.events(this.router.url).emit('enter');
    // }
    // let activateComponent = this.tabs.outlet.component;
    // if (activateComponent instanceof HomePage) {
    //   console.log("home更新");
    //   //调用子页中的方法
    //   activateComponent.backFunction();
    // }
  }

  ionViewWillLeave() {
    console.log("leave:" + this.router.url);
    //if (this.router.url === '/tabs/home') {
      utilsService.events('/tabs/home').emit('leave');
    //}
  }
}
