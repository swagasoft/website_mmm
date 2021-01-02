import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestinoniesPage } from './testinonies.page';

const routes: Routes = [
  {
    path: '',
    component: TestinoniesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestinoniesPageRoutingModule {}
