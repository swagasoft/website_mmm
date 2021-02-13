import { LogicService } from 'src/app/services/logic.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-running-trans',
  templateUrl: './running-trans.component.html',
  styleUrls: ['./running-trans.component.scss'],
})
export class RunningTransComponent implements OnInit {
runningList = [];

  constructor(private userService : UserService, private logicService : LogicService) { }

  ngOnInit() {
    this.getRunningTrans();
  }


  getRunningTrans(){
    this.logicService.showSpinner();
    this.userService.getAllRunningInvestment().subscribe(res => {
      console.log(res);
      this.logicService.dismissSpinner();
      this.runningList = res['users'];
    }, err => {
      console.log(err);
      this.logicService.dismissSpinner()
    })
  }
}
