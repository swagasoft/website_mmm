import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpReferralPage } from './sign-up-referral.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpReferralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpReferralPageRoutingModule {}
