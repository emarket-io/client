import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { apiService } from '../../providers/api.service'
import { File, FileEntry, IFile } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage {

  address = apiService.currentAddress;
  constructor(
    private file: File,
    private router: Router,
    private camera: Camera) { }

  gotoPublish() {
    this.router.navigateByUrl('/store/publish');
  }

  addMedia() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
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
        alert(data.name + data.localURL + data.type);
      });

      alert(base64Image);
    }, (err) => {
      // Handle error
    });
  }
}
