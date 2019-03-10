import { Injectable } from '@angular/core';
import {HttpClient}from "@angular/common/http";
import { AlertController, Platform,ModalController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {map} from 'rxjs/operators';


//providers
import {UserService} from './user.service';
import {URL_SERVICES}from '../config/url.services';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  items:any[]= [];
  total_store:number = 0;
  orders:any[]=[];
  order:any={};

  constructor(public http: HttpClient, public alertCtrl: AlertController,
              private platform: Platform,private storage: Storage,
              private _us:UserService, private modalCtrl: ModalController) {
       this.load_storage();
       this.update_total();
      }

  add_store(item_parameter:any){

    for(let item of this.items){
      if(item.codigo == item_parameter.codigo){
        return this.showAlert(item_parameter);
      }
    }
    this.items.push(item_parameter);
    this.update_total();
    this.save_storage();
  }

  private save_storage(){
    if(this.platform.is("cordova")){
      this.storage.set('items',this.items);
    }else{
      localStorage.setItem("items", JSON.stringify(this.items));
    }
  }

  load_storage(){
    let promess = new Promise((resolve)=>{
      if(this.platform.is("cordova")){
        //movil
        //leemos del storage
        this.storage.ready().then(()=>{
              this.storage.get("items").then(items=>{
                if(items){
                  this.items = items;
                }
                resolve();
              })
        })
      }else{
        if(localStorage.getItem("items")){
        this.items = JSON.parse(localStorage.getItem("items"));
        }
        resolve();
      }
    });
    return promess;
  }

    update_total(){
      this.total_store =0;
      for (let item of this.items){
        this.total_store += Number(item.precio_compra);
      }
    }

    remove_item(idx:number){
      this.items.splice(idx,1);
      this.save_storage();
      this.update_total();
    }

    do_order(){
      let data = new FormData();
      let codigos:string[]=[];
      for(let item of this.items){
        codigos.push(item.codigo);
      }
      data.append("items",codigos.join(","));
      console.log(codigos.join(","));
      let url = `${URL_SERVICES}/orders/get_order/${this._us.token}/${this._us.id_usuario}`;
      this.http.post(url,data)
      .subscribe((data:any)=>{
          if(data['error']){
            console.log("error create ")
          }else{
            this.items = [];
            this.alertCtrl.create({
            header: 'Order create OK¡¡',
            subHeader: "We will get in touch",
            buttons: ['OK']
          }).then(alert => alert.present())
          }
      })
    }

load_orders(){
  let url = `${URL_SERVICES}/orders/get_orders/${this._us.token}/${this._us.id_usuario}`;
  this.http.get(url).pipe(map(resp=>resp))
  .subscribe((data:any)=>{
      if(data['error']){
        console.log("error load orders");
      }else{
        this.orders = data['orders'];
        console.log(this.orders);
      }
  })
}

delete_order(order_id:string){
  let url = `${URL_SERVICES}/orders/delete_order/${this._us.token}/${this._us.id_usuario}/${order_id}`;
  return this.http.delete(url).pipe(map(resp=>resp));
}

  showAlert(item_parameter){
      this.alertCtrl.create({
      header: 'Product exist¡¡',
      subHeader:item_parameter.producto + ",yeat add in shop Car¡",
      buttons: ['OK']
    }).then(alert => alert.present())
  }

}
