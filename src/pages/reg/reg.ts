import { Component } from '@angular/core';
import { LoadingController, NavController, ToastController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { PayPage } from '../pay/pay';

/**
 * Generated class for the RegPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html',
})

export class RegPage {

  codeObj:any = {
    ctype: '',
    ctval: ''
  };


  depts:any = []; 
  obj: any;

  userObj:any = {
    name:'',
    email:'', 
    phone:'',
    skills:'',
    authcode:'',
    unit:'',
    church_id:2 //hardcoded on every request...
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public api: ApiProvider
  ) {}

  ionViewDidLoad() {
    //load the units from the server..
    this.api.getUnits().subscribe(
      data => {
        this.depts = data; 
      },
      error => {
        this.shwToast('..units refused to load')
      }
    );
  }

  postUserData(){
    let ldr = this.loadingCtrl.create({
      content: "finding profile...",
    });
    ldr.present();
    console.log(this.userObj);
    this.api.postNewUser(this.userObj).subscribe(
      data => {
        ldr.dismiss();
        this.shwToast('User added successfully....');
        this.setUserObjOnSuccess(data['message']);
      }, 
      error => {
        ldr.dismiss();
        this.shwToast('server error, pls try later..');
      }
    );
  }


  findUserDt(){
    let ldr = this.loadingCtrl.create({
      content: "finding profile...",
    });
    ldr.present();

    this.api.findUserObj(this.codeObj).subscribe(
      data => {
        ldr.dismiss();
        this.setUserObjOnSuccess(data['message']);
      }, 
      error => {
        ldr.dismiss();
        this.shwToast('server error, pls try later..');
      }

       // this.events.publish('user:created', data['message'], Date.now()); //publish an event... 
          
    );
  
  }

  setUserObjOnSuccess(arrobj:any){
    if(arrobj.length != 0){
      this.storage.set('user', arrobj);
      this.navCtrl.setRoot(PayPage);  //move to new page..
    }else{

    }
  }

  shwToast(msgx){
    const toast = this.toastCtrl.create({
      message: String(msgx),
      position:'bottom',
      duration: 3000
    });
    toast.present();
  }


}
