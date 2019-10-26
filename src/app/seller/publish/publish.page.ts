import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { environment } from '../../../environments/environment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Commodity, Medium, Price } from '../../../sdk/commodity_pb';
import { apiService, utilsService } from '../../providers/utils.service'

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage {
  commodity: Commodity;
  formData = new FormData();
  images = [];
  price_single = '';
  price_group = '';
  amount = '';

  constructor(
    private file: File,
    private camera: Camera,
    private router: Router,
    private webview: WebView,
    private httpClient: HttpClient) {
    this.commodity = new Commodity();
    this.commodity.price = new Price();
  }

  ionViewWillEnter() {
    this.commodity.category = utilsService.selectedCategory;
    this.commodity.city = utilsService.address.addressComponent.province + utilsService.address.addressComponent.city;
  }

  addMedia() {
    const options: CameraOptions = {
      // quality: 50,
      allowEdit: true,
      targetWidth: 500,
      targetHeight: 500,
      // destinationType: this.camera.DestinationType.FILE_URI,
      // encodingType: this.camera.EncodingType.JPEG,
      // mediaType: this.camera.MediaType.ALLMEDIA,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then(async (imageUrl) => {
      // imageUrl is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageUrl;
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
        //this.dismissLoader();
        // if (data.size > MAX_FILE_SIZE) return this.presentAlert("Error", "You cannot upload more than 5mb.");

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
      alert(err);
    });
  }

  async submit() {
    if (!this.commodity.title) {
      return utilsService.alert('请输入商品标题');
    }
    if (!this.price_single) {
      return utilsService.alert('请输入单价');
    }
    if (!this.price_group) {
      return utilsService.alert('请输入拼单价');
    }
    if (!this.amount) {
      return utilsService.alert('请输入库存数量');
    }
    // upload firstly
    this.httpClient.post(environment.apiUrl + '/upload', this.formData, { params: { title: this.commodity.title } }).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    );

    this.commodity.price.single = parseFloat(this.price_single) * 100;
    this.commodity.price.group = parseFloat(this.price_group) * 100;
    this.commodity.amount = parseInt(this.amount);

    apiService.commodityClient.add(this.commodity, apiService.metaData, (err: any, response: Commodity) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        console.log(response);
        this.router.navigateByUrl('/tabs/my');
      }
    });
  }

  presentPopover() {
    this.router.navigateByUrl('/popover');
  }

  back() {
    this.router.navigateByUrl('/tabs/my');
  }
}
