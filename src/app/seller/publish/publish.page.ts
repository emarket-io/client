import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Commodity } from '../../../sdk/commodity_pb';
import { HttpClient } from '@angular/common/http';
import { apiService } from '../../providers/api.service'
import { environment } from '../../../environments/environment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage {
  commodity=new Commodity();
  address = apiService.currentAddress;
  formData = new FormData();

  constructor(
    private file: File,
    private router: Router,
    private camera: Camera,
    private httpClient: HttpClient) { }

  addMedia() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.ALLMEDIA,
    };
    this.camera.getPicture(options).then(async (imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      var filename = imageData.substr(imageData.lastIndexOf('/') + 1);
      var dirpath = imageData.substr(0, imageData.lastIndexOf('/') + 1);

      try {
        var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
        var retrievedFile = await this.file.getFile(dirUrl, filename, {});
      } catch (err) {
        alert(err)
      }

      retrievedFile.file(data => {
        //this.dismissLoader();
        // if (data.size > MAX_FILE_SIZE) return this.presentAlert("Error", "You cannot upload more than 5mb.");
        //if (data.type !== ALLOWED_MIME_TYPE) return this.presentAlert("Error", "Incorrect file type.");

        //this.selectedVideo = retrievedFile.nativeURL;

        const reader = new FileReader();
        reader.onloadend = () => {
            //const formData = new FormData();
            const imgBlob = new Blob([reader.result], {
                type: data.type
            });
            this.formData.append('file', imgBlob, data.name);
            //this.uploadImageData(formData);
        };
        reader.readAsArrayBuffer(data);

        //this.formData.append('uploadfile', data, data.name);
        //alert(data.name + '|' + data.localURL + '|' + data.type + '|' + data.size);
      });

      //alert(base64Image);
    }, (err) => {
      // Handle error
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

    apiService.commodityClient.add(this.commodity, apiService.metaData, (err: any, response: Commodity) => {
      if (err) {
        alert(JSON.stringify(err));
      } else {
        console.log(response);
      }
    });
    // this.ngOnInit();
  }
}
