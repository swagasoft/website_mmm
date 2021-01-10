

import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpResponse } from '@angular/common/http';

import {map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor  implements HttpInterceptor {

    constructor(private authService: AuthService){
    }

      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken(); // you probably want to store it in localStorage or something
    
    
        if (!token) {
          return next.handle(req);
        }
    
        const req1 = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
    
        return next.handle(req1);
      }
}