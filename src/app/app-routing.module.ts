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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/dashboard',
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
    path: 'tabs',
    component: TabsPage,
    children:[
      {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
      {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
      {path:'down-line', component: DownlineComponent, canActivate:[AuthGuard]},
      {path:'account', component: AccountComponent, canActivate:[AuthGuard]},
      {path:'withdrawal', component: WithdrawalComponent, canActivate:[AuthGuard]},
      {path:'admin', component: AdminComponent, canActivate:[AuthGuard]},
      {path:'notice-board', component: NoticeBoardComponent, canActivate:[AuthGuard]},
      {path:'transactions', component: TransactionsComponent, canActivate:[AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
