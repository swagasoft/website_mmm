import { ModalController } from '@ionic/angular';
import { PreviewComponent } from './../preview/preview.component';
import { LogicService } from './../../services/logic.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-trans',
  templateUrl: './admin-trans.component.html',
  styleUrls: ['./admin-trans.component.scss'],
})
export class AdminTransComponent implements OnInit {
transList = [];
  constructor(private userService : UserService, private logicService: LogicService,
    private modalController : ModalController) { }

  ngOnInit() {
    console.log('FIRE FIRE FIRE FIRE3333')
    this.logicService.showSpinner();
    this.userService.adminGetTransaction().subscribe(trans => {
      
      this.transList = trans['doc'];
      console.log('SUCCESS', this.transList)
      this.logicService.dismissSpinner();
    },err => {
      console.log('no trans', err);
      this.logicService.dismissSpinner();
    })
  }

  ionViewDidEnter(){
   console.log('enter transsssss')
  }




  async previewReceipt(url) {
    const modal = await this.modalController.create({
    component: PreviewComponent,
    componentProps: { imageUrl:url }
    });
  
    await modal.present();
  
  }
}
