import { LogicService } from './services/logic.service';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Dashboard',
      url: '/tabs/dashboard',
      icon: 'desktop'
    },
    {
      title: 'Transactions',
      url: '/tabs/transactions',
      icon: 'card'
    },
    {
      title: 'Bonus',
      url: '/tabs/bonus',
      icon: 'star'
    },
    {
      title: 'Profile',
      url: '/tabs/profile',
      icon: 'person'
    },
    {
      title: 'Notice Board',
      url: '/tabs/notice-board',
      icon: 'mail'
    },
    {
      title: 'Down Line',
      url: '/tabs/down-line',
      icon: 'people'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService : AuthService,
    public logicService : LogicService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  logout(){
    this.authService.logout();
  }
}
