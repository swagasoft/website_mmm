import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor(private alertController: AlertController, private toastr: ToastrService) { }




async presentAlertConfirm(header, message) {
  const alert = await this.alertController.create({
    header:  header,
    message:  message,
    buttons: [
      {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
        }
      }
    ]
  });

  await alert.present();
}



showSuccess(message) {
  this.toastr.success(message);
}


showWarning(message){
  this.toastr.warning(message)
}

showError(message){
  this.toastr.error(message)
}
showInfo(message){
  this.toastr.info(message)
}

}
