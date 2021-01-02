import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestinoniesPageRoutingModule } from './testinonies-routing.module';

import { TestinoniesPage } from './testinonies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestinoniesPageRoutingModule
  ],
  declarations: []
})
export class TestimoniesPageModule {}
