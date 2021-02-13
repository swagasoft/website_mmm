import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import jwtDecode, * as jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  public appUser: any; 
  
  
  constructor(private http: HttpClient,  public alertController: AlertController,
              public toastController: ToastController,
              private router: Router) {
     }
  
  
    
    
  
       login(credentials) {
        return this.http.post(environment.apiBaseUrl  + '/login',credentials);
      }
 
  
       createUser(credentials) {
        return this.http.post(environment.apiBaseUrl  + '/create-user',credentials);
      }
 
  
  
     
  
       getEmail(){
        let payLoad = jwtDecode(this.getToken());
        let email = payLoad['email'];
        console.log(email)
        return email;
       }
     

       getRole(){
        let payLoad = jwtDecode(this.getToken());
        console.log('payload ', payLoad);
        let role = payLoad['role'];
        console.log(role);
        return role;
       }

       checkForAdmin(){
        let payLoad = jwtDecode(this.getToken());
        let role = payLoad['role'];
        if(role == 'ADMIN'){
          return true
        }else{
          return false;
        }
        return role;
       }
     
       getUsername(){
        let payLoad = jwtDecode(this.getToken());
        let role = payLoad['username'];
        return role;
       }
     

       getAuthId(){
        let payLoad = jwtDecode(this.getToken());
        let user_id = payLoad['_id'];
        return user_id;
       }
     
  
     
  
  
      public getToken(): string {
        return localStorage.getItem('token');
        }
  
     
  
     
  
  
      getUserPayload() {
        const token = this.getToken();
        if (token) {
          const userPayload = atob(token.split('.')[1]);
          return JSON.parse(userPayload);
        } else {
          return null;      
        }
      }
      
      isLoggedIn() {
        const userPayload = this.getUserPayload();
        if (userPayload) {
        return userPayload.exp > Date.now() / 1000;
        } else {
        return false;
        }
      }
  
       setToken(token: string) {
        localStorage.setItem('token', token);
       
       }
  
       deleteToken() {
        window.localStorage.removeItem('token');
      }
  
       public logout(): void {
        this.deleteToken();
        localStorage.clear();
        this.router.navigate(['/login'])
       }
  
    
  
    
}
