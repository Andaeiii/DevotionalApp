import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RegPage } from '../reg/reg';
import { PayPage } from '../pay/pay';
/**
 * Generated class for the InitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-init',
  templateUrl: 'init.html',
})

export class InitPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public storage:Storage
  ){}

  ionViewDidLoad() {
    //show the loading controller... 
    let ldr = this.loadingCtrl.create({
      content: " initializing App.."
    })
    ldr.present();

    //start by checking the register storage... 
    this.storage.ready().then(
      ()=>{
        this.storage.get('user').then(
          data =>{
            //hide the loader first..
            ldr.dismiss();

            if(data){
              this.navCtrl.setRoot(PayPage);  //move to paypage to check.
            }else{
             //console.log('go to login and register pages..... ');
             this.navCtrl.setRoot(RegPage);
            }
          }
        )
      }
    )

  }

}
