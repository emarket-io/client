import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  slideOpts = {
    slidesPerView: 1,
  };

  constructor() { }

  ngOnInit() {
  }

}
