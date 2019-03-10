import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';

//providers
import {ProductService} from '../../providers/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage {

  searchTerm : any="";
  jsonData:any;

  constructor(public _ps: ProductService, private navCtrl:NavController) {
    this.setFilteredItems();
   }

  setFilteredItems() {
      this.jsonData = this._ps.search_Product(this.searchTerm);
  }

  getProduct(item){
      this._ps.item = {item:item};
       this.navCtrl.navigateForward(`/product`);
  }

}
