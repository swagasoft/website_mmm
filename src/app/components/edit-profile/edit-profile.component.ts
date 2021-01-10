import { LogicService } from './../../services/logic.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {




  @Input() fullname: string;
  @Input() username: string;
  @Input() email: string;
  @Input() role: string;
  @Input() phone: string;
  @Input() _id: string;
  @Input() bank: string;
  @Input() bank_account_no: string;
  @Input() bank_account_name: string;
  loading = false;
  constructor(public modalControl : ModalController, private userService: UserService,
    public logicService : LogicService) { }

  userProps = {
    fullname : '',
    username : '',
    email : '',
    role: '',
    phone: '',
    id:'',
    bank:'',
    bank_account_no:'',
    bank_account_name:'',
  }

  ngOnInit() {
    console.log(this.fullname);
    console.log(this.username);
    console.log(this.email);
    console.log(this._id);
    console.log(this.phone);

    this.userProps = {
      fullname : this.fullname,
      username : this.username,
      email : this.email,
      role: this.role,
      phone: this.phone,
      id:this._id,
      bank: this.bank,
      bank_account_no: this.bank_account_no,
      bank_account_name: this.bank_account_name,
    }

  }


  dismiss(){
    this.modalControl.dismiss();
  }

  confirmEdit(){
    console.log(this.userProps);
    this.loading = true;
    this.userService.updateUserProfile(this.userProps).subscribe(
      res => {
        this.loading = false;
        this.dismiss()
        this.logicService.showSuccess(res['msg']);
        console.log(res);
      },
      err => {
        this.loading = false;
        this.logicService.showError(err.error.msg);
      }
    )


  }

}
