import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LogicService } from 'src/app/services/logic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {



  signUpForm: FormGroup;


  validationMessages = {
    email: [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'Enter a valid email.' }
    ],
    password: [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ],
  
 
};
  loading: boolean;
  constructor(private formBuilder: FormBuilder, private authService : AuthService, private logicService : LogicService,
    private router : Router) { }

  ngOnInit() {

    this.signUpForm = this.formBuilder.group({
      email: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
   
   
    
      password: new FormControl(null, Validators.compose([
        Validators.minLength(6),
        Validators.required,
    ])),
 
   
  });
  }


  submitForm(){
    this.loading = true;
    console.log(this.signUpForm.value)
    this.authService.login(this.signUpForm.value).subscribe( res => {
      console.log(res)
      console.log(res['token'])
      this.authService.setToken(res['token']);
      this.router.navigateByUrl('/tabs/dashboard')
      this.loading = false;
      
    },
    err => {
      this.logicService.showError(err.error.message);
      this.loading = false;
      console.log(err);
      
    })
  }
}
