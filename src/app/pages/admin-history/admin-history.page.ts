import { LogicService } from './../../services/logic.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.page.html',
  styleUrls: ['./admin-history.page.scss'],
})
export class AdminHistoryPage implements OnInit {
  history: any;

  constructor(private userService : UserService, private logicService :LogicService) { }

  ngOnInit() {
    this.getHistory();
  }

  getHistory(){
    this.logicService.showSpinner();
    this.userService.adminGetHistory().subscribe(res=> {
      console.log(res)
      this.logicService.dismissSpinner();
      this.history = res['history'];
    }, err => {
      this.logicService.dismissSpinner();
    })
  }
}
