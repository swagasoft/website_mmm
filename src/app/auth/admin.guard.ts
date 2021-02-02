import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
USER_ROLE: any;
  constructor(private authService: AuthService , private router: Router){
this.USER_ROLE = authService.getRole();
  }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{

    if(this.USER_ROLE =='ADMIN'){
        return true;
    }
    
    
    this.authService.logout();
    return false;
  } 
  
}
