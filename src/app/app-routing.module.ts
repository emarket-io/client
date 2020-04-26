import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'view', loadChildren: './buyer/view/view.module#ViewPageModule' },
  { path: 'commodity/detail', loadChildren: './buyer/detail/detail.module#DetailPageModule' },
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
  { path: 'selection', loadChildren: './buyer/detail/selection/selection.module#SelectionPageModule' },
  { path: 'seller_order_detail', loadChildren: './seller/order/detail/detail.module#DetailPageModule' },
  { path: 'session', loadChildren: './user/session/session.module#SessionPageModule' },
  { path: 'message', loadChildren: './user/message/message.module#MessagePageModule' },
  { path: 'shop', loadChildren: './seller/shop/shop.module#ShopPageModule' },
  { path: 'seller_account', loadChildren: './seller/account/account.module#AccountPageModule' },
  { path: 'setting', loadChildren: './user/my/setting/setting.module#SettingPageModule' },
  { path: 'about', loadChildren: './user/my/about/about.module#AboutPageModule' },
  { path: 'preference', loadChildren: './user/preference/preference.module#PreferencePageModule' },
  { path: 'help', loadChildren: './user/help/help.module#HelpPageModule' },
  { path: 'service', loadChildren: './user/help/service/service.module#ServicePageModule' },
  { path: 'camera', loadChildren: './seller/commodity/camera/camera.module#CameraPageModule' },
  { path: 'memo', loadChildren: './user/tools/memo/memo.module#MemoPageModule' },
  { path: 'scanner', loadChildren: './user/scanner/scanner.module#ScannerPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
