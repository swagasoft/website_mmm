import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
loading : boolean;

  constructor(private userService : UserService) { }

  formModel = {email : ''}
  ngOnInit() {
    this.loading = false;
    
  }

  submitForm(){
    this.userService.forgetPassword(this.formModel).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
