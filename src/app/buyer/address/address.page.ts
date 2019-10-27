import { Component, OnInit } from '@angular/core';
import { User } from '../../../sdk/user_pb';
import { Address } from '../../../sdk/address_pb';
import { apiService, utilsService } from '../../providers/utils.service'
import { Location } from "@angular/common";
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from './popover/popover.page';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  addresses: Address[]
  address = utilsService.address.formattedAddress;

  constructor(
    private location: Location,
    private popoverController: PopoverController) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.addresses = []
    let stream = apiService.addressClient.list((new User()), apiService.metaData);
    stream.on('data', response => {
      this.addresses.push(response);
      console.log(response.toObject())
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
    });
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverPage
    });
    popover.style.cssText = '--width: 90%;';
    return await popover.present();
  }

  closeAddress() {
    this.location.back();
  }
}
