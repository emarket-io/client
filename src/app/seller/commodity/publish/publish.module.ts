import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//import { File } from '@ionic-native/file/ngx';
import { HttpClientModule } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicModule } from '@ionic/angular';

import { PublishPage } from './publish.page';

const routes: Routes = [
  {
    path: '',
    component: PublishPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    Camera, 
  //  File, 
    WebView],
  declarations: [PublishPage],
})
export class PublishPageModule { }
