import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './account.routing'

import { AccountService } from '../../shared/services/account.service';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  exports: [
    
  ],
  declarations: [  ],
  providers : [AccountService]
})
export class AccountModule { }