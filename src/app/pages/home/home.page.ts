import { Component,ViewChild } from '@angular/core';
import {IonInfiniteScroll,NavController} from '@ionic/angular';
import {ModalController} from '@ionic/angular';

//providers
import {ProductService} from '../../providers/product.service';
import {UserService} from '../../providers/user.service';
import {StoreService} from '../../providers/store.service';

//pages ModalController
import {StorePage}from '../store/store.page';
import {LoginPage}from '../login/login.page';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  data = [];
  user:any= {};

  constructor(public _ps: ProductService,private navCtrl: NavController,
              private _us:UserService,private modalCtrl: ModalController,
              public _ss:StoreService) {
               }

  nextPage(event){
      this._ps.load_products().then(()=>{
         setTimeout(() => {
         console.log('Done');
         event.target.complete();

         // App logic to determine if all data is loaded
         // and disable the infinite scroll
             if (this.data.length == 1000) {
               event.target.disabled = true;
             }
           }, 500);
        })
  }

  getProduct(item){
      this._ps.item = {item:item};
       this.navCtrl.navigateForward(`/product`);
      // this.router.navigate(['/product',item]);
  }

  show_store(){
      let modal:any;
      if(this._us.token){
          modal = this.moveModalToStorage();
      }else{
        modal = this.moveModalToLogin();
      }
    }

    async moveModalToLogin(){
      const modal = await this.modalCtrl.create({
        component: LoginPage
      });
      return await modal.present();
    }

    async moveModalToStorage(){
      const modal = await this.modalCtrl.create({
        component: StorePage
      });
      return await modal.present();
    }

  showProfile(){
      this._us.getUserFull();
       this.navCtrl.navigateForward(`/profile`);
  }


}
