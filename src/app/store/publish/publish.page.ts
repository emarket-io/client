import { Router } from '@angular/router';
import { apiService } from '../../provider/api.service'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage {
  
  address = apiService.currentAddress;
  constructor(private router: Router) { }

  gotoPublish() {
    this.router.navigateByUrl('/store/publish');
  }
}
