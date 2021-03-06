import { LoginComponent } from './../login/login.component';
import { LogicService } from './../../services/logic.service';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UploadComponent } from '../upload/upload.component';
import { AlertController, ModalController } from '@ionic/angular';
import { Flutterwave } from 'flutterwave-angular-v3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
 userDetails: any;
   //use your PUBLIC_KEY here
   reference: any;
 
   customerDetails = { name: 'Demo Customer  Name', email: 'customer@mail.com', phone_number: '08100000000'}
  
   customizations = { logo: 'https://flutterwave.com/images/logo-colored.svg'}
  

amountModel = { amount : 1500}

timerDays : any = '00';
timerHours : any = '0';
timerMinutes : any = '0';
timerSeconds : any = '0';
timerInterval : any;




  constructor(private authService :  AuthService, private userService : UserService,
     private modalController: ModalController, private flutterwave: Flutterwave,
     private alertController: AlertController, private logicService : LogicService) { }

  ngOnInit() {
    this.generateReference();
  }

  ngOnDestroy(){
  }

  ionViewDidEnter() {
    console.log('GET USER DETAILS')
    this.getUserDetails();
    
  }

ionViewDidLeave(){
 console.log('leaving...')
 this.ngOnDestroy();

}






  getUserDetails(){
    clearInterval(this.timerInterval);
    this.logicService.showSpinner();
    this.userService.getUserDetails().subscribe( res => {
      this.userDetails = res['user'];
      this.userService.setUserProfile(this.userDetails);

      this.customerDetails.email = this.userDetails.email;
      this.customerDetails.name = this.userDetails.username;
      this.customerDetails.phone_number = this.userDetails.phone;
     if(this.userDetails.running_investment){
      this.calculateDiff(this.userDetails?.investment_timer)
     }
     this.logicService.dismissSpinner();
      
    }, err => {
      this.logicService.dismissSpinner();
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
}

async oneKInvestment() {
  const modal = await this.modalController.create({
  component: UploadComponent,
  componentProps: { props: {amount : 1000, investment: true, notice :  'Initializing ₦1000 transaction'} },
  cssClass: 'my-modal'
  
  });

  await modal.present();

  const data = await modal.onDidDismiss();
}
completedInvestModel = { amount : null , profit: null , date : null, username:''}


async fiveKInvestment() {
  const modal = await this.modalController.create({
  component: UploadComponent,
  componentProps: { props: {amount : 5000, investment: true, notice :  'Initializing ₦5000 transaction'} },
  cssClass: 'my-modal'
  
  });

  await modal.present();

  const data = await modal.onDidDismiss();
}



// payment...
makePaymentCallback(response: any): void {
  console.log("RESULT", response);
  if(response.status == "successful"){
    this.generateReference();
    response.date = Date.now();
    this.userService.submitTransaction(response).subscribe( saved => {
      this.userDetails = saved['newData'];
      // window.location.reload();
      
    });
    this.flutterwave.closePaymentModal()
    
  }else{
    console.log('data')
  }

}


copyInputMessage(inputElement){
  inputElement.select();
  document.execCommand('copy');
  inputElement.setSelectionRange(0, 0);
  this.logicService.showInfo("text copped")
}





closedPaymentModal(): void {
  this.generateReference();
  console.log('payment is closed');
  this.amountModel.amount = null;
 setTimeout(()=> {
  this.getUserDetails();
 }, 2000);
 
}


generateReference() {
  let date = new Date();
  this.reference = date.getTime().toString();
  
}




async unlockOne_k_package() {
  const alert = await this.alertController.create({
    header: 'Unlocking ₦1000 Investment  ',
    message: '₦100 will be deducted from your balance',
    subHeader:'will cost you a fee of ₦100, make sure you have enough balance for this process.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Confirm',
        handler: () => {
          console.log('Confirm Okay');
          this.Unlock_1000_process();

        }
      }
    ]
  });

  await alert.present();
}



