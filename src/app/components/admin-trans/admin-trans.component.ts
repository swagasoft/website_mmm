import { ModalController, AlertController } from '@ionic/angular';
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
    private modalController : ModalController, private alertController :  AlertController) { }

  ngOnInit() {
    console.log('FIRE FIRE FIRE FIRE3333')
    this.getAllTrans();
   
  }

  ionViewDidEnter(){
   console.log('enter transsssss')
  }

  getAllTrans(){
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




  async previewReceipt(url) {
    const modal = await this.modalController.create({
    component: PreviewComponent,
    componentProps: { imageUrl:url }
    });
  
    await modal.present();
  
  }

  async presentConfirm(trans) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Confirming this transaction will credit the specified user account.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay', trans);
            this.confirmTrans(trans);
          }
        }
      ]
    });
  
    await alert.present();
  }

  confirmTrans(trans){
    const result = this.transList.find( ({ _id }) => _id === trans._id );
    result.status = 'successful';
    console.log('result',result);
    this.userService.confirmManualTransaction(result).subscribe(res => {
      console.log(res)
    }, err => {
      result.status = "waiting";
    });
  }




  async presentDelete(trans) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'This record will be deleted and not reco',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay', trans);
            this.deleteTrans(trans._id)
          }
        }
      ]
    });
  
    await alert.present();
  }


  deleteTrans(id){
    this.userService.deleteTransById(id).subscribe(res => {
      console.log(res);
      this.getAllTrans();
    }, err => {
      console.log();
    })
  }

}
