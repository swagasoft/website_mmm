import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminContactUsPage } from './admin-contact-us.page';

const routes: Routes = [
  {
    path: '',
    component: AdminContactUsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminContactUsPageRoutingModule {}
