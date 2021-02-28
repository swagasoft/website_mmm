import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { LogicService } from './../../services/logic.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.scss'],
})
export class OtpModalComponent implements OnInit {
@Input() otp;
@Input()  email;
  passwordForm: FormGroup;
  showPasswordInput: boolean;


  validationMessages = {

    password: [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ],
  
 
};

  constructor(private modalController : ModalController, private formBuilder: FormBuilder,
    private logicService : LogicService, private userService : UserService , private router : Router) { }

  ngOnInit() {
    this.showPasswordInput = false;
    this.passwordForm = this.formBuilder.group({
      password: new FormControl(null, Validators.compose([
        Validators.minLength(6),
        Validators.required,
    ])),
    password_conf: new FormControl(null, Validators.compose([
        Validators.minLength(6),
        Validators.required,
    ])),
    email: new FormControl(this.email)
 
   
  });
  }

  model={user_otp: ''}


  dismiss(){
    this.modalController.dismiss();
  }

  verifyOtp(){
    if(this.otp == this.model.user_otp){
      console.log('correct otp')
      this.showPasswordInput = true;
    }else{
      console.log('wrong otp')
      this.logicService.showError('Invalid one Time password!');
    }
  }

  submitPassword(){
    this.userService.updatePassword(this.passwordForm.value).subscribe(res=> {
      this.logicService.showSuccess(res['msg']);
     setTimeout(()=>{
      this.router.navigate([  '/login']);
      this.modalController.dismiss();
     },2000);
    }, err => {
      this.logicService.showError(err.error.msg)
    });
  }

}
