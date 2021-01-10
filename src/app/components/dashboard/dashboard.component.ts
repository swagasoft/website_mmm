import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
 userDetails: any;
  constructor(private authService :  AuthService, private userService : UserService) { }

  ngOnInit() {
    // this.authService.getEmail();
    // this.authService.getRole();
    // this.authService.getAuthId();
    this.getUserDetails();

    
  }

  getUserDetails(){
    this.userService.getUserDetails().subscribe( res => {
      console.log(res)
      this.userDetails = res['user'];
    }, err => {
      console.log(err, 'error getting user')
    })
  }

}
