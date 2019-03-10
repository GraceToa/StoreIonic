import { Component } from '@angular/core';
import { ModalController} from '@ionic/angular';

import {StoreService} from '../../providers/store.service'

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})

export class StorePage {

  constructor(private modalCtrl:ModalController,public _ss:StoreService){ }

  closeModal(){
  this.modalCtrl.dismiss();
  }

}
