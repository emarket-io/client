import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Address } from '../../../../sdk/user_pb';
import { apiService, utilsService } from '../../../providers/utils.service'

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage {
  address = new Address()

  constructor(private popoverController: PopoverController) { }

  submitAddress() {
    if (!this.address.contact) {
      utilsService.alert('姓名不能为空');
      return
    }
    this.address.userId = utilsService.getUser().id;
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
