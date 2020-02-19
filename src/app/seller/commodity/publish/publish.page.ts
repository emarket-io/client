import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { CategoryPage } from '../category/category.page';
import { ExpressPage } from '../express/express.page';
import { PricePage } from '../price/price.page';
import { environment } from '../../../../environments/environment';
import { Commodity, Medium, Price } from '../../../../sdk/commodity_pb';
import { apiService, utilsService } from '../../../providers/utils.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage {
  images = [];
  formData = new FormData();
  commodity = new Commodity();

  constructor(
    private router: Router,
    private location: Location,
    private httpClient: HttpClient,
    private modalController: ModalController) {
    // utilsService.events(this.router.url + 'photo').subscribe((data) => {
    //   this.images.push(data);
    // });
    // utilsService.events(this.router.url + 'blob').subscribe((data: Blob) => {
    //   let imageName = new Date().getTime() + '.jpg';
    //   this.formData.append('uploadfile', data, imageName);
    //   let medium = new (Medium);
    //   medium.image = imageName;
    //   this.commodity.mediaList.push(medium);
    // });
  }

  ionViewWillEnter() {
    if (!utilsService.getUser()) {
      return this.router.navigateByUrl('/login');
    }

    // if (!utilsService.getUser().cert) {
    //   utilsService.alert('发布商品，请先实名认证');
    //   this.router.navigateByUrl('/certification');
    // }
    this.commodity.city = utilsService.location.addressComponent.province + utilsService.location.addressComponent.city;
  }

  toast() {
    utilsService.toast('请横屏拍摄');
    setTimeout(() => {
      let u = <HTMLInputElement>document.getElementById("cameraBtn");
      u.click();
    }, 1000);
  }

  addMedia() {
    //this.router.navigateByUrl('camera', { state: { url: this.router.url } });
    //utilsService.toast('请横屏拍摄');
    let u = <HTMLInputElement>document.getElementById("cameraBtn");
    let img = new Image();
    let reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result.toString();
      img.onload = () => {
        let min = Math.min(img.width, img.height);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 500;
        canvas.height = 500;
        let x = img.width - img.height;
        if (x > 0) {
          context.drawImage(img, x / 2, 0, min, min, 0, 0, canvas.width, canvas.height);
        } else {
          context.drawImage(img, 0, -x / 2, min, min, 0, 0, canvas.width, canvas.height);
        }


        this.images.push(canvas.toDataURL('image/jpg', 60));
        canvas.toBlob(data => {
          let imageName = new Date().getTime() + '.jpg';
          this.formData.append('uploadfile', data, imageName);
          let medium = new (Medium);
          medium.image = imageName;
          this.commodity.mediaList.push(medium);
        }, 'image/jpg', 60);
      };

    };
    reader.readAsDataURL(u.files[0]);
  }

  /*addMedia1() {
    const options: CameraOptions = {
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
        utilsService.alert(err)
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
      utilsService.alert(JSON.stringify(err));
    });
  }*/

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

    if (this.commodity.city.length > 10) {
      return utilsService.alert('输入省市即可');
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
        this.commodity.status = '已上线';
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

  async presentExpress() {
    const modal = await this.modalController.create({
      component: ExpressPage,
      componentProps: { commodity: this.commodity },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.commodity = data.commodity;
  }
}
