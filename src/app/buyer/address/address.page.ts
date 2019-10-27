import { Component, OnInit } from '@angular/core';
import { apiService, utilsService } from '../../providers/utils.service'
import { Location } from "@angular/common";
import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  address = utilsService.address.formattedAddress;

  constructor(
    private location: Location,
    private modalController: ModalController) { }

  ngOnInit() { }


  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
    });
    return await modal.present();
  }

  closeAddress() {
    this.location.back();
  }
}
