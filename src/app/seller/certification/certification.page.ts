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
  selector: 'app-certification',
  templateUrl: './certification.page.html',
  styleUrls: ['./certification.page.scss'],
})
export class CertificationPage {
  images = [];
  formData = new FormData();
  host = environment.apiUrl;
  user = utilsService.getUser();

  constructor(private file: File,
    private camera: Camera,
    private router: Router,
    private webview: WebView,
    private httpClient: HttpClient) { }

  uploadImage(name: string) {
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
          const imgBlob = new Blob([reader.result], { type: data.type });
          this.formData.append('uploadfile', imgBlob, name + '.jpg');
          this.httpClient.post(environment.apiUrl + '/upload', this.formData, {
            params: {
              path: [utilsService.getUser().id]
              //title: utilsService.getUser().id + '-' + 'certification'
            }
          }).subscribe(
            data => {
              console.log(data);
            }, error => {
              utilsService.alert(JSON.stringify(error));
            }
          );
        };
        reader.readAsArrayBuffer(data);
        //alert(data.name + '|' + data.localURL + '|' + data.type + '|' + data.size);
      });
      //alert(base64Image);
    }, (err) => {
      // Handle error
      utilsService.alert(JSON.stringify(err));
    });
  }

}
