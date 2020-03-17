import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CategoryPage } from '../category/category.page';
import { ExpressPage } from '../express/express.page';
import { PricePage } from '../price/price.page';
import { UpdatePage } from './update.page';
import { ModalPageModule } from '../category/category.module';
import { ExpressPageModule } from '../express/express.module';
import { PricePageModule } from '../price/price.module';

const routes: Routes = [
  {
    path: '',
    component: UpdatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageModule,
    ExpressPageModule,
    PricePageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdatePage],
  entryComponents: [CategoryPage, ExpressPage, PricePage],
})
export class UpdatePageModule { }
