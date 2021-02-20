import { UserService } from 'src/app/services/user.service';
import { LogicService } from './../../services/logic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.scss'],
})
export class NoticeBoardComponent implements OnInit {
  noticeList = [];

  constructor(private logicService :LogicService,private userService : UserService) { }

  ngOnInit() {
    this.getNotice();
  }

  getNotice(){
    this.logicService.showSpinner();
    this.userService.getNotice().subscribe(res=> {
      this.noticeList = res['notice'];
      this.logicService.dismissSpinner();
    }, err=> {
      this.logicService.dismissSpinner();
    });
  }

}


