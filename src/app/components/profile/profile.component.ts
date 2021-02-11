import { EditProfileComponent } from './../edit-profile/edit-profile.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {


  userDetails: any;
  loading : boolean;
  
    constructor(private userService: UserService, private router: Router,  private modalController: ModalController,
        private actionSheetController: ActionSheetController, private alertController: AlertController,
        private authService :  AuthService) { }
  
    ngOnInit() {
      this.getProfile();
  
    }
    onLogout(){
      this.authService.logout();
      this.router.navigateByUrl('/login');
    }
  
    getProfile(){
      this.loading = true;
      this.userService.getUserDetails().subscribe(
        res => {
          this.loading = false;
          console.log(res)
          this.userDetails = res['user'];
        },
        err => {
          this.loading = false;
          console.log('error getting values..', err);
        }
      );
    }
  
  
    async editProfile(){
      const modal = await this.modalController.create({
        component: EditProfileComponent,
        componentProps: {
          'fullname': this.userDetails.fullname,
          'email' : this.userDetails.email,
          'username': this.userDetails.username,
          'phone': this.userDetails.phone,
          'role':this.userDetails.role,
          '_id': this.userDetails._id,
          'bank': this.userDetails.bank,
          'bank_account_no': this.userDetails.bank_account_no,
          'bank_account_name': this.userDetails.bank_account_name,
        }
      });
      modal.onDidDismiss().then(()=> {
        console.log('i dismiss this modal');
        this.getProfile();
      });
      return await modal.present();
    }
  
  
  async passwordAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'enter your password',
      inputs:[{name:'password', type:'password', placeholder:'my password'}],
      buttons: [{
        text:'confirm',
        handler: (password)=> {
          console.log(password)
          this.userService.validatePassword(password).subscribe(
            res => {
              this.loading = false;
              this.editProfile();
            },
            err => {
              this.loading = false;
              // this.logi.generalToast("error", err.error.msg, 2000);
            }
          );
        }
      }],
      
    });
  
    await alert.present();
  }
  

}
