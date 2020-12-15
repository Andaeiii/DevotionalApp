import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IDept, IOrder, IReading, IReadingObj, IRequestObj, IStatus, IServiceObj, IEventObj, IChurchObj } from '../interfaces/all';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private cid:number = 2;
  private uid:number = 1;   //default user if no storage..

  private serverUrl:string = 'http://devotional.slydecity.com/api';
  public siteUrl:string = 'http://app.wihofa.org';


  constructor(
    public http: HttpClient, 
    public storage:Storage
  ) {
    
    this.initializeClass();
  }

  
  initializeClass(){
      //run this function once the application is done...
      this.storage.ready().then(
        ()=>{

         ////////////////////////////////////////////////update the userIDObject... 
          this.storage.get('user').then(
           obj => {
             if(obj){
               this.uid = obj.id;
             }            
           }
         );

         //download the settings... 
         this.initChrConfig().subscribe(
            data => {
              let obj = {
                progs: data.progs,
                events: data.events,
                all: data.all
              }
              this.storage.set('settings', obj);    //update the settings variable... 
            }
          );
          
          ///////////////////////
        }
       )
  }
  
  //find user with code 
  findUserObj(data):Observable<IUser[]>{
    return this.http.post<IUser[]>(this.serverUrl + '/user/find', data);
  }

  //post user object.. 
  postNewUser(data):Observable<IUser[]>{
    return this.http.post<IUser[]>(this.serverUrl + '/user/register', data);
  }

  //load units to form...
  getUnits():Observable<IDept[]>{
    return this.http.get<IDept[]>(this.serverUrl + '/'+ this.cid +'/depts');
  }

  //get users orderInfo from church...
  getOrderInfo(xcode):Observable<IOrder>{
    return this.http.get<IOrder>(this.siteUrl + '/api/order/' + xcode );
  }  

  ///// reading services... 
  todaysMsg():Observable<IReading[]>{
    return this.http.get<IReading[]>(this.serverUrl + '/'+ this.cid +'/reading/'+ this.uid);
  }

  getDayMsg(data):Observable<IReading[]>{
    return this.http.get<IReading[]>(this.serverUrl + '/day/'+ data.mid +'/reading/'+ this.uid);
  }

  getPastMsgs():Observable<IReadingObj[]>{
    return this.http.get<IReadingObj[]>(this.serverUrl + '/'+ this.cid +'/pastreadings');
  }
  //retrieve all church services...
  getChrEvents():Observable<IEventObj[]>{
    return this.http.get<IEventObj[]>(this.serverUrl + '/'+ this.cid +'/events');
  }

  //retrieve all church services...
  getChrServices():Observable<IServiceObj[]>{
    return this.http.get<IServiceObj[]>(this.serverUrl + '/'+ this.cid +'/services');
  }

  //the church settings loader... 
  initChrConfig():Observable<IChurchObj>{
    return this.http.get<IChurchObj>(this.serverUrl + '/church/' + this.cid +'/settings/'+ this.uid);
  }

  sendPrayerRqst(data):Observable<IStatus>{   
    return this.http.post<IStatus>(this.serverUrl + '/prayer/submit', data);  //return the stored user this way... 
  }

  getPrayerRqst(xcode):Observable<IRequestObj>{
    return this.http.get<IRequestObj>(this.serverUrl + '/prqst/'+ xcode);
  }

  delPrayerRqst(id):Observable<IStatus>{
    return this.http.get<IStatus>(this.serverUrl + '/prqst/'+ id + '/del');
  }

  getStoredUser(){
    return this.storage.get('user');
  }




}
