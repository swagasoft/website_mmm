import { ContactPage } from './pages/contact/contact.page';
import { SignupPage } from './pages/signup/signup.page';
import { ProductPage } from './pages/product/product.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [AppComponent, LoginComponent, HomePage, FooterComponent, NavbarComponent, AboutPage,
  TestinoniesPage, SignupPage, ContactPage,
ProductPage],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    HttpClient,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
