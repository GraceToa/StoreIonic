import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//HttpClient
import {HttpClientModule} from '@angular/common/http'

import { IonInfiniteScroll,IonVirtualScroll,AlertController } from '@ionic/angular';

//storage from https://ionicframework.com/docs/building/storage
import { IonicStorageModule } from '@ionic/storage';

//pipes
import {PipesModule} from './pipes/pipes.module';

//providers
import {ProductService,UserService,StoreService} from './providers/index.services';

//modals
import {LoginPageModule} from './pages/login/login.module';
import {StorePageModule} from './pages/store/store.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     IonicStorageModule.forRoot(),
     PipesModule,
     LoginPageModule,
     StorePageModule,
     HttpClientModule,
     AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    ProductService,
    UserService,
    StoreService,
    IonInfiniteScroll,
    IonVirtualScroll,
    AlertController,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
