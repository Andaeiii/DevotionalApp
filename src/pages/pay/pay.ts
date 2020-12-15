import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ToastController  } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

import { ReadPage } from '../read/read';

/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  user:any;
  order:any;
  istatus:string;
  payurl:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public api:ApiProvider,
    private iab:InAppBrowser
  ){
    this.istatus = 'down';
  }
 
  ionViewDidLoad() {
    //show the loader first...
    let ldr = this.loadingCtrl.create({
      content: "getting Order info..",
    });
    ldr.present();
  
   // get authcode from storage... 
   this.storage.ready().then(
     ()=>{
       this.storage.get('user').then(
          obj => {
            //get payurl.... 
            this.payurl = this.api.siteUrl + '/dashboard?';
            //console.log('userobject is ', obj.authcode);
            this.user = obj; 
            this.checkSubscriptn();
            //hide the loader here... 
            ldr.dismiss();
          }
       );
     }
   );

  }//ionview ends here.... 

  checkSubscriptn(){

    let ldr = this.loadingCtrl.create({
      content: "getting Order info..",
    });
    ldr.present();

     //get the order info...
     this.api.getOrderInfo(this.user.authcode).subscribe(
      data => {
        this.order = data; //pass the data to the order obj....
        this.istatus = 'up';
        ldr.dismiss();
      },
      error => {
        this.shwToast('error connecting to server..');
        this.istatus = 'down';
        ldr.dismiss();
      }
    );

    console.log(this.istatus);
  }


  openPaymentPage(){  
    const options:InAppBrowserOptions = {zoom: 'no'};
    this.iab.create(this.payurl, '_self', options); //to the browser...
  }

  loadTodaysMsg(){
     this.navCtrl.setRoot(ReadPage);
  }

  shwToast(msgx:string){
    let toast = this.toastCtrl.create({
      message: msgx,
      duration:2000,
      position: 'bottom'
    });
    toast.present();  //show the success message...
  }


}
