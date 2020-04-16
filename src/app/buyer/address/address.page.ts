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
  timeOutEvent;
  addresses: Address[]
  address = new Address();

  constructor(
    private location: Location,
    private popoverController: PopoverController) {
    this.address.location = utilsService.location.formattedAddress;
  }

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

  async presentPopover(address: Address = new Address()) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      componentProps: { address: address },
      cssClass: 'bottom-sheet-popover',
    });
    //popover.style.cssText = '--width: 90%;--height:60%';
    await popover.present();
    const { data } = await popover.onWillDismiss();
    if (data) {
      this.ionViewWillEnter();
    }
  }

  selectDestionation(address: Address) {
    utilsService.destination = address;
    this.closeAddress();
  }

  touchstart(item: Address) {
    this.timeOutEvent = setTimeout(() => {
      this.presentPopover(item);
    }, 500);
  }

  touchend() {
    clearTimeout(this.timeOutEvent);
  }

  closeAddress() {
    this.location.back();
  }
}
