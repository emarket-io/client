import { Component } from '@angular/core';
import { Address } from '../../../sdk/user_pb';
import { apiService, utilsService } from '../../providers/utils.service'
import { Location } from "@angular/common";
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from './popover/popover.page';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage {
  addresses: Address[]
  address = utilsService.location.formattedAddress;

  constructor(
    private location: Location,
    private popoverController: PopoverController) { }

  ionViewWillEnter() {
    this.addresses = []
    let stream = apiService.addressClient.list(utilsService.getUser(), apiService.metaData);
    stream.on('data', response => {
      this.addresses.push(response);
      console.log(response.toObject());
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverPage
    });
    popover.style.cssText = '--width: 90%;';
    return await popover.present();
  }

  selectDestionation(address: Address) {
    utilsService.destination = address;
    this.closeAddress();
  }

  closeAddress() {
    this.location.back();
  }
}
