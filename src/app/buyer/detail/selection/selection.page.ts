import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { utilsService } from '../../../providers/utils.service';
import { Commodity, Price } from '../../../../sdk/commodity_pb';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
})
export class SelectionPage {
  @Input() commodity: Commodity;
  formatRBM = utilsService.formatRMB;
  host = environment.apiUrl;
  selectedPrice: Price;

  constructor(private popoverController: PopoverController) { }

  ionViewWillEnter() {
    this.selectedPrice = this.commodity.pricesList[0];
  }

  select(price: Price) {
    this.selectedPrice = price;
  }

  continue() {
    this.popoverController.dismiss({ price: this.selectedPrice });
  }

  close() {
    this.popoverController.dismiss();
  }
}
