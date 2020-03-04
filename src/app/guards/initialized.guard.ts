import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BanknService } from '../services/bankn.service';

@Injectable()
export class InitializedGuard implements CanActivate {

  constructor(
    private router: Router,
    private banknService:BanknService
  ){
  } 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.banknService.initialized()){
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