async unlock5000Package() {
  const alert = await this.alertController.create({
    header: 'Unlocking ₦5000 Investment  ',
    message: ' <strong>Do you really want to continue? </strong>',
    subHeader: 'will cost you a fee of ₦500, make sure you have enough balance for this process.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'dark',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Confirm',
        cssClass: 'dark',
        handler: () => {
          console.log('Confirm Okay');
          this.Unlock5000Invest();
        }
      }
    ]
  });

  await alert.present();
}



async unlock10000Package() {
  const alert = await this.alertController.create({
    header: 'Unlocking ₦10000 Investment ',
    message: ' <strong>Do you really want to continue? </strong>',
    subHeader : ' will cost you a fee of ₦1000, make sure you have enough balance for this process.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'dark',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Confirm',
        cssClass: 'dark',
        handler: () => {
          console.log('Confirm Okay');
          this.Unlock10000Invest();
        }
      }
    ]
  });

  await alert.present();
}



Unlock10000Invest(){
  const info = {process : true, amount : 1000}
if (this.userDetails.balance < 1000) {
  this.logicService.showWarning('balance too low for this transaction!')
} else {
  this.logicService.showSpinner();
  this.userService.unlock10000Investment(info).subscribe(res => {
    this.userDetails = res['user'];
    this.userService.setUserProfile(this.userDetails);
    this.logicService.showSuccess(res['msg']);
    this.logicService.dismissSpinner();
  }, err => {
this.logicService.dismissSpinner();
this.logicService.showError(err.error.msg);
  });

}
}


// 20 thousand

async unlockTwenty() {
  const alert = await this.alertController.create({
    header: 'Unlocking ₦20000 Investment ',
    message: ' <strong>Do you really want to continue? </strong>',
    subHeader : ' will cost you a fee of ₦2000, make sure you have enough balance for this process.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'dark',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Confirm',
        cssClass: 'dark',
        handler: () => {
          console.log('Confirm Okay');
          this.UnlockTwentyButton();
        }
      }
    ]
  });

  await alert.present();
}




UnlockTwentyButton(){
  const info = {process : true, amount : 2000}
if (this.userDetails.balance < 2000) {
  this.logicService.showWarning('balance too low for this transaction!')
} else {
  this.logicService.showSpinner();
  this.userService.unlockTwenty(info).subscribe(res => {
    this.userDetails = res['user'];
    this.userService.setUserProfile(this.userDetails);
    this.logicService.showSuccess(res['msg']);
    this.logicService.dismissSpinner();
  }, err => {
this.logicService.dismissSpinner();
this.logicService.showError(err.error.msg);
  });

}
}


// end of twenty



// fifty section
async unlockFiftyConfirm() {
  const alert = await this.alertController.create({
    header: 'Unlocking ₦50,000 Investment ',
    message: ' <strong>Do you really want to continue? </strong>',
    subHeader : ' will cost you a fee of ₦5000, make sure you have enough balance for this process.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'dark',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Confirm',
        cssClass: 'dark',
        handler: () => {
          console.log('Confirm Okay');
          this.UnlockFiftyButton()
        }
      }
    ]
  });

  await alert.present();
}


UnlockFiftyButton(){
  const info = {process : true, amount : 5000}
if (this.userDetails.balance < 5000) {
  this.logicService.showWarning('balance too low for this transaction!')
} else {
  this.logicService.showSpinner();
  this.userService.unlockFifty(info).subscribe(res => {
    this.userDetails = res['user'];
    this.userService.setUserProfile(this.userDetails);
    this.logicService.showSuccess(res['msg']);
    this.logicService.dismissSpinner();
  }, err => {
this.logicService.dismissSpinner();
this.logicService.showError(err.error.msg);
  });

}
}
//  end fifty section



// hundred section

