import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminContactUsPageRoutingModule } from './admin-contact-us-routing.module';

import { AdminContactUsPage } from './admin-contact-us.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminContactUsPageRoutingModule
  ],
  declarations: []
})
export class AdminContactUsPageModule {}
