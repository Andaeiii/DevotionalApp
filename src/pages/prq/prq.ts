import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PrqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-prq',
  templateUrl: 'prq.html',
})
export class PrqPage {

  rqsts:any;
  xcode:string;
  rfrsh:any;
  ldr:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api:ApiProvider,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController
  ){}

  ionViewDidLoad() {
      this.storage.get('user').then(
        data => {
          this.xcode = data.authcode;  
          this.loadRqsts(false);
        }
      );
  }


  doRefresh(refresher){
    this.rfrsh = refresher;
    this.loadRqsts(true);  
  }

  delRqst(id){
    this.presentToast('deleting... ' + id);
    this.ldr = this.loadingCtrl.create({
      content: "deleting prayer request..",
      //duration: 3000
    });

    this.ldr.present();

    this.api.delPrayerRqst(id).subscribe(
      data => {
        this.presentToast(data.status_msg);
        this.loadRqsts(false);
        this.ldr.dismiss();  
      },
      err => {
        this.presentToast(err.status_msg); 
        this.ldr.dismiss();
      }
    )
  }


  presentToast(msgx){
    let toast = this.toastCtrl.create({
      message: msgx,
      duration:2000,
      position: 'bottom'
    });
    toast.present();  //show the success message...
  }


  loadRqsts(bool){

    this.ldr = this.loadingCtrl.create({
      content: "pulling all requests...",
      //duration: 3000
    });

    //start the create loader... 
    if(!bool){
      this.ldr.present();
    }
  

    //load prayer requests here...
    this.api.getPrayerRqst(this.xcode).subscribe(
      data => {
        console.log(data);
        this.rqsts = data;
        if(bool){
          this.rfrsh.complete(); 
        }else{
          this.ldr.dismiss();
        }        
      },
      error => {  
        if(bool){
          this.rfrsh.complete(); 
        }else{
          this.ldr.dismiss();
        }
        this.presentToast('..error pulling prayer requests');
      }
    )
  }

}
