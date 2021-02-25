import { ModalController } from '@ionic/angular';
import { OtpModalComponent } from './../../components/otp-modal/otp-modal.component';
import { LogicService } from './../../services/logic.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
loading : boolean;

  constructor(private userService : UserService, private logicService : LogicService,
     private modalController : ModalController) { }

  formModel = {email : ''}
  ngOnInit() {
    this.loading = false;
    
  }

  submitForm(){
    this.loading = true;
    this.userService.forgetPassword(this.formModel).subscribe(res => {
      console.log(res);
      this.loading = false;
      this.presentOtpModal(res['otp']);
      this.logicService.showInfo(res['msg'])
    }, err => {
      console.log(err);
      this.logicService.showError("If your email exist , you should receive a link for reset password")
      
      this.loading = false;
    });
  }

  async presentOtpModal(otp) {
    const modal = await this.modalController.create({
    component: OtpModalComponent,
    componentProps: { otp, email: this.formModel.email }
    });
  
    await modal.present();
  
  }

}
