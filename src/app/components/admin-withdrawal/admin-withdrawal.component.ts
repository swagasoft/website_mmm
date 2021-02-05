import { AlertController } from '@ionic/angular';
import { LogicService } from './../../services/logic.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-withdrawal',
  templateUrl: './admin-withdrawal.component.html',
  styleUrls: ['./admin-withdrawal.component.scss'],
})
export class AdminWithdrawalComponent implements OnInit {
withdrawalList = [];
payoutList = [];
segment = 'withdrawal';
  constructor(private userService : UserService, private logicService : LogicService,
    public alertController : AlertController) { }

  ngOnInit() {
 this.getAdminPayout();
 this.getAdminWithdrawal();
  }


  getAdminWithdrawal(){
    this.logicService.showSpinner();
    this.userService.getAdminWithdrawal().subscribe( data => {
      console.log('withd', data);
      this.withdrawalList = data['data'];
      this.logicService.dismissSpinner();

    }, err => {

      this.logicService.dismissSpinner();
      console.log(err)
    });
  }

  getAdminPayout(){
    this.logicService.showSpinner();
    this.userService.getAdminPayout().subscribe( data => {
      console.log('payout', data);
      this.payoutList = data['data'];
      this.logicService.dismissSpinner();
      
    }, err => {

      this.logicService.dismissSpinner();
      console.log(err)
    });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segment = ev.detail.value;
  }

  async payoutConfirm(trans) {
    const alert = await this.alertController.create({
      header: 'Confirm Payout!',
      message: `The user <strong>${trans?.username} </strong> will be credited with #${trans?.amount}!`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay', trans);
            this.logicService.showSpinner();
            this.userService.settleWithdrawal(trans).subscribe(res => {
              this.logicService.dismissSpinner();
              this.logicService.showSuccess(res['msg']);
              console.log(res);
              this.getAdminPayout();
              this.getAdminWithdrawal();
            }, err => {
              this.logicService.dismissSpinner();
              console.log(err);

            })
          }
        }
      ]
    });
  
    await alert.present();
  }
}
