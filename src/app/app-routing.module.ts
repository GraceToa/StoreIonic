import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'product', loadChildren: './pages/product/products.module#ProductsPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'store', loadChildren: './pages/store/store.module#StorePageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'bycategory', loadChildren: './pages/bycategory/bycategory.module#BycategoryPageModule' },
  { path: 'orderdetail', loadChildren: './pages/orderdetail/orderdetail.module#OrderdetailPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
