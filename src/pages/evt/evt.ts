import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the EvtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-evt',
  templateUrl: 'evt.html',
})
export class EvtPage {
  
  evts:any;
  rfsh:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public api:ApiProvider
  ){}

  ionViewDidLoad() {
    this.loadEvents(true);
  }


  doRefresh(refresher){
    this.rfsh = refresher;
    this.loadEvents(false);
  }


  loadEvents(bool){

    if(bool){
      let ldr = this.loadingCtrl.create({
        content :'..loading events'
      });
      ldr.present();
    }

    this.api.getChrEvents().subscribe(
      data => {
        console.log(data);
        this.evts = data;
        if(!bool){
          this.rfsh.complete();
        }else{
          ldr.dismiss();
        }
        
      }, 
      error => {

        if(bool){
          this.rfsh.complete();
        }else{
          ldr.dismiss();
        }
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
