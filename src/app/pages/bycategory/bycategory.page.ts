import { Component, OnInit } from '@angular/core';
import{ProductService} from "../../providers/product.service"
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-bycategory',
  templateUrl: './bycategory.page.html',
  styleUrls: ['./bycategory.page.scss'],
})
export class BycategoryPage implements OnInit {

  bycategory:any;

  constructor(public _ps:ProductService,public navCtrl:NavController){ }

  ngOnInit() {
    for (let key in this._ps.bycategory) {
        this.bycategory = this._ps.bycategory[key];
    }
    this._ps.loadProductByCategory(this.bycategory.id);
  }

  getProduct(item){
    this._ps.item = {item:item};
     this.navCtrl.navigateForward(`/product`);
  }


  goBack(){
    this.navCtrl.navigateBack('/tabs/category');
  }

}
