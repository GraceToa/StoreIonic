import { Component } from '@angular/core';
import { NavController} from '@ionic/angular';
//providers
import {UserService} from '../../providers/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  user:any= {};

  constructor(private _us: UserService,private navCtrl: NavController) {
  }

  ionViewWillEnter(){
      for (let key in this._us.user) {
          this.user = this._us.user[key];
      }
  }

  goBack(){
    this.navCtrl.pop();
  }

}
