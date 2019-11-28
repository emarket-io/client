import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Commodity, Price } from '../../../../sdk/commodity_pb';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
})
export class SelectionPage {
  @Input() commodity: Commodity;
  host = environment.apiUrl;
  selectedPrice: Price;

  constructor(private popoverController: PopoverController) { }

  select(price: Price) {
    this.selectedPrice = price;
  }

  close() {
    this.popoverController.dismiss({ price: this.selectedPrice });
  }
}
