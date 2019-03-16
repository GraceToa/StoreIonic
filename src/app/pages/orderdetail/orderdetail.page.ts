import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';

//providers
import {StoreService}from '../../providers/store.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.page.html',
  styleUrls: ['./orderdetail.page.scss'],
})
export class OrderdetailPage implements OnInit {

  order:any={};

  constructor(private _ss:StoreService,private navCtrl: NavController) { }

  ngOnInit() {
    for (let key in this._ss.order) {
      this.order = this._ss.order[key];
    }
  }

  delete_order(order_id:string){
    this._ss.delete_order(order_id)
    .subscribe((data:any)=>{
        console.log(data);

        if(data['error']){
          console.log("error load categories");
        }else{
          this._ss.load_orders();
          this.navCtrl.pop();
        }
    })
  }

  goBack(){
    this.navCtrl.pop();
  }

}
