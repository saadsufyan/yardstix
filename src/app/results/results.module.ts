import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultsPage } from './results.page';
import { SharingPageModule } from '../sharing/sharing.module';
import { LoginPageModule } from '../login/login.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharingPageModule,
    LoginPageModule
  ],
  declarations: [ResultsPage ]
})
export class ResultsPageModule {}
