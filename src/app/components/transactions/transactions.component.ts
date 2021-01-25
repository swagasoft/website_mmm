import { LogicService } from './../../services/logic.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
transList : any = [];

  constructor(private userService : UserService, private  logicService : LogicService) { }

  ngOnInit() {
    this.getTransaction();
  }

  getTransaction(){
    this.logicService.showSpinner();
  
    this.userService.getTransaction().subscribe( trans => {
      console.log(trans);
      this.transList = trans['trans'];
      this.logicService.dismissSpinner();
    }, err => {
      console.log(err);
      this.logicService.dismissSpinner();
    })
  }

}
