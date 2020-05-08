import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { User } from '../../../sdk/user_pb';
import { PopoverController } from '@ionic/angular';
import { Commodity } from '../../../sdk/commodity_pb';
import { Order, Groupon } from '../../../sdk/order_pb';
import { Router, ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private popoverController: PopoverController) {
    this.commodity = <Commodity>this.router.getCurrentNavigation().extras.state;
    if (this.commodity) {
      this.getOwnerById();
    } else {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['id']) {
          this.commodity = new Commodity();
          this.commodity.id = params['id'];
          apiService.commodityClient.get(this.commodity, apiService.metaData).then(commodity => {
            this.commodity = commodity;
            this.getOwnerById();
          })
        }
      });
    }
  }

  ionViewWillEnter() { }

  star() {
    // android only | https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  }

  share() {
    if (window.navigator['share']) {
      window.navigator['share']({
        title: '农村大集',
        text: '[农村大集]上农村大集，让农货便宜到家--' + this.commodity.title,
        url: 'https://iyou.city/commodity/detail?id=' + this.commodity.id
      }).then(() => {
        console.log('done');
      });
    } else {
      var aux = document.createElement("input");
      aux.setAttribute("value", "[农村大集]上农村大集，让农货便宜到家--" + this.commodity.title + ";https://iyou.city/commodity/detail?id=" + this.commodity.id);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("Copy");
      document.body.removeChild(aux);
      utilsService.toast('已将分享内容复制，打开微信粘贴即可');
      setTimeout(() => {
        //window.open('weixin://');
      }, 1000);
    }

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
      //event: ev,
      //translucent: true,
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
    apiService.userClient.get(user, apiService.metaData).then((user) => {
      this.owner = user;
    }).catch(err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  back() {
    if (history.length <= 2) {
      this.router.navigateByUrl('/');
    } else {
      this.location.back();
    }
  }
}
