import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//import { Wechat } from '@ionic-native/wechat/ngx';
import { IonicModule } from '@ionic/angular';
import { DetailPage } from './detail.page';
import { SelectionPage } from './selection/selection.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
//  providers: [Wechat],
  declarations: [DetailPage, SelectionPage],
  entryComponents: [SelectionPage],
})
export class DetailPageModule { }
