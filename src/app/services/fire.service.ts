import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(  private storage: AngularFireStorage,
) {
}

downloadItem(photoUrl: string): Observable<any> {
  return this.storage.ref(photoUrl).getDownloadURL();
}



uploadImage(email: string, imageFile: File): AngularFireUploadTask {
  console.log('file', imageFile);
  return this.storage.upload(`${email}/${imageFile.name}`, imageFile);
}

uploadVideo(email: string, file: any): AngularFireUploadTask {
  return this.storage.upload(`${email}/videos/${file.name}`, file);
}

uploadAudio(email: string, file: any): AngularFireUploadTask {
  return this.storage.upload(`${email}/audios/${file.name}`, file);
}
}
