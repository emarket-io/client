import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private events: Events,
    private router: Router, ) { }

  ionViewWillEnter() {
    console.log(this.router.url);
    if (this.router.url === '/tabs/home') {
      this.events.publish(this.router.url, "back")
    }
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
    this.events.publish('/tabs/home', "leave")
    //}
  }
}
