import { LogicService } from 'src/app/services/logic.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {

  model : any
  searchList = [];
  constructor(private userService : UserService, private logicService : LogicService) { }

  ngOnInit() {}


  searchUser(){
    console.log(this.model);
    const data = {username : this.model}
    this.logicService.showSpinner();
    this.userService.searchByUsername(data).subscribe(res => {
      console.log(res);
      this.logicService.dismissSpinner();
      this.searchList = res['docs'];
    }, err => {
      this.logicService.dismissSpinner();
    });
  }


  changeUserRole(event, user){
    console.log(event.target.value);
    user.role = event.target.value;
    this.userService.updateRole(user).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
