import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage implements OnInit {

  constructor(private statusBar: StatusBar,private router: Router) { }

  ngOnInit() {
    //this.statusBar.overlaysWebView(true);
    //this.statusBar.styleBlackTranslucent();
  }

  gotoPublish(){
    this.router.navigateByUrl('/publish');
  }
}
