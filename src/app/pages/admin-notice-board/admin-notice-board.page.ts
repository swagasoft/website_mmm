import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LogicService } from 'src/app/services/logic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-notice-board',
  templateUrl: './admin-notice-board.page.html',
  styleUrls: ['./admin-notice-board.page.scss'],
})
export class AdminNoticeBoardPage implements OnInit {
  noticeForm: FormGroup;
  noticeList  = [];
  constructor(private formBuilder: FormBuilder,private logicService : LogicService,
    private userService: UserService) { }

  ngOnInit() {
    this.noticeForm = this.formBuilder.group({
   
      subject: new FormControl(null),
      message: new FormControl(null),
      date: new FormControl( Date.now()),
 
   
  });
  this.getNotice();
  }



  submitForm(){
    this.logicService.showSpinner();
    this.userService.submitNotice(this.noticeForm.value).subscribe( res => {
      console.log(res);
      this.logicService.dismissSpinner();
      this.noticeForm.reset();
      this.noticeList.push(res['notice']);
      this.noticeList.reverse();
      this.logicService.showSuccess("submitted successfully");
    }, err => {
      console.log(err);
      this.logicService.dismissSpinner();
    });
  }


  getNotice(){
    this.logicService.showSpinner();
    this.userService.getNotice().subscribe(res=> {
      this.noticeList = res['notice'];
      this.logicService.dismissSpinner();
    }, err=> {
      this.logicService.dismissSpinner();
    });
  }
}
