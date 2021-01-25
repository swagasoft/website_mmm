import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
@Input() imageUrl;
  imageLoading: boolean = true;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.imageUrl);
    
  }

  closeModal(){
    this.modalController.dismiss();
  }

  onLoad(){
    console.log('loaded')
    this.imageLoading = false;
  }

}
