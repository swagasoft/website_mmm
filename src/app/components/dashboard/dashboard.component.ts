import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UploadComponent } from '../upload/upload.component';
import { ModalController } from '@ionic/angular';
import { Flutterwave } from 'flutterwave-angular-v3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
 userDetails: any;
   //use your PUBLIC_KEY here
   publicKey = "FLWPUBK_TEST-32c34a10b25063883487eb99f916159a-X";
 
   customerDetails = { name: 'Demo Customer  Name', email: 'customer@mail.com', phone_number: '08100000000'}
  
   customizations = { logo: 'https://flutterwave.com/images/logo-colored.svg'}
  

amountModel = { amount : null}


  constructor(private authService :  AuthService, private userService : UserService,
     private modalController: ModalController, private flutterwave: Flutterwave) { }

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

      this.customerDetails.email = this.userDetails.email;
      this.customerDetails.name = this.userDetails.username;
      this.customerDetails.phone_number = this.userDetails.phone;
    }, err => {
      console.log(err, 'error getting user')
    })
  }

async uploadTransReceipt() {
  const modal = await this.modalController.create({
  component: UploadComponent,
  componentProps: { props: 123 },
  cssClass: 'my-modal'
  
  });

  await modal.present();

  const data = await modal.onDidDismiss();
  console.log(data)
}

async oneKInvestment() {
  const modal = await this.modalController.create({
  component: UploadComponent,
  componentProps: { props: {amount : 1000, investment: true, notice :  'Initializing ₦1000 transaction'} },
  cssClass: 'my-modal'
  
  });

  await modal.present();

  const data = await modal.onDidDismiss();
  console.log(data)
}


async fiveKInvestment() {
  const modal = await this.modalController.create({
  component: UploadComponent,
  componentProps: { props: {amount : 5000, investment: true, notice :  'Initializing ₦5000 transaction'} },
  cssClass: 'my-modal'
  
  });

  await modal.present();

  const data = await modal.onDidDismiss();
  console.log(data)
}



// payment...
makePaymentCallback(response: any): void {
  console.log("Pay", response);
  this.userDetails.balance += response.amount;
  this.userService.submitTransaction(response).subscribe( saved => {
    console.log(saved);
    this.userDetails = saved['newData'];
  })
  this.flutterwave.closePaymentModal(5)
}
closedPaymentModal(): void {
  console.log('payment is closed');
  this.amountModel.amount = null;
}
generateReference(): string {
  let date = new Date();
  return date.getTime().toString();
}

}
