import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-tabs',
  templateUrl: './admin-tabs.page.html',
  styleUrls: ['./admin-tabs.page.scss'],
})
export class AdminTabsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('GOOD ONE IS HERE')
  }



}
