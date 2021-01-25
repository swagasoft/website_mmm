import { PreviewComponent } from './components/preview/preview.component';
import { AdminWithdrawalComponent } from './components/admin-withdrawal/admin-withdrawal.component';
import { AdminTransComponent } from './components/admin-trans/admin-trans.component';
import { AdminComponent } from './components/admin/admin.component';
import { BonusComponent } from './components/bonus/bonus.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { NoticeBoardComponent } from './components/notice-board/notice-board.component';
import { FireService } from './services/fire.service';
import { UploadComponent } from './components/upload/upload.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AccountComponent } from './components/account/account.component';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { DownlineComponent } from './components/downline/downline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogicService } from './services/logic.service';
import { ContactPage } from './pages/contact/contact.page';
import { SignupPage } from './pages/signup/signup.page';
import { ProductPage } from './pages/product/product.page';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePage } from './pages/home/home.page';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutPage } from './pages/about/about.page';
import { TestinoniesPage } from './pages/testinonies/testinonies.page';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { TabsPage } from './pages/tabs/tabs.page';
import { AuthInterceptor } from './auth/Auth-interceptor';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FlutterwaveModule } from 'flutterwave-angular-v3';
import { AdminTabsPage } from './pages/admin-tabs/admin-tabs.page';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomePage, FooterComponent, NavbarComponent, AboutPage,
  TestinoniesPage, SignupPage, ContactPage,TabsPage, DashboardComponent,ProfileComponent,
  DownlineComponent,
  WithdrawalComponent,
  AccountComponent,
  EditProfileComponent,
  UploadComponent,
  NoticeBoardComponent,
  TransactionsComponent,
  BonusComponent,
  AdminComponent,
  AdminTransComponent,
  AdminWithdrawalComponent,
  AdminTabsPage,
  PreviewComponent,

ProductPage],
  entryComponents: [UploadComponent, PreviewComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    ToastrModule.forRoot(),
    FlutterwaveModule,
    BrowserAnimationsModule,

    CommonModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    HttpClient,
    AuthService,
    LogicService,
    ToastrService,
  
    FireService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
