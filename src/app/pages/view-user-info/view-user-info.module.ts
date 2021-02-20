import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewUserInfoPageRoutingModule } from './view-user-info-routing.module';

import { ViewUserInfoPage } from './view-user-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewUserInfoPageRoutingModule
  ],
  declarations: []
})
export class ViewUserInfoPageModule {}
