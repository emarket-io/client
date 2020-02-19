import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { Wechat } from '@ionic-native/wechat/ngx';
//import { Alipay } from '@ionic-native/alipay/ngx';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PurchasePage } from './purchase.page';

const routes: Routes = [
  {
    path: '',
    component: PurchasePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  //  providers: [Alipay, Wechat],
  declarations: [PurchasePage]
})
export class PurchasePageModule { }
