import { Router } from '@angular/router';
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
  constructor(private userService : UserService, private logicService : LogicService, private router:Router) { }

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

  selectRole(event){
    console.log(event.target.value);
    this.logicService.showSpinner();
    this.userService.getByRole(event.target.value).subscribe(data => {
      console.log(data);
      this.logicService.dismissSpinner();
      this.searchList = data['users']
    }, err => {
      console.log(err);
      this.logicService.dismissSpinner();
    });

  }

  viewDownline(username){
    console.log(username)
    this.router.navigate(['/view-user-info', username]);
  }
}
