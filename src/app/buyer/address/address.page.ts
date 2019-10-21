import { Component, OnInit } from '@angular/core';
import { apiService, utilsService } from '../../providers/utils.service'
import { Location } from "@angular/common";

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  address = utilsService.address.formattedAddress;

  constructor(private location: Location) { }

  ngOnInit() { }

  closeAddress() {
    this.location.back();
  }
}
