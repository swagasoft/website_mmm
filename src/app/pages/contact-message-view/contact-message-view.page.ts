import { LogicService } from './../../services/logic.service';
import { UserService } from './../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-message-view',
  templateUrl: './contact-message-view.page.html',
  styleUrls: ['./contact-message-view.page.scss'],
})
export class ContactMessageViewPage implements OnInit {
id: any;
message : any;

  constructor(private activateRoute : ActivatedRoute, private userService : UserService,
    private logicService : LogicService) { }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = this.activateRoute.snapshot.params['id'];
      console.log(this.id);
      this.getMessage();
   });
  }

  getMessage(){
    this.logicService.showSpinner();
    this.userService.getMessageById(this.id).subscribe(res=> {
      this.logicService.dismissSpinner()
      console.log(res);
      this.message = res['message'];
    }, err => {
      this.logicService.dismissSpinner()
    })
  }

}
