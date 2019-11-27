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
  { path: 'purchase', loadChildren: './buyer/purchase/purchase.module#PurchasePageModule' },
  { path: 'login', loadChildren: './user/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './user/signup/signup.module#SignupPageModule' },
  { path: 'coupon', loadChildren: './seller/coupon/coupon.module#CouponPageModule' },
  { path: 'add', loadChildren: './seller/coupon/add/add.module#AddPageModule' },
  { path: 'seller', loadChildren: './seller/seller.module#SellerPageModule' },
  { path: 'certification', loadChildren: './seller/certification/certification.module#CertificationPageModule' },
  { path: 'commodity', loadChildren: './seller/commodity/commodity.module#CommodityPageModule' },
  { path: 'publish', loadChildren: './seller/commodity/publish/publish.module#PublishPageModule' },
  { path: 'seller_order', loadChildren: './seller/order/order.module#OrderPageModule' },
  { path: 'buyer_order_detail', loadChildren: './buyer/order/detail/detail.module#DetailPageModule' },
  { path: 'commodity_update', loadChildren: './seller/commodity/update/update.module#UpdatePageModule' },
  { path: 'price', loadChildren: './seller/commodity/price/price.module#PricePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
