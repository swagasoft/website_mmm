import { LogicService } from './../../services/logic.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-downline',
  templateUrl: './downline.component.html',
  styleUrls: ['./downline.component.scss'],
})
export class DownlineComponent implements OnInit {

  genOne : any []= [];
  genTwo : any []= [];
  genThree : any []= [];
  genFour : any []= [];

  segment = "1st_gen"

  constructor(private userService : UserService, private logicService : LogicService) { }

  ngOnInit() {
    this.getMyDownLine();
  }


  getMyDownLine(){
    this.logicService.showSpinner();

    this.userService.getUserDownLine().subscribe(data => {
      console.log(data);
      this.genOne = data['genOne']
      this.genTwo = data['genTwo']
      this.genThree = data['genThree']
      this.genFour = data['genFour']
      this.logicService.dismissSpinner()
    }, err => {
      console.log(err);
      this.logicService.dismissSpinner()
    })
  }


  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segment = ev.detail.value;
  }

}
