import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
//providers
import {ProductService}from '../../providers/product.service';
import {StoreService}from '../../providers/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  item:any={};
  product:any;

  constructor(public _ps:ProductService, private navCtrl:NavController,
                  public _ss:StoreService) {
    }

  ngOnInit() {
    for (let key in this._ps.item) {
      this.product = this._ps.item[key];
    }
  }

  goBack(){
    this.navCtrl.pop();
  }

}
