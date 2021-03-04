import { LogicService } from './../../services/logic.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  history: any;

  constructor(private userService : UserService, private logicService : LogicService) { }

  ngOnInit() {
    this.getHistory();
  }

 
  getHistory(){
    this.logicService.showSpinner();
    this.userService.history().subscribe(res=> {
      console.log(res)
      this.logicService.dismissSpinner();
      this.history = res['history'];
    }, err => {
      this.logicService.dismissSpinner();
    })
  }

}
