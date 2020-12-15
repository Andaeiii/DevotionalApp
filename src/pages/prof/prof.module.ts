import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfPage } from './prof';

@NgModule({
  declarations: [
    ProfPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfPage),
  ],
})
export class ProfPageModule {}
