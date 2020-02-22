import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from '../../../sdk/user_pb';
//import { Wechat } from '@ionic-native/wechat/ngx';
import { PopoverController } from '@ionic/angular';
import { Commodity } from '../../../sdk/commodity_pb';
import { Order, Groupon } from '../../../sdk/order_pb';
import { SelectionPage } from './selection/selection.page';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  host = environment.apiUrl;
  commodity: Commodity;
  owner: User;
  formatRBM = utilsService.formatRMB;
  slideOpts = {
    slidesPerView: 1,
    autoplay: {
      delay: 2000,
    },
  };

  constructor(
    private router: Router,
    //private wechat: Wechat,
    private popoverController: PopoverController) {
    this.commodity = <Commodity>this.router.getCurrentNavigation().extras.state;
  }

  ionViewWillEnter() {
    this.getOwnerById();
  }

  star() {
    //window.location.href = window.location.href;
    //window.close();
  }

  share() {
    var aux = document.createElement("input");
    aux.setAttribute("value", "[农村大集]上农村大集，让农货便宜到家--" + this.commodity.title);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("Copy");
    document.body.removeChild(aux);
    utilsService.toast('已将分享内容复制，打开微信粘贴即可');
    setTimeout(() => {
      window.open('weixin://');
    }, 1000);

    /*
    this.wechat.share({
      message: {
        title: "[农村大集]上农村大集，让农货便宜到家--" + this.commodity.title,
        description: "This is description.",
        thumb: "www/assets/icon/drawable-mdpi-icon.png",
        mediaTagName: "TEST-TAG-001",
        messageExt: "这是第三方带的测试字段",
        messageAction: "<action>dotalist</action>",
        media: {
          type: 7,// this.wechat.Type.WEBPAGE,
          webpageUrl: "http://iyou.city"
        }
      },
      scene: 1,//this.wechat.Scene.TIMELINE   // share to Timeline
    }).then(() => {
      console.log("Success");
    }).catch(err => {
      utilsService.alert(JSON.stringify(err));
    });
    */
  }

  async select(isGroup: boolean, ev: Event) {
    let order = new Order();
    if (isGroup) {
      order.groupon = new Groupon();
    }
    order.snapshot = this.commodity;
    const popover = await this.popoverController.create({
      component: SelectionPage,
      componentProps: { order: order },
      event: ev,
      translucent: true,
      cssClass: 'bottom-sheet-popover'
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();
    if (data) {
      utilsService.paraMap['purchase'] = data.order;
      this.router.navigateByUrl('/purchase', { state: data.order })
    }
  }

  session() {
    this.router.navigateByUrl('session', { state: this.commodity })
  }

  getOwnerById() {
    let user = new User();
    user.id = this.commodity.ownerId;
    apiService.userClient.get(user, apiService.metaData, (err: any, response: User) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        this.owner = response;
      }
    });
  }
}
