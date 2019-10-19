import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { File } from '@ionic-native/file/ngx';
import { Commodity, Medium } from '../../../sdk/commodity_pb';
import { HttpClient } from '@angular/common/http';
import { apiService } from '../../providers/api.service'
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { environment } from '../../../environments/environment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage {
  commodity = new Commodity();
  city = apiService.address.addressComponent.city;
  formData = new FormData();
  images = [];

  constructor(
    private file: File,
    private camera: Camera,
    private webview: WebView,
    private location: Location,
    private httpClient: HttpClient) { }

  addMedia() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.ALLMEDIA,
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

  submit() {
    // upload firstly
    this.httpClient.post(environment.apiUrl + '/upload', this.formData, { params: { title: this.commodity.title } }).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    );

    this.commodity.city = this.city;
    apiService.commodityClient.add(this.commodity, apiService.metaData, (err: any, response: Commodity) => {
      if (err) {
        alert(JSON.stringify(err));
      } else {
        console.log(response);
        this.location.back();
      }
    });
    // this.ngOnInit();
    // this.location.back();
  }
}
