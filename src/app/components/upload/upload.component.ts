import { UserService } from './../../services/user.service';
import { ModalController } from '@ionic/angular';
import { LogicService } from './../../services/logic.service';
import { AuthService } from './../../services/auth.service';
import { FireService } from './../../services/fire.service';


import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  title = ' title';
  fileToUpload: any;
  imageUrl: any;
  original_image_link: String;
notice :  any;
  imageRef: any;

  loading = false;

  constructor( private logicService : LogicService,  private fireService : FireService, private authService: AuthService,
  private modalController : ModalController, private userService : UserService){

  }

  model = { amount: null, email : this.authService.getEmail(), name: this.authService.getUsername(), image: null,
  date : Date.now()}


  ngOnInit(){
  }
  
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
console.log('file to upload', this.fileToUpload)
console.log('if image', this.fileToUpload.type)
console.log('size', this.fileToUpload.size)
    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }


  uploadImage(){
console.log('upload started')
this.loading = true;

try {
  this.fireService.uploadImage(this.authService.getEmail(), this.fileToUpload).then((success)=> {
    console.log('success',success);
    this.imageRef = success.ref.fullPath;
    this.downloadImage();
  });
} catch (error) {
  this.loading = false;
  console.log(error);
  this.logicService.showError('Error uploading document, check your connection and try again.');

}
  }
    

  downloadImage(){
    this.fireService.downloadItem(this.imageRef).subscribe(imageUrl => {
      console.log(imageUrl);
      this.model.image = imageUrl;
      this.userService.manualTransfer(this.model).subscribe(result => {
        console.log(' success',result);
        this.loading = false;
        this.closeModal();
        this.logicService.showSuccess('You receipt is submitted, Admin will confirm your account shortly');
      }, err => {
        this.loading = false;
        this.logicService.showError('Error saving receipt!');
      });
    });
  }


  closeModal(){
    this.modalController.dismiss();
  }


  
}
