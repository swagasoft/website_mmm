import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.getTransaction();
  }

  getTransaction(){
    this.userService.getTransaction().subscribe( trans => {
      console.log(trans);
    }, err => {
      console.log(err);
    })
  }

}
