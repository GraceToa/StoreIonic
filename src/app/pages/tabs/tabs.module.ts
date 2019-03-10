import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

//pages
import { TabsPage } from './tabs.page';

const routes:Routes = [
  {
      path: '',
      redirectTo: '/tabs/home',
      pathMatch: 'full',
    },
  {
    path: 'tabs',
    component: TabsPage,

    children:[

      {
        path: 'home',
        loadChildren: 'src/app/pages/home/home.module#HomePageModule'
      },
      {
        path: 'category',
        loadChildren: 'src/app/pages/category/category.module#CategoryPageModule'
      },
      {
      path: 'home/product',
      loadChildren:'src/app/pages/product/products.module#ProductsPageModule'
      },
      {
      path: 'order',
      loadChildren:'src/app/pages/order/order.module#OrderPageModule'
      },
      {
      path: 'search',
      loadChildren:'src/app/pages/search/search.module#SearchPageModule'
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
