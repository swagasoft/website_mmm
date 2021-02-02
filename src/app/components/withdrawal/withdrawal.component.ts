import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { LogicService } from 'src/app/services/logic.service';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss'],
})
export class WithdrawalComponent implements OnInit {
userDetails : any;
myWithdrawal  = [];

  constructor(private logicService : LogicService, private userService : UserService,
    private authService :  AuthService) { }


  amountModel = { amount : null, date : null, username : this.authService.getUsername() 
    , email :this.authService.getEmail()}

  ngOnInit() {
    this.getUserDetails();
    this.getMyWithdrawal();
  }


  getUserDetails(){
    this.logicService.showSpinner();
    this.userService.getUserDetails().subscribe(user => {
      console.log(user);
      this.userDetails = user['user']
      this.logicService.dismissSpinner();
    }, err => {
      this.logicService.dismissSpinner();
      console.log(err);
    });
  }


  withdrawNow(){
 if(this.amountModel.amount > this.userDetails.balance){
  this.logicService.showError("You have enter more than your balance!")
 }else{

  this.amountModel.date = Date.now();
  this.logicService.showSpinner();
  this.userService.startWithdrawal(this.amountModel).subscribe(res => {

    console.log(res);
    this.getUserDetails();
    this.logicService.dismissSpinner();
    this.amountModel.amount = null;
    this.logicService.showInfo(res['msg']);
    this.getMyWithdrawal();

  }, err => {

    console.log( err);
    this.logicService.showError(err.error.msg);
    this.logicService.dismissSpinner()
  });

 }

  }


  getMyWithdrawal(){
    this.userService.getMyWithdrawal().subscribe( res => {
      console.log(res)
      this.myWithdrawal = res['data'];
    });
  }


}
