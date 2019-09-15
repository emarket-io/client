import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    direction: "vertical",
    slidesPerView: 5,
  };

  constructor() { }
}