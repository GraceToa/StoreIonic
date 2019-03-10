import { Injectable } from '@angular/core';
import {HttpClient}from "@angular/common/http";

import {map} from 'rxjs/operators';

import  {URL_SERVICES } from "../config/url.services";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    item:any={};
    bycategory:any={};

    page: number = 0;
    productos: any[] = [];
    categories: any[] = [];
    bycategories: any[] = [];
    productsFind:any[]=[];

  constructor(public http: HttpClient) {
    this.load_products();
    this.load_categories();
  }

  load_categories(){
    let url = URL_SERVICES+"/lineas";
    this.http.get(url).pipe(map(resp=>resp))
    .subscribe((data:any)=>{
        console.log(data);

        if(data['error']){
          console.log("error load categories");
        }else{
          this.categories = data['lineas'];
          console.log(this.categories);
        }
    })
  }

  loadProductByCategory(category: number){
    let url = URL_SERVICES+"/products/by_typeProduct/"+category;
    this.http.get(url).pipe(map(resp=>resp))
    .subscribe((data:any)=>{
        if(data['error']){
          console.log("error load by categories");
        }else{
          this.bycategories = data['productos'];
          console.log(this.bycategories);
        }
    })
  }

  load_products(){
      let promesa = new Promise((resolve)=>{
        let url = URL_SERVICES + "/products/allProducts/" + this.page;
        this.http.get(url).pipe(map(resp=>resp))
        .subscribe((data:any)=>{
            if(data['error']){
            }else{
              this.productos.push(...data['productos']);
              this.page += 1;
            }
            resolve();
        })
      });
      return promesa;
  }

  search_Product(word:string){
    let url = URL_SERVICES+"/products/searchProduct/"+ word;
    return this.http.get(url).pipe(map(res=>res))
    .subscribe((data:any)=>{
        if(data['error']){
          console.log("error load by categories");
        }else{
          this.productsFind = data['productos'];
        }
    })
  }

}
