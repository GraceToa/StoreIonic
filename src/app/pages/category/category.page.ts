import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';

//pages
import{ProductService} from '../../providers/product.service';
//providers
import{BycategoryPage} from '../../pages/bycategory/bycategory.page';



@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  byCategory: BycategoryPage;

  constructor(public _ps: ProductService, private navCtrl:NavController) { }

  ngOnInit() {
  }


  showByCategory(category){
    this._ps.bycategory = {category:category};
    this.navCtrl.navigateForward(`/bycategory`);
  }

}
