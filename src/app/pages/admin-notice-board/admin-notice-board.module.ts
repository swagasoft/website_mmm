import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminNoticeBoardPageRoutingModule } from './admin-notice-board-routing.module';

import { AdminNoticeBoardPage } from './admin-notice-board.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminNoticeBoardPageRoutingModule
  ],
  declarations: []
})
export class AdminNoticeBoardPageModule {}
