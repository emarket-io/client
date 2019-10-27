import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'view', loadChildren: './buyer/view/view.module#ViewPageModule' },
  { path: 'detail', loadChildren: './buyer/detail/detail.module#DetailPageModule' },
  { path: 'publish', loadChildren: './seller/publish/publish.module#PublishPageModule' },
  { path: 'address', loadChildren: './buyer/address/address.module#AddressPageModule' },
  { path: 'popover', loadChildren: './seller/popover/popover.module#PopoverPageModule' },
  { path: 'order', loadChildren: './buyer/order/order.module#OrderPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
