import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  version: string;

  constructor(private appVersion: AppVersion, ) { }

  ngOnInit() {
    this.appVersion.getVersionNumber().then(value => {
      this.version = value;
    });
  }

}
