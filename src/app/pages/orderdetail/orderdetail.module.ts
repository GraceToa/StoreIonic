import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderdetailPage } from './orderdetail.page';

//pipes
import {PipesModule} from '../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: OrderdetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderdetailPage]
})
export class OrderdetailPageModule {}
