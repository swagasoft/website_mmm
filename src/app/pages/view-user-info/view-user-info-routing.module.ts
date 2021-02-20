import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUserInfoPage } from './view-user-info.page';

const routes: Routes = [
  {
    path: '',
    component: ViewUserInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewUserInfoPageRoutingModule {}
