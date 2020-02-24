import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
//import { CommonModule } from '@angular/common';

//import { routing } from './account.routing'
import { AccountsRoutingModule } from './accounts-routing.module'
import { AccountService } from '../../shared/services/account.service';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
  //  CommonModule,
    AccountsRoutingModule
  ],
  declarations: [ AccountCreateComponent, AccountListComponent, AccountDetailsComponent ],
  providers : [AccountService]
})
export class AccountModule { }