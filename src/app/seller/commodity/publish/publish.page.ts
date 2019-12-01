import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { File } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { CategoryPage } from '../category/category.page';
import { PricePage } from '../price/price.page';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { environment } from '../../../../environments/environment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Commodity, Medium, Price } from '../../../../sdk/commodity_pb';
import { apiService, utilsService } from '../../../providers/utils.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage {
  images = [];
  //price_single = '';
  //price_group = '';
  //amount = '';
  //displayMore = false;
  formData = new FormData();
  commodity = new Commodity();

  constructor(
    private file: File,
    private camera: Camera,
    private router: Router,
    private webview: WebView,
    private location: Location,
    private httpClient: HttpClient,
    private modalController: ModalController) {
    // let price = new Price();
    // price.name = '单买价';
    // this.commodity.pricesList.push(price);
    // let price2 = new Price();
    // price2.name = '拼单价';
    // this.commodity.pricesList.push(price2);
  }

  ionViewWillEnter() {
    if (!utilsService.getUser()) {
      this.router.navigateByUrl('/login');
    }

    // if (!utilsService.getUser().cert) {
    //   utilsService.alert('发布商品，请先实名认证');
    //   this.router.navigateByUrl('/certification');
    // }
    this.commodity.city = utilsService.location.addressComponent.province + utilsService.location.addressComponent.city;
  }

  addMedia() {
    const options: CameraOptions = {
      // quality: 50,
      allowEdit: true,
      targetWidth: 500,
      targetHeight: 500,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then(async (imageUrl) => {
      this.images.push(this.webview.convertFileSrc(imageUrl));
      var filename = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
      var dirpath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);

      try {
        var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
        var retrievedFile = await this.file.getFile(dirUrl, filename, {});
      } catch (err) {
        alert(err)
      }

      retrievedFile.file(data => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imgBlob = new Blob([reader.result], {
            type: data.type
          });
          this.formData.append('uploadfile', imgBlob, data.name);
          let medium = new (Medium);
          medium.image = data.name;
          this.commodity.mediaList.push(medium);
        };
        reader.readAsArrayBuffer(data);
        //alert(data.name + '|' + data.localURL + '|' + data.type + '|' + data.size);
      });
      //alert(base64Image);
    }, (err) => {
      // Handle error
      utilsService.alert(err);
    });
  }

  addPrice() {
    let price = new Price();
    price.name = '规格描述';
    this.commodity.pricesList.push(price);
  }

  removePrice(i: number) {
    this.commodity.pricesList.splice(i, 1);
  }

  submit() {
    if (!this.commodity.title) {
      return utilsService.alert('请输入标题');
    }

    if (this.commodity.mediaList.length == 0) {
      return utilsService.alert('请拍摄照片');
    }

    if (!utilsService.check(this.commodity.title)) {
      return utilsService.alert('标题含有不合规内容，请检查');
    }

    // upload firstly
    this.httpClient.post(environment.apiUrl + '/upload', this.formData, {
      params: {
        paths: [utilsService.getUser().id, this.commodity.title]
      }, responseType: 'text',
    }).subscribe(
      data => {
        console.log(data);
        this.commodity.ownerId = utilsService.getUser().id;
        apiService.commodityClient.add(this.commodity, apiService.metaData, (err: any, response: Commodity) => {
          if (err) {
            utilsService.alert(JSON.stringify(err));
          } else {
            console.log(response);
            // this.location.back();
            this.router.navigateByUrl('/seller');
          }
        });
      }, error => {
        utilsService.alert(JSON.stringify(error));
      }
    );
  }

  async presentModal(ev: any) {
    const modal = await this.modalController.create({
      component: CategoryPage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.commodity.category = data.category;
  }

  async presentPrice() {
    const modal = await this.modalController.create({
      component: PricePage,
      componentProps: { commodity: this.commodity },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.commodity = data.commodity;
  }
}
