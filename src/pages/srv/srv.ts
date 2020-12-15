import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the SrvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-srv',
  templateUrl: 'srv.html',
})

export class SrvPage {

  servs:any;
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl:ToastController
  ) {}

  ionViewDidLoad() {
    let ldr = this.loadingCtrl.create({
      content :'..loading Service Days'
    });

    ldr.present();

    this.api.getChrServices().subscribe(
      data => {
        console.log(data);
        this.servs = data;
        ldr.dismiss();
      }, 
      error => {
        ldr.dismiss();
        this.presentToast('..error connecting to server');
      }
    );


  }

  presentToast(msgx){
    let toast = this.toastCtrl.create({
      message: msgx,
      duration:2500,
      position: 'bottom'
    });
    toast.present();  //show the success message...
  }
  
}
