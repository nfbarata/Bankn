import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { BanknService } from '../services/bankn.service';

@Injectable()
export class InitializedGuard implements CanActivate {

  constructor(
    private banknService:BanknService
  ){
  } 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.banknService.initialized();
  }
}
