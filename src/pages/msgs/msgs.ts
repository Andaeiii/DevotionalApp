import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ReadPage } from '../read/read';

/**
 * Generated class for the MsgsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-msgs',
  templateUrl: 'msgs.html',
})
export class MsgsPage {

  msgs:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public modal: ModalController,
    public api:ApiProvider
  ){
  }  

  ngOnInit():void{ 
    //show the loader when getting data
    let ldr = this.loadingCtrl.create({
      content: "Please wait...",
    });
    ldr.present();

   this.loadDevs(ldr, true);
  }

  //close modal command... 
  closeModalObj(){
    //this.modal.
    this.viewCtrl.dismiss(); 
  }

  doRefresh(refresher){
    this.loadDevs(refresher, false)
  }

  loadDevs(o, bool){
    this.api.getPastMsgs().subscribe(
      data => {
        console.log(data);
        //hide the loader when all is done..
        if(bool){
          o.dismiss();
        }else{
          o.complete();
        }
        this.msgs = data;
      }
    )
  }

  //get message parameter... 
  openDayMsg(id){
    console.log(Number(id));
    this.navCtrl.push(ReadPage, {rid:Number(id)});
  }

}
