import { LogicService } from './../../services/logic.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-contact-us',
  templateUrl: './admin-contact-us.page.html',
  styleUrls: ['./admin-contact-us.page.scss'],
})
export class AdminContactUsPage implements OnInit {
messageList = [];


  constructor(private userService : UserService, private logicService : LogicService) { }

  ngOnInit() {
    this.getContactUsList();
  }


  getContactUsList(){
    this.logicService.showSpinner();
    this.userService.getContactUs().subscribe(messages=> {
      this.logicService.dismissSpinner();
      console.log(messages);
      this.messageList = messages['data']
    }, err => {
      this.logicService.dismissSpinner();
    });
  }
}
