import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'view', loadChildren: './buyer/view/view.module#ViewPageModule' },
  { path: 'detail', loadChildren: './buyer/detail/detail.module#DetailPageModule' },
  { path: 'address', loadChildren: './buyer/address/address.module#AddressPageModule' },
  { path: 'order', loadChildren: './buyer/order/order.module#OrderPageModule' },
  { path: 'login', loadChildren: './user/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './user/signup/signup.module#SignupPageModule' },
  { path: 'coupon', loadChildren: './seller/coupon/coupon.module#CouponPageModule' },
  { path: 'add', loadChildren: './seller/coupon/add/add.module#AddPageModule' },
  { path: 'seller', loadChildren: './seller/seller.module#SellerPageModule' },
  { path: 'certification', loadChildren: './seller/certification/certification.module#CertificationPageModule' },
  { path: 'commodity', loadChildren: './seller/commodity/commodity.module#CommodityPageModule' },
  { path: 'publish', loadChildren: './seller/commodity/publish/publish.module#PublishPageModule' },
  { path: 'popover', loadChildren: './seller/commodity/popover/popover.module#PopoverPageModule' },
  { path: 'seller_order', loadChildren: './seller/order/order.module#OrderPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
