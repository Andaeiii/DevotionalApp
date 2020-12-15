import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, 
  ToastController, ModalController} from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';

import { MsgsPage } from './../msgs/msgs';
/**
 * Generated class for the ReadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-read',
  templateUrl: 'read.html',
})

export class ReadPage {
  
    obj: any;
    userObj: any;
    rvar:any;
    robj:any;
    msgid:any;

    xmsg:string;
    ximg:string;
    xurl:string;
  
    constructor(
      public api:ApiProvider,
      public navCtrl: NavController, 
      public navParams: NavParams,
      public storage: Storage,
      public toastCtrl: ToastController,
      public modalCtrl: ModalController,      //for the modal page...
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      private social: SocialSharing
    ){
      this.msgid =  this.navParams.get('rid');
      this.xurl = api.siteUrl;
    }
  
  
    ngOnInit():void{  
          //get stored user object.... 
          this.obj = this.api.getStoredUser().then( 
            obj => {
              this.userObj = obj;
              console.log(obj);
            }
          );
  
          //create loader... 
          let ldr = this.loadingCtrl.create({
            content: "Please wait...",
            //duration: 3000 
          });
          ldr.present();
           //if no nav params.. getthe current message.. 
  
          if(!this.msgid){
              //get devotional for this wihofa particularly...
              this.rvar = this.api.todaysMsg().subscribe( //subscribe(
                data => {
                      this.robj = data;
                      ldr.dismiss();
                      console.log(data);

                      //initialize url vars... 
                      this.xmsg = data.topic + ' | ' + data.excerpt;
                      this.ximg = data.imagefile;
                  }
              );
          }else{
              //get devotional for this wihofa particularly...
              let o = {mid:Number(this.msgid)};
              console.log(o);
              this.rvar = this.api.getDayMsg(o).subscribe( //subscribe(
                data => {
                      this.robj = data;
                      ldr.dismiss();
                      console.log(data);
                  }
              );
          }
 
     }
  
  
        shwPrayerRqstDialog() {
          const prompt = this.alertCtrl.create({
            title: 'Prayer Request',
            message: "Do you have any request you want the church to pray with you, feel free to share with us..",
            inputs: [
              {
                name: 'prqst',
                placeholder: '..enter here'
              },
            ],
            buttons: [
              {
                text: 'Cancel',
                handler: data => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Submit',
                handler: data => {
                  let o = {
                    'data':data.prqst
                  };
                  this.sendPrayerRequest(o);
                }
              }
            ]
          });
          prompt.present();
        }
  
  
        sendPrayerRequest(obj){
         
          //start the create loader... 
          let ldr = this.loadingCtrl.create({
            content: "sending request...",
            //duration: 3000
          });
          ldr.present();
  
          let prayerObj = {
            'church_id': this.userObj.church_id,
            'reading_id': this.robj.id,
            'authcode': this.userObj.authcode,
            'prayer' : obj.data
          }
  
          console.log(prayerObj);
  
          this.api.sendPrayerRqst(prayerObj).subscribe(
            data => {
              ldr.dismiss();   //hide the loader... 
              let toast = this.toastCtrl.create({
                message: data.status_msg,
                duration:2000,
                position: 'bottom'
              });
              toast.present();  //show the success message...
            }
          );
  
        }

        shareByTw(){
          this.social.shareViaTwitter(this.xmsg, this.ximg, this.xurl).then(() => {
            // Sharing via email is possible
          }).catch(() => {
            // Sharing via email is not possible
          });
        }

        shareByFb(){
          this.social.shareViaFacebook(this.xmsg, this.ximg, this.xurl).then(() => {
            // Sharing via email is possible
          }).catch(() => {
            // Sharing via email is not possible
          });
        }

        shareByWa(){
          this.social.shareViaWhatsApp(this.xmsg, this.ximg, this.xurl).then(() => {
            // Sharing via email is possible
          }).catch(() => {
            // Sharing via email is not possible
          });
        }
  
        openPastMsgs(){
          const modal = this.modalCtrl.create(MsgsPage);
          modal.present();
        }
  
  
  
  }
  