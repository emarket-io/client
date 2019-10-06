import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { apiService } from '../../provider/api.service'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {

  address = apiService.currentAddress;
  
  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  closeAddress() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
