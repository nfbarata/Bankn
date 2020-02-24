import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './account-routing.module'

import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
//import { AccountService } from '../../shared/services/account.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    AccountsRoutingModule
  ],
  declarations: [ 
    AccountCreateComponent, 
    AccountListComponent, 
    AccountDetailsComponent 
  ],
  exports: []
  //providers : [AccountService]
})
export class AccountModule { }