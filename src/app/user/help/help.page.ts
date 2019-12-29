import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage {
  detailMap = new Map<string, boolean>();

  constructor() { }

  detail(key: string) {
    if (!this.detailMap[key]) {
      this.detailMap[key] = false;
    }
    this.detailMap[key] = !this.detailMap[key];
  }

}
