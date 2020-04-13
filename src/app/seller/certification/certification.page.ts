import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { Certification } from '../../../sdk/user_pb';
import { environment } from '../../../environments/environment';
import { apiService, utilsService } from '../../providers/utils.service';

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
  couldSubmit = false;

  constructor(
    private router: Router,
    private location: Location,
    private httpClient: HttpClient) {
    this.user.cert = new Certification();
    utilsService.events(this.router.url + 'photo').subscribe((data) => {
      this.images.push(data);
    });
    utilsService.events(this.router.url + 'blob').subscribe((data: Blob) => {
      if (this.formData.getAll('uploadfile').length == 0) {
        this.formData.append('uploadfile', data, '身份证正面.jpg');
      }
      if (this.formData.getAll('uploadfile').length == 1) {
        this.formData.append('uploadfile', data, '身份证反面.jpg');
      }
    });
  }

  ionViewWillEnter() {
    apiService.userClient.get(this.user, apiService.metaData).then(user => {
      this.user = user;
      if (!this.user.cert) {
        this.user.cert = new Certification();
        this.couldSubmit = true;
      }
    }).catch(err => {
      utilsService.alert(JSON.stringify(err));
    });
  }

  addImage(name: string) {
    this.router.navigateByUrl('camera', { state: { url: this.router.url } });
    /*
    const options: CameraOptions = {
      targetWidth: 600,
      targetHeight: 400,
      // correctOrientation: true,
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
    });*/
  }

  submit() {
    // upload images
    this.httpClient.post(environment.apiUrl + '/upload', this.formData, {
      params: {
        paths: [utilsService.getUser().id, 'certification']
      }, responseType: 'text',
    }).subscribe(
      data => {
        console.log(data);
        apiService.userClient.certificate(this.user, apiService.metaData).then(user => {
          this.router.navigateByUrl('seller');
        }).catch(err => {
          utilsService.alert(JSON.stringify(err));
        })
      }, error => {
        utilsService.alert(JSON.stringify(error));
      }
    );
  }
}
