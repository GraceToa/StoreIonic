import { Component } from '@angular/core';
import {StoreService} from '../../providers/store.service';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage  {

  orders:any []=[];

  constructor(private _ss:StoreService,private navCtrl:NavController) { }


  ionViewWillEnter(){
    this._ss.load_orders();
  }

  sendOrder(order){
      this._ss.order = {order:order};
       this.navCtrl.navigateForward(`/orderdetail`);
  }



}
