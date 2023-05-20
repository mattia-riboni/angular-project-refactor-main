import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AUTHService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AUTHGuard implements CanActivate {

  constructor(private authService: AUTHService){}

  canActivate(): Observable<boolean>  | Promise<boolean>| boolean {
    if (localStorage.getItem('user')){
      return true
    } else {
      return this.authService.isAuthenticated();
    }
  }

}
