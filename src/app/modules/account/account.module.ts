import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './account-routing.module'
import { SharedModule } from '../shared/shared.module';

import { AccountComponent } from './account/account.component';
import { AccountListComponent } from './account-list/account-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AccountsRoutingModule,
    SharedModule
  ],
  declarations: [ 
    AccountComponent, 
    AccountListComponent
  ],
  exports: []
})
export class AccountModule { 
  
}