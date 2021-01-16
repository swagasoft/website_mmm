import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUserDetails() {
    return this.http.get(environment.apiBaseUrl  + '/get-user-details',);
  }
  updateUserProfile(user) {
    return this.http.put(environment.apiBaseUrl  + '/update-user-details',user);
  }
  submitTransaction(trans) {
    return this.http.post(environment.apiBaseUrl  + '/submit-trans',trans);
  }
  getTransaction() {
    return this.http.get(environment.apiBaseUrl  + '/transactions');
  }
  manualTransfer(trans) {
    return this.http.post(environment.apiBaseUrl  + '/manual-transfer', trans);
  }
}
 