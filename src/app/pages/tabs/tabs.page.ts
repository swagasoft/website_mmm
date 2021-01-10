import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {


  public appPages = [
    {
      title: 'EXPENSES',
      url: '/tabs/expenses',
      icon: 'cash'
    },
    
     {
      title: 'DISTRIBUTION',
      url: '/tabs/distributions',
      icon: 'list'
    }, 
     {
      title: 'MERCHANDISERS',
      url: '/tabs/merchandisers',
      icon: 'calculator'
    }, 
    {
      title: 'FRUIT',
      url: '/tabs/fruit',
      icon: 'nutrition'
    },
     {
      title: 'PENALTY',
      url: '/tabs/penalty',
      icon: 'cut'
    },
   
     {
      title: 'STAFF',
      url: '/tabs/staff-list', 
      icon: 'contacts'
    },
     {
      title: 'OUTLETS',
      url: '/tabs/outlets',
      icon: 'home'
    }, 
   
  ]

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  
  constructor() { }

  ngOnInit() {
  }

}
