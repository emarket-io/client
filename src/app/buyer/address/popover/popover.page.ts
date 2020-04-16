import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Address } from '../../../../sdk/user_pb';
import { PopoverController } from '@ionic/angular';
import { apiService, utilsService } from '../../../providers/utils.service'

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage {
  @Input() address: Address;

  constructor(
    private router: Router,
    private popoverController: PopoverController) { }

  ionViewWillEnter() {
    if (!utilsService.getUser()) {
      this.popoverController.dismiss();
      return this.router.navigateByUrl('/login');
    }
    //this.address.location = this.location;
  }

  save() {
    if (!this.address.contact) {
      return utilsService.alert('收货人为空');
    }
    if (!this.address.telephone) {
      return utilsService.alert('手机号码为空');
    }
    if (!this.address.location) {
      return utilsService.alert('详细地址为空');
    }

    this.address.userId = utilsService.getUser().id;
    if (this.address.id != "") {
      apiService.addressClient.update(this.address, apiService.metaData).then(address => {
        console.log(address);
        this.popoverController.dismiss();
      }).catch(err => {
        utilsService.alert(JSON.stringify(err));
      })
    } else {
      apiService.addressClient.add(this.address, apiService.metaData).then(address => {
        console.log(address);
        this.popoverController.dismiss();
      }).catch(err => {
        utilsService.alert(JSON.stringify(err));
      })
    }
  }

  cancel() {
    this.popoverController.dismiss();
  }
}