async unlockHundredConfirm() {
  const alert = await this.alertController.create({
    header: 'Unlocking ₦100,000 Investment ',
    message: ' <strong>Do you really want to continue? </strong>',
    subHeader : ' will cost you a fee of ₦10,000, make sure you have enough balance for this process.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'dark',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Confirm',
        cssClass: 'dark',
        handler: () => {
          console.log('Confirm Okay');
          this.UnlockHundredButton()
        }
      }
    ]
  });

  await alert.present();
}

UnlockHundredButton(){
  const info = {process : true, amount : 10000}
if (this.userDetails.balance < 10000) {
  this.logicService.showWarning('balance too low for this transaction!')
} else {
  this.logicService.showSpinner();
  this.userService.unlockHundred(info).subscribe(res => {
    this.userDetails = res['user'];
    this.userService.setUserProfile(this.userDetails);
    this.logicService.showSuccess(res['msg']);
    this.logicService.dismissSpinner();
  }, err => {
console.log(err)
this.logicService.dismissSpinner();
this.logicService.showError(err.error.msg);
  });

}
}
//  end fifty section


Unlock5000Invest(){
  const info = {process : true, amount : 500}
if (this.userDetails.balance < 500) {
  this.logicService.showWarning('balance too low for this transaction!')
} else {
  this.logicService.showSpinner();
  this.userService.unlock5000Investment(info).subscribe(res => {
    this.userDetails = res['user'];
    this.userService.setUserProfile(this.userDetails);
    this.logicService.showSuccess(res['msg']);
    this.logicService.dismissSpinner();
  }, err => {
console.log(err)
this.logicService.dismissSpinner();
this.logicService.showError(err.error.msg);
  });

}
}


Unlock_1000_process(){
  const info = {process : true, amount : 100}
if (this.userDetails.balance < 100) {
  this.logicService.showWarning('balance too low for this transaction!')
} else {
  this.logicService.showSpinner();
  this.userService.unlock_1000_process(info).subscribe(res => {
    this.userDetails = res['user'];
    this.userService.setUserProfile(this.userDetails);
    this.logicService.showSuccess(res['msg']);
    this.logicService.dismissSpinner();
  }, err => {
this.logicService.dismissSpinner();
this.logicService.showError(err.error.msg);
  });

}
}




async start_1000() {
  const alert = await this.alertController.create({
    header: 'Start 1000 Investment',
    subHeader : "Please confirm the following",
    message: ` <strong class="text-dark">Your Investment will last 24 hours and
    ₦1000 will be invested from available balance </strong> <br>
    `,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Yes',
        handler: () => {
          console.log('Confirm Okay');
          this.start_1000_investment();
        }
      }
    ]
  });

  await alert.present();
}


start_1000_investment(){
  clearInterval(this.timerInterval);
if (this.userDetails.balance < 1000) {
  this.logicService.showError('Insufficient balance of ' + '₦'+this.userDetails?.balance);
} else {
  const dateProps = { date : new Date(new Date().getTime() + 60 * 60 * 24 * 1000)}
  this.logicService.showSpinner();
  this.userService.start1000Investment(dateProps).subscribe(res => {
    this.userDetails = res['user'];
    this.userService.setUserProfile(this.userDetails);
    this.logicService.presentAlertConfirm("Investment started", "Your investment has started successfully, profit will accrued in 24Hr time")


    this.calculateDiff(this.userDetails?.investment_timer)
    this.logicService.dismissSpinner();
  }, err => {
    console.log(err);
    this.logicService.dismissSpinner();
  });
}
}



async start5000() {
  const alert = await this.alertController.create({
    header: 'Start 5,000 Investment',
    subHeader : "Please confirm the following",
    message: ` <strong class="text-dark">Your Investment will last 24 hours and
    ₦5,000 will be invested from available balance </strong> <br>
    `,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Yes',
        handler: () => {
          console.log('Confirm Okay');
          this.start5000Investment();
        }
      }
    ]
  });

  await alert.present();
}


