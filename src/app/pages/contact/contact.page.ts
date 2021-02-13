import { UserService } from 'src/app/services/user.service';
import { LogicService } from 'src/app/services/logic.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private logicService : LogicService,
    private userService: UserService) { }


  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      email: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
   
      name: new FormControl(null, Validators.compose([
        Validators.required,
    ])),
      phone: new FormControl(null),
      message: new FormControl(null),
 
   
  });
  }


  submitForm(){
    this.logicService.showSpinner();
    this.userService.submitContactForm(this.contactForm.value).subscribe( res => {
      console.log(res);
      this.logicService.dismissSpinner();
      this.contactForm.reset();
      this.logicService.showSuccess("submitted successfully");
    }, err => {
      console.log(err);
      this.logicService.dismissSpinner();
    });
  }



}
