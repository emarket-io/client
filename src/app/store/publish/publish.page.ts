import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage {

  constructor(private router: Router) { }

  gotoPublish() {
    this.router.navigateByUrl('/store/publish');
  }
}
