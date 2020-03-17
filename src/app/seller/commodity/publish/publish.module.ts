import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CategoryPage } from '../category/category.page';
import { ExpressPage } from '../express/express.page';
import { PricePage } from '../price/price.page';
import { PublishPage } from './publish.page';
import { ModalPageModule } from '../category/category.module';
import { ExpressPageModule } from '../express/express.module';
import { PricePageModule } from '../price/price.module';

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
    ModalPageModule,
    ExpressPageModule,
    PricePageModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  declarations: [PublishPage],
  entryComponents: [CategoryPage, ExpressPage, PricePage],
})
export class PublishPageModule { }
