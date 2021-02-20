import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactMessageViewPageRoutingModule } from './contact-message-view-routing.module';

import { ContactMessageViewPage } from './contact-message-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactMessageViewPageRoutingModule
  ],
  declarations: []
})
export class ContactMessageViewPageModule {}
