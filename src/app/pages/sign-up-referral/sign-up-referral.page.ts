import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LogicService } from 'src/app/services/logic.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up-referral',
  templateUrl: './sign-up-referral.page.html',
  styleUrls: ['./sign-up-referral.page.scss'],
})
export class SignUpReferralPage implements OnInit {

  signUpForm: FormGroup;
  referral_username: string;


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
    ],
    bank: [
        { type: 'required', message: 'Bank is required.' }
    ],
    bank_account_name: [
        { type: 'required', message: 'Bank account name is required.' }
    ],
    bank_account_number: [
        { type: 'required', message: 'Bank account number is required.' }
    ]
};
  loading: boolean;

  constructor(private formBuilder: FormBuilder, private authService : AuthService, private logicService : LogicService,
    private router : Router, private activateRoute: ActivatedRoute, private alertController: AlertController) { }

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
      phone: new FormControl('', Validators.compose([Validators.required,  Validators.minLength(11),
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

  if(this.referral_username){
    this.signUpForm.get('referral').setValue(this.referral_username);
  }




      this.activateRoute.queryParams.subscribe(params => {
      const  REFERRAL = this.activateRoute.snapshot.params['username'];
      let smallLetterRef =  REFERRAL.toLowerCase();
      this.referral_username = smallLetterRef;
      console.log('referral',this.referral_username);
      this.signUpForm.get('referral').setValue(this.referral_username);
   });

  
  }





  submitForm(){
    this.loading = true;
    console.log(this.signUpForm.value)
    this.authService.createUser(this.signUpForm.value).subscribe( res => {
      this.loading = false;
      console.log(res)
      this.logicService.showSuccess(res['message']);
      this.signUpForm.reset();
      this.presentRegSuccess();
    },
    err => {
      this.logicService.showError(err.error.message);
      console.log(err);
      this.loading = false;
      
    })
  }

  async presentRegSuccess() {
    const alert = await this.alertController.create({
      header: 'Registration successful!',
      message: 'Your registration has been completed successfully, continue to login',
      buttons: [
       {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate(['/login'])
          }
        }
      ]
    });
  
    await alert.present();
  }

}
