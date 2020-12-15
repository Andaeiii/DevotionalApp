import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../providers/api/api';

import { InitPage } from '../pages/init/init';
import { ReadPage } from '../pages/read/read';
import { PayPage } from '../pages/pay/pay';
import { AbtPage } from '../pages/abt/abt';
import { EvtPage } from '../pages/evt/evt';
import { PrqPage } from '../pages/prq/prq';
import { ProfPage } from '../pages/prof/prof';
import { SrvPage } from '../pages/srv/srv';


@Component({
  templateUrl: 'app.html'
})

export class MyApp { 
  @ViewChild(Nav) nav:Nav;
  rootPage:any = EvtPage;

  pages: Array<{title: string, badge:boolean, component: any}>;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    storage: Storage,
    api: ApiProvider
  ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  

    this.pages = [        
        { title: 'Todays Reading', badge:false, component: ReadPage },
        { title: 'About Us', badge:false, component: AbtPage },
        { title: 'Upcoming Events', badge:true, component: EvtPage },
        { title: 'Prayer Requests', badge:false, component: PrqPage },
        { title: 'Your Account', badge:false, component: PayPage },
        { title: 'Need Help', badge:false, component: ProfPage },
        { title: 'Services', badge:true, component: SrvPage }
    ]; 

  }


  openPage(page) {
    this.nav.setRoot(page.component);
  }

}

