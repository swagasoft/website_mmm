import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
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
    phone: [
        { type: 'required', message: 'Phone number is required.' },
        { type: 'minlength', message: 'Phone must be at least 11 characters long.' }
    ],
    username: [
        { type: 'required', message: 'Username is required.' },
        { type: 'minlength', message: 'Username must be at least 6 characters long.' },
        { type: 'pattern', message: 'Enter a valid username.' }
    ]
};
  constructor(private formBuilder: FormBuilder, private authService : AuthService) { }

  ngOnInit() {

    this.signUpForm = this.formBuilder.group({
      email: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
   
      username: new FormControl(null, Validators.compose([
          Validators.minLength(6),
          Validators.required,
          Validators.pattern('^(?![\s.]+$)[1-9a-zA-Z\s.]*$')
      ])),
      phone: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.minLength(11),
      ])),
      password: new FormControl(null, Validators.compose([
        Validators.minLength(6),
        Validators.required,
    ])),
      password_conf: new FormControl(null, Validators.compose([
        Validators.minLength(6),
        Validators.required,
    ])),
      role: new FormControl('USER'),
      referral: new FormControl(null),
      bank: new FormControl(null),
      bank_account_name: new FormControl(null),
      bank_account_number: new FormControl(null),
  });
  }


  submitForm(){
    console.log(this.signUpForm.value)
    this.authService.createUser(this.signUpForm.value).subscribe( res => {
      console.log(res)
    },
    err => {
      console.log(err);
      
    })
  }
}
