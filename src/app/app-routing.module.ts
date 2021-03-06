import { PrivacyPolicyPage } from './pages/privacy-policy/privacy-policy.page';
import { TermsConditionPage } from './pages/terms-condition/terms-condition.page';
import { AdminNoticeBoardPage } from './pages/admin-notice-board/admin-notice-board.page';
import { ContactMessageViewPage } from './pages/contact-message-view/contact-message-view.page';
import { ViewUserInfoPage } from './pages/view-user-info/view-user-info.page';
import { ForgetPasswordPage } from './pages/forget-password/forget-password.page';
import { AdminContactUsPage } from './pages/admin-contact-us/admin-contact-us.page';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { RunningTransComponent } from './components/running-trans/running-trans.component';
import { AdminTabsPage } from './pages/admin-tabs/admin-tabs.page';
import { AdminWithdrawalComponent } from './components/admin-withdrawal/admin-withdrawal.component';
import { AdminTransComponent } from './components/admin-trans/admin-trans.component';
import { BonusComponent } from './components/bonus/bonus.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { NoticeBoardComponent } from './components/notice-board/notice-board.component';
import { AdminComponent } from './components/admin/admin.component';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { AccountComponent } from './components/account/account.component';
import { DownlineComponent } from './components/downline/downline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TabsPage } from './pages/tabs/tabs.page';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
  ,
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'testimonies',
    loadChildren: () => import('./pages/testinonies/testinonies.module').then( m => m.TestimoniesPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
 
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'sign-up/:username',
    loadChildren: () => import('./pages/sign-up-referral/sign-up-referral.module').then( m => m.SignUpReferralPageModule)
  },
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {
    path: 'tabs',
    component: TabsPage,
    children:[
      
      {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
      {path:'down-line', component: DownlineComponent, canActivate:[AuthGuard]},
      {path:'account', component: AccountComponent, canActivate:[AuthGuard]},
      {path:'withdrawal', component: WithdrawalComponent, canActivate:[AuthGuard]},
      {path:'admin', component: AdminComponent, canActivate:[AuthGuard]},
      {path:'notice-board', component: NoticeBoardComponent, canActivate:[AuthGuard]},
      {path:'transactions', component: TransactionsComponent, canActivate:[AuthGuard]},
      {path:'bonus', component: BonusComponent, canActivate:[AuthGuard]},

     
    ]
  },
  {
    path: 'admin-tabs',
    component: AdminTabsPage,
    children:[
      {path:'admin-trans', component: AdminTransComponent, canActivate:[AdminGuard,]},
      {path:'admin-withdrawal', component: AdminWithdrawalComponent, canActivate:[AdminGuard]},
      {path:'running-trans', component: RunningTransComponent, canActivate:[AdminGuard]},
      {path:'manage-users', component: ManageUsersComponent, canActivate:[AdminGuard]},
      {path:'admin-contact-us', component: AdminContactUsPage, canActivate:[AdminGuard]},
      {
        path: 'admin-history',
        loadChildren: () => import('./pages/admin-history/admin-history.module').then( m => m.AdminHistoryPageModule),
        canActivate:[AdminGuard]
      },
    
    ]
  },
  {
    path: 'forget-password',component:ForgetPasswordPage
  },
  {
    path: 'privacy-policy', component:PrivacyPolicyPage
  },
  {
    path: 'terms-condition', component:TermsConditionPage
  },
  {
    path: 'view-user-info/:username',
    component: ViewUserInfoPage,canActivate:[AuthGuard]
  },
  {
    path: 'contact-message-view/:id',component:ContactMessageViewPage, canActivate:[AdminGuard] },
  {
    path: 'admin-notice-board', component:AdminNoticeBoardPage, canActivate:[AdminGuard]},
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule),
    canActivate: [AuthGuard]
  },
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
