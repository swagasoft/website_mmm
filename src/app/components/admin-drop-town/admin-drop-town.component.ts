import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-drop-town',
  templateUrl: './admin-drop-town.component.html',
  styleUrls: ['./admin-drop-town.component.scss'],
})
export class AdminDropTownComponent implements OnInit {
showMenu : Boolean;
  constructor() { }

  ngOnInit() {
    this.showMenu = false;

  }


  toggleMenu(){
    console.log(this.showMenu)
this.showMenu   = ((this.showMenu == true))  ? false : true;
console.log(this.showMenu)

  }

  onClickMenu(){
    this.showMenu = false;
  }

}
