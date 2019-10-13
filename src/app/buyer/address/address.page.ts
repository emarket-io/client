import { Component, OnInit } from '@angular/core';
import { apiService } from '../../providers/api.service'
import { Location } from "@angular/common";

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  address = apiService.currentAddress;

  constructor(private location: Location) { }

  ngOnInit() { }

  closeAddress() {
    this.location.back();
  }
}
