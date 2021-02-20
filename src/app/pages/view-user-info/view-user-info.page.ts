import { AuthService } from './../../services/auth.service';
import { LogicService } from './../../services/logic.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-user-info',
  templateUrl: './view-user-info.page.html',
  styleUrls: ['./view-user-info.page.scss'],
})
export class ViewUserInfoPage implements OnInit {
  genOne : any []= [];
  genTwo : any []= [];
  genThree : any []= [];
  genFour : any []= [];

  segment = "1st_gen"

  constructor(private activateRoute:ActivatedRoute, private userService : UserService,
    private logicService :LogicService, private auth: AuthService) { }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      const  username = this.activateRoute.snapshot.params['username'];
      console.log(username)
      this.getUserDownLine(username);
   });
  }

  getUserDownLine(username){
    this.logicService.showSpinner();
    this.userService.showUserDownLine(username).subscribe(data => {
      this.genOne = data['genOne']
      this.genTwo = data['genTwo']
      this.genThree = data['genThree']
      this.genFour = data['genFour']
      this.logicService.dismissSpinner()
    }, err=> {
      this.logicService.dismissSpinner();
    })
  }


  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segment = ev.detail.value;
  }

}
