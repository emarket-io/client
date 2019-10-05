import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  closeAddress(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
