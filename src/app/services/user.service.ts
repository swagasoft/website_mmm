import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userProfile = new BehaviorSubject<any>(null);
  
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

  unlock_1000_process(info){
    return this.http.put(environment.apiBaseUrl  + '/unlock-1000-process', info);
  }
  start1000Investment(data){
    return this.http.put(environment.apiBaseUrl  + '/start-1000-process', data);
  }

  completeInvestment(investment){
    return this.http.post(environment.apiBaseUrl + '/complete-investment',investment);
  }


  adminGetTransaction(){
    return this.http.get(environment.apiBaseUrl + '/admin-get-trans');
  }


  setUserProfile(profile) {
    this.userProfile.next(profile);
  }

  getUserProfile(): BehaviorSubject<any> {
    return this.userProfile;
  }

  startWithdrawal(trans){
    return this.http.post(environment.apiBaseUrl + '/start-withdrawal', trans);
  }

  getMyWithdrawal(){
    return this.http.get(environment.apiBaseUrl + '/get-my-withdrawal');
  }

  getAdminWithdrawal(){
    return this.http.get(environment.apiBaseUrl + '/get-admin-withdrawal');
  }
  getAdminPayout(){
    return this.http.get(environment.apiBaseUrl + '/get-admin-payout');
  }

  settleWithdrawal(trans){
    return this.http.put(environment.apiBaseUrl + '/settle-withdrawal', trans);
  }

}
 