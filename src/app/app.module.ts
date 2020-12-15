import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, /* ViewController,*/ LoadingController, ModalController, AlertController} from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ApiProvider } from '../providers/api/api';

import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InitPage } from '../pages/init/init';
import { RegPage } from '../pages/reg/reg';
import { PayPage } from '../pages/pay/pay';
import { MsgsPage } from '../pages/msgs/msgs';
import { ReadPage } from '../pages/read/read';
import { EvtPage } from '../pages/evt/evt';
import { AbtPage } from '../pages/abt/abt';
import { PrqPage } from '../pages/prq/prq';
import { ProfPage } from '../pages/prof/prof';
import { SrvPage } from '../pages/srv/srv';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InitPage,
    RegPage,
    PayPage, 
    MsgsPage,
    ReadPage,
    EvtPage,
    AbtPage,
    PrqPage,
    ProfPage,
    SrvPage
  ],  

  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InitPage,
    RegPage,
    PayPage,
    MsgsPage,
    ReadPage,
    EvtPage,
    AbtPage,
    PrqPage,
    ProfPage,
    SrvPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    LoadingController,
    //ViewController,
    AlertController,
    ModalController,
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    },
    ApiProvider,
    InAppBrowser
  ]
})

export class AppModule {}
