import * as grpcWeb from 'grpc-web';
import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { User, Certification } from '../../../sdk/user_pb';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { environment } from '../../../environments/environment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
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
  user = new User();

  constructor(
    private file: File,
    private camera: Camera,
    private webview: WebView,
    private httpClient: HttpClient) {
    this.user.id = utilsService.getUser().id;
    this.user.cert = new Certification();
  }

  ionViewWillEnter() {
    apiService.userClient.get(this.user, apiService.metaData, (err: any, response: User) => {
      if (err) {
        utilsService.alert(JSON.stringify(err));
      } else {
        this.user = response;
        if (!this.user.cert) {
          this.user.cert = new Certification();
        }
      }
    })
  }

  addImage(name: string) {
    const options: CameraOptions = {
      targetWidth: 600,
      targetHeight: 400,
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
          this.formData.append('uploadfile', imgBlob, name + '.jpg');
          this.user.cert.imagesList.push(name + '.jpg');
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

  submit() {
    // upload images
    this.httpClient.post(environment.apiUrl + '/upload', this.formData, {
      params: {
        paths: [utilsService.getUser().id, 'certification']
      }
    }).subscribe(
      data => {
        console.log(data);
        apiService.userClient.certificate(this.user, apiService.metaData, (err: grpcWeb.Error, response: User) => {
          if (err) {
            utilsService.alert(JSON.stringify(err));
          }
        })
      }, error => {
        utilsService.alert(JSON.stringify(error));
      }
    );
  }
}
