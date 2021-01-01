import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(public authService : AuthService) { }

  model = {
    number: '',
    password: ''
  };

  ngOnInit() {}




  async login() {
    console.log('login fire')
    this.authService.login(this.model).subscribe(response => {
   
        
    }, err => {
      console.log(err)
    });
  }

}
