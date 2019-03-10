import { Injectable } from '@angular/core';
import {HttpClient}from "@angular/common/http";
import  {URL_SERVICES } from "../config/url.services";
import {map} from 'rxjs/operators';
import { AlertController,Platform} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  token:string;
  id_usuario:string;
  user:any={};
  username:any;

  constructor(public http: HttpClient, private alertCtrl:AlertController,
              private platform:Platform,private storage: Storage,
              private router: Router) {
              this.load_storage();
            }

  active():boolean{
    if(this.token){
      return true;
    }else{
      return false;
    }
  }

  sign_up(email:string, password:string){
    let data = {
      'correo':email,
      'contrasena': password
    };

    let url = URL_SERVICES+"/login/register";
    return this.http.post(url,data).pipe(map(resp=>resp))
    .subscribe((data:any)=>{
        if(data['error']){
          this.showAlert();
        }else{
          this.token = data['token'];
          this.id_usuario = data['id_usuario'];
          this.save_storage();
        }
    })
  }

  close_sesion(){
    this.token = null;
    this.id_usuario = null;
    this.save_storage();
    this.router.navigateByUrl('/login');
  }

  private save_storage(){
    if(this.platform.is("cordova")){
      this.storage.set('token',this.token);
      this.storage.set('id_usuario',this.id_usuario);
    }else{
      if(this.token){
        localStorage.setItem("token", this.token);
        localStorage.setItem("id_usuario", this.id_usuario);
      }else{
        localStorage.removeItem("token");
        localStorage.removeItem("id_usuario");
      }
    }
  }

  load_storage(){
    let promess = new Promise((resolve)=>{
      if(this.platform.is("cordova")){
        this.storage.ready().then(()=>{
          this.storage.get("token").then(token=>{
            if(token){
              this.token = token;
            }
          })
          this.storage.get("id_usuario").then(id_usuario=>{
            if(id_usuario){
              this.id_usuario = id_usuario;
            }
            resolve();
          })
        })
      }else{
        if(localStorage.getItem("token")){
        this.token = localStorage.getItem("token");
        this.id_usuario = localStorage.getItem("id_usuario");
        }
        resolve();
      }
    });
    return promess;
  }

  get_username(){
    let id = this.id_usuario;
      let url = URL_SERVICES+"/login/nameUser/"+id;
      this.http.get(url).pipe(map(resp=>resp))
      .subscribe((data:any)=>{
          if(data['error']){
            console.log("error load username");
          }else{
            this.username = data['nombre'];
            console.log(this.username);
          }
      })
  }

  getUserFull(){
    let id = this.id_usuario;
      let url = URL_SERVICES+"/login/user/"+id;
        this.http.get(url).pipe(map(resp=>resp))
      .subscribe((data:any)=>{
          if(data['error']){
            console.log("error load username");
          }else{
            this.user = data['user'];
          }
      })
  }

  showAlert(){
      this.alertCtrl.create({
      header: 'User not register¡¡',
      subHeader: "not register in BD",
      buttons: ['OK']
    }).then(alert => alert.present())
  }





}
