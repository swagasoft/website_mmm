import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements OnInit {
  showMenu : Boolean;
  constructor(public authService : AuthService) { }

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
