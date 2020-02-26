import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './account-routing.module'

import { AccountComponent } from './account/account.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AccountsRoutingModule
  ],
  declarations: [ 
    AccountComponent, 
    AccountListComponent, 
    AccountDetailsComponent 
  ],
  exports: []
  //providers : [AccountService]
})
export class AccountModule { }