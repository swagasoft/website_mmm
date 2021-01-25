import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-withdrawal',
  templateUrl: './admin-withdrawal.component.html',
  styleUrls: ['./admin-withdrawal.component.scss'],
})
export class AdminWithdrawalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('witdrawal')
  }

}