start5000Investment(){
  clearInterval(this.timerInterval);
if (this.userDetails.balance < 5000) {
  this.logicService.showError('Insufficient balance of ' + '₦'+this.userDetails?.balance);
} else {
  const dateProps = { date : new Date(new Date().getTime() + 60 * 60 * 24 * 1000)}
  this.logicService.showSpinner();
  this.userService.start5000Investment(dateProps).subscribe(res => {
    this.userDetails = res['user'];
    this.userService.setUserProfile(this.userDetails);
    this.logicService.presentAlertConfirm("Investment started", "Your investment has started successfully, profit will accrued in 24Hr time")


    this.calculateDiff(this.userDetails?.investment_timer)
    this.logicService.dismissSpinner();
  }, err => {
    console.log(err);
    this.logicService.dismissSpinner();
  });
}
}



async start10000() {
  const alert = await this.alertController.create({
    header: 'Start 10,000 Investment',
    subHeader : "Please confirm the following",
    message: ` <strong class="text-dark">Your Investment will last 24 hours and
    ₦10,000 will be invested from available balance </strong> <br>
    `,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Yes',
        handler: () => {
          console.log('Confirm Okay');
          this.start10000Investment();
        }
      }
    ]
  });

  await alert.present();
}








start10000Investment(){
  clearInterval(this.timerInterval);
if (this.userDetails.balance < 10000) {
  this.logicService.showError('Insufficient balance of ' + '₦'+this.userDetails?.balance);
} else {
  const dateProps = { date : new Date(new Date().getTime() + 60 * 60 * 24 * 1000)}
  this.logicService.showSpinner();
  this.userService.start10000Investment(dateProps).subscribe(res => {
    this.userDetails = res['user'];
    this.userService.setUserProfile(this.userDetails);
    this.logicService.presentAlertConfirm("Investment started", "Your investment has started successfully, profit will accrued in 24Hr time")


    this.calculateDiff(this.userDetails?.investment_timer)
    this.logicService.dismissSpinner();
  }, err => {
    console.log(err);
    this.logicService.dismissSpinner();
  });
}
}


// start twenty 
async startTwenty() {
  const alert = await this.alertController.create({
    header: 'Start 20,000 Investment',
    subHeader : "Please confirm the following",
    message: ` <strong class="text-dark">Your Investment will last 24 hours and
    ₦20,000 will be invested from available balance </strong> <br>
    `,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Yes',
        handler: () => {
          console.log('Confirm Okay');
          this.startTwentyInvestment();
        }
      }
    ]
  });

  await alert.present();
}



startTwentyInvestment(){
  clearInterval(this.timerInterval);
if (this.userDetails.balance < 20000) {
  this.logicService.showError('Insufficient balance of ' + '₦'+this.userDetails?.balance);
} else {
  const dateProps = { date : new Date(new Date().getTime() + 60 * 60 * 24 * 1000)}
  this.logicService.showSpinner();
  this.userService.startTwentyInvestment(dateProps).subscribe(res => {
    this.userDetails = res['user'];
    this.userService.setUserProfile(this.userDetails);
    this.logicService.presentAlertConfirm("Investment started", "Your investment has started successfully, profit will accrued in 24Hr time")


    this.calculateDiff(this.userDetails?.investment_timer)
    this.logicService.dismissSpinner();
  }, err => {
    console.log(err);
    this.logicService.dismissSpinner();
  });
}
}
// end of starting twenty



// start fifty 
async startFifty() {
  const alert = await this.alertController.create({
    header: 'Start 50,000 Investment',
    subHeader : "Please confirm the following",
    message: ` <strong class="text-dark">Your Investment will last 24 hours and
    ₦50,000 will be invested from available balance </strong> <br>
    `,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Yes',
        handler: () => {
          console.log('Confirm Okay');
          this.startFiftyInvestment();
        }
      }
    ]
  });

  await alert.present();
}


