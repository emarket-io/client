import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ModalPage } from './modal/modal.page';
import { ModalPageModule } from './modal/modal.module';
import { IonicModule } from '@ionic/angular';

import { AddressPage } from './address.page';

const routes: Routes = [
  {
    path: '',
    component: AddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalPage, AddressPage],
  entryComponents: [ModalPage],
})
export class AddressPageModule { }
