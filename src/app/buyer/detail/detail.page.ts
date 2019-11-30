import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Order } from '../../../sdk/order_pb';
import { Wechat } from '@ionic-native/wechat/ngx';
import { PopoverController } from '@ionic/angular';
import { Commodity } from '../../../sdk/commodity_pb';
import { SelectionPage } from './selection/selection.page';
import { utilsService } from '../../providers/utils.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  host = environment.apiUrl;
  commodity: Commodity;
  formatRBM = utilsService.formatRMB;
  slideOpts = {
    slidesPerView: 1,
    autoplay: {
      delay: 2000,
    },
  };

  constructor(
    private router: Router,
    private wechat: Wechat,
    private popoverController: PopoverController) {
    this.commodity = <Commodity>this.router.getCurrentNavigation().extras.state;
  }

  ionViewWillEnter() {
  }

  share() {
    this.wechat.share({
      message: {
        title: "[农村大集]上农村大集，感受淳朴与自然(" + this.commodity.title + ")",
        description: "This is description.",
        thumb: "www/img/thumbnail.png",
        mediaTagName: "TEST-TAG-001",
        messageExt: "这是第三方带的测试字段",
        messageAction: "<action>dotalist</action>",
        media: {
          type: 7,// this.wechat.Type.WEBPAGE,
          webpageUrl: environment.apiUrl + '/download'//"http://www.bing.com"
        }
      },
      scene: 1,//this.wechat.Scene.TIMELINE   // share to Timeline
    }).then(() => {
      console.log("Success");
    }).catch(err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  async select(ev: any) {
    const popover = await this.popoverController.create({
      component: SelectionPage,
      componentProps: { commodity: this.commodity },
      event: ev,
      translucent: true,
      cssClass: 'bottom-sheet-popover'
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();
    let order = new Order();
    order.snapshot = this.commodity;
    order.price = data.price;
    this.router.navigateByUrl('/purchase', { state: order })
  }
}
