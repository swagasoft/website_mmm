import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userProfile = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient, private auth : AuthService) { }


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

  unlock5000Investment(info){
    return this.http.put(environment.apiBaseUrl  + '/unlock-5000-process', info);
  }


  unlock10000Investment(info){
    return this.http.put(environment.apiBaseUrl  + '/unlock-10000-process', info);
  }

  unlockTwenty(info){
    return this.http.put(environment.apiBaseUrl  + '/unlock-twenty-process', info);
  }

  unlockFifty(info){
    return this.http.put(environment.apiBaseUrl  + '/unlock-fifty-process', info);
  }

  unlockHundred(info){
    return this.http.put(environment.apiBaseUrl  + '/unlock-hundred-process', info);
  }


  start1000Investment(data){
    return this.http.put(environment.apiBaseUrl  + '/start-1000-process', data);
  }


  start5000Investment(data){
    return this.http.put(environment.apiBaseUrl  + '/start-5000-process', data);
  }


  start10000Investment(data){
    return this.http.put(environment.apiBaseUrl  + '/start-10000-process', data);
  }

  startTwentyInvestment(data){
    return this.http.put(environment.apiBaseUrl  + '/start-twenty-process', data);
  }

  startFiftyInvestment(data){
    return this.http.put(environment.apiBaseUrl  + '/start-fifty-process', data);
  }
  
  startHundredInvestment(data){
    return this.http.put(environment.apiBaseUrl  + '/start-hundred-process', data);
  }

  completeInvestment(investment){
    return this.http.post(environment.apiBaseUrl + '/complete-investment',investment);
  }
  updatePassword(password){
    return this.http.post(environment.apiBaseUrl + '/update-password',password);
  }


  adminGetTransaction(){
    return this.http.get(environment.apiBaseUrl + '/admin-get-trans');
  }


  adminGetHistory(){
    return this.http.get(environment.apiBaseUrl + '/admin-get-history');
  }
  history(){
    return this.http.get(environment.apiBaseUrl + '/history');
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

  reCommitBalance(trans){
    return this.http.post(environment.apiBaseUrl + '/start-re-commit', trans);
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

  getUserDownLine(){
   let  body ={ username : this.auth.getUsername()}
    return this.http.put(environment.apiBaseUrl + '/get-user-down-line', body);
  }

  showUserDownLine(username){
   let  body ={ username : username}
    return this.http.put(environment.apiBaseUrl + '/get-user-down-line', body);
  }
  getUserBonus(){
   let  body ={ username : this.auth.getUsername()}
    return this.http.put(environment.apiBaseUrl + '/get-user-bonus', body);
  }

  validatePassword(password){
    return this.http.put(environment.apiBaseUrl +'/validate-password', password);
  }


  confirmManualTransaction(trans){
    return this.http.put(environment.apiBaseUrl + '/confirm-manual-trans', trans);
  }

  getAllRunningInvestment(){
    return this.http.get(environment.apiBaseUrl + '/get-all-running-invest')
  }

  searchByUsername(user){
    return this.http.put(environment.apiBaseUrl + '/search-user', user);
  }

  updateRole(user){
    return this.http.put(environment.apiBaseUrl + '/update-user-role', user);
  }
 
  submitContactForm(form){
    return this.http.put(environment.apiBaseUrl +'/submit-contact-form', form);
  }

 
  submitNotice(form){
    return this.http.put(environment.apiBaseUrl +'/submit-notice', form);
  }
 
  claimBonus(){
    return this.http.get(environment.apiBaseUrl +'/claim-bonus');
  }

  getNotice(){
    return this.http.get(environment.apiBaseUrl +'/get-notice');
  }

  getContactUs(){
    return this.http.get(environment.apiBaseUrl + '/get-contact-us');
  }

  forgetPassword(email){
    return this.http.put(environment.apiBaseUrl + '/forget-password', email);
  }

  getByRole(role){
    return this.http.get(environment.apiBaseUrl +`/get-by-role${role}`);
  }

  getMessageById(id){
    return this.http.get(environment.apiBaseUrl +`/get-message-by-id${id}`);
  }

  deleteTransById(id){
    return this.http.get(environment.apiBaseUrl +`/delete-trans-by-id${id}`);
  }

}
 