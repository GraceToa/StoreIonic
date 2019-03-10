import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import {UserService}from '../../providers/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;

  constructor(private modalCtrl:ModalController, private _us:UserService) { }

  ngOnInit() {

  }

  closeModal(){
  this.modalCtrl.dismiss();
  }

  async sign_up(){
    this._us.sign_up(this.email,this.password);
    if(this._us.active){
        this.modalCtrl.dismiss();
    }

  }



}
