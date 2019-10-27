import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Address } from '../../../../sdk/address_pb';
import { apiService, utilsService } from '../../../providers/utils.service'

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  address = new Address()

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  submitAddress() {
    this.address.userId = 'TODO';
    apiService.addressClient.add(this.address, apiService.metaData, (err: any, response: Address) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        console.log(response);
        this.popoverController.dismiss();
      }
    });
  }
}
