import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminNoticeBoardPage } from './admin-notice-board.page';

const routes: Routes = [
  {
    path: '',
    component: AdminNoticeBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminNoticeBoardPageRoutingModule {}
