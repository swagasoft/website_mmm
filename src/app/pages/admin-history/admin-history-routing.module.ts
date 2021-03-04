import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminHistoryPage } from './admin-history.page';

const routes: Routes = [
  {
    path: '',
    component: AdminHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminHistoryPageRoutingModule {}
