import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MemoPage } from './memo.page';

const routes: Routes = [
  {
    path: '',
    component: MemoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddComponent, MemoPage],
  entryComponents: [AddComponent],
})
export class MemoPageModule { }
