import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Commodity, Price } from '../../../../sdk/commodity_pb';

@Component({
  selector: 'app-express',
  templateUrl: './express.page.html',
  styleUrls: ['./express.page.scss'],
})
export class ExpressPage {
  @Input() commodity: Commodity;

  constructor(private modalController: ModalController) { }

  close() {
    this.modalController.dismiss({ commodity: this.commodity });
  }

}