startFiftyInvestment(){
  clearInterval(this.timerInterval);
if (this.userDetails.balance < 50000) {
  this.logicService.showError('Insufficient balance of ' + '₦'+this.userDetails?.balance);
} else {
  const dateProps = { date : new Date(new Date().getTime() + 60 * 60 * 24 * 1000)}
  this.logicService.showSpinner();
  this.userService.startFiftyInvestment(dateProps).subscribe(res => {
    this.userDetails = res['user'];
    this.userService.setUserProfile(this.userDetails);
    this.logicService.presentAlertConfirm("Investment started", "Your investment has started successfully, profit will accrued in 24Hr time")


    this.calculateDiff(this.userDetails?.investment_timer)
    this.logicService.dismissSpinner();
  }, err => {
    console.log(err);
    this.logicService.dismissSpinner();
  });
}
}
//  end fifty




// start hundred 
async startHundred() {
  const alert = await this.alertController.create({
    header: 'Start 100,000 Investment',
    subHeader : "Please confirm the following",
    message: ` <strong class="text-dark">Your Investment will last 24 hours and
    ₦100,000 will be invested from available balance </strong> <br>
    `,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Yes',
        handler: () => {
          console.log('Confirm Okay');
          this.startHundredInvestment();
        }
      }
    ]
  });
  await alert.present();
}


startHundredInvestment(){
  clearInterval(this.timerInterval);
if (this.userDetails.balance < 100000) {
  this.logicService.showError('Insufficient balance of ' + '₦'+this.userDetails?.balance);
} else {
  const dateProps = { date : new Date(new Date().getTime() + 60 * 60 * 24 * 1000)}
  this.logicService.showSpinner();
  this.userService.startHundredInvestment(dateProps).subscribe(res => {
    this.userDetails = res['user'];
    this.userService.setUserProfile(this.userDetails);
    this.logicService.presentAlertConfirm("Investment started", "Your investment has started successfully, profit will accrued in 24Hr time")


    this.calculateDiff(this.userDetails?.investment_timer)
    this.logicService.dismissSpinner();
  }, err => {
    console.log(err);
    this.logicService.dismissSpinner();
  });
}
}
//  end of hundred





calculateDiff(timer){

var countDownDate = new Date(timer).getTime();

// Update the count down every 1 second
this.timerInterval = setInterval(()=> {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  this.timerDays = Math.floor(distance / (1000 * 60 * 60 * 24));
  this.timerHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  this.timerMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  this.timerSeconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  // document.getElementById("demo").innerHTML = this.timerDays + "d " + this.timerHours + "h "
  // + this.timerMinutes + "m " + this.timerSeconds + "s ";
  // console.log(this.timerDays + "d " + this.timerHours + "h "
  // + this.timerMinutes + "m " + this.timerSeconds + "s ");

  // If the count down is finished, write some text
  if (distance < 1) {
    console.log('less than zero', )
    clearInterval(this.timerInterval);
   console.log('YOU INVESTMENT HAS COMPLETE');
   this.timerHours  = '0'; this.timerMinutes = '0'; this.timerSeconds = '0';
   this.completeInvestment(this.userDetails);

  //  save trans here

  }
}, 1000);
}



completeInvestment(user){
  this.logicService.showSpinner();
  this.completedInvestModel.amount  = user.investment;
  this.completedInvestModel.username  = this.authService.getUsername();
  this.completedInvestModel.profit  = 20/100 * user.investment;
  this.completedInvestModel.date =  new Date().getTime()

  this.userService.completeInvestment(this.completedInvestModel).subscribe(result => {
    this.logicService.showSuccess(result['msg'])
    this.userDetails = result['user']
    this.logicService.dismissSpinner();

    // setTimeout()

  }, err => {
    this.logicService.dismissSpinner();
    console.log(err);
  })
}

}
