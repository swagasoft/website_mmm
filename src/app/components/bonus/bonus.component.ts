import { LogicService } from './../../services/logic.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss'],
})
export class BonusComponent implements OnInit {
bonusList : any[];
userDetails : any;


  constructor(private userService : UserService, private logicService : LogicService) { }

  ngOnInit() {
    this.getMyBonus();
    this.getUserDetails();
  }


  getMyBonus(){
    this.logicService.showSpinner();
    this.userService.getUserBonus().subscribe(bonus => {
      console.log(bonus);
      this.bonusList = bonus['bonus'];
      this.logicService.dismissSpinner();
    }, err => {
      console.log(err);
      this.logicService.dismissSpinner();
    });
  }


  getUserDetails(){
    this.logicService.showSpinner();
    this.userService.getUserDetails().subscribe(res => {
      console.log(res);
      this.logicService.dismissSpinner();
      this.userDetails = res['user']
    }, err => {
      this.logicService.dismissSpinner();
      console.log(err);
    });
  }

  claimBonus(){
    if(!this.userDetails?.running_investment){
      this.logicService.showError('You need to have a running investment before bonus can be claimed!');
    }else{
      console.log('bonus claimed!');
      this.userService.claimBonus().subscribe(res => {
        console.log(res);
        this.getUserDetails();
        this.logicService.showSuccess(res['msg'])
      }, err => {
        this.logicService.showError(err.error.msg);
        console.log();
      })

    }
  }
}
