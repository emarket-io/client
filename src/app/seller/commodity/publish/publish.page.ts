import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { CategoryPage } from '../category/category.page';
import { ExpressPage } from '../express/express.page';
import { PricePage } from '../price/price.page';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { Commodity, Medium, Price } from '../../../../sdk/commodity_pb';
import { apiService, utilsService } from '../../../providers/utils.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage {
  mediumPreviews = [];
  formData = new FormData();
  commodity = new Commodity();

  constructor(
    private router: Router,
    private location: Location,
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
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
    // utilsService.toast('请横屏拍摄');
    //setTimeout(() => {
    let u = <HTMLInputElement>document.getElementById("cameraBtn");
    u.click();
    //}, 1000);
  }

  addMedia() {
    //this.router.navigateByUrl('camera', { state: { url: this.router.url } });
    //utilsService.toast('请横屏拍摄');
    let u = <HTMLInputElement>document.getElementById("cameraBtn");

    let reader = new FileReader();
    reader.onload = (evt) => {
      let img = new Image();
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

        //this.images.push(canvas.toDataURL('image/jpg', 60));
        let mediumPreview = new Object;
        mediumPreview["image"] = canvas.toDataURL('image/jpg', 60)
        this.mediumPreviews.push(mediumPreview);

        canvas.toBlob(data => {
          let imageName = new Date().getTime() + '.jpg';
          this.formData.append('uploadfile', data, imageName);
          let medium = new (Medium);
          medium.image = imageName;
          this.commodity.mediaList.push(medium);
        }, 'image/jpg', 60);
      };
    };
    let file = u.files[0];
    if (file.type.includes("image")) {
      reader.readAsDataURL(file);
    } else if (file.type.includes("video")) {
      if (file.size > 30 * 1024 * 1024) {
        return utilsService.alert("文件大小超过30M，请重新上传");
      }
      let mediumPreview = new Object;
      mediumPreview["video"] = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.mediumPreviews.push(mediumPreview);

      let videoName = new Date().getTime() + '.mp4';
      this.formData.append('uploadfile', file, videoName);
      let medium = new (Medium);
      medium.video = videoName;
      this.commodity.mediaList.push(medium);
    }
  }

  remove(index) {
    this.mediumPreviews.splice(index, 1);
    this.commodity.mediaList.splice(index, 1);
    let data = this.formData.getAll('uploadfile');
    data.splice(index, 1);
    this.formData = new FormData();
    for (let k of data) {
      this.formData.append('uploadfile', <File>k, (<File>k).name);
    }
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
        apiService.commodityClient.add(this.commodity, apiService.metaData).then(response => {
          console.log(response);
          // this.location.back();
          this.router.navigateByUrl('/seller');
        }).catch(err => {
          utilsService.alert(JSON.stringify(err));
        })
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
