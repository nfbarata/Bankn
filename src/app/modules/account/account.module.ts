import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountService } from './services/account.service';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ AccountCreateComponent, AccountListComponent, AccountDetailsComponent ],
  providers : [AccountService]
})
export class AccountModule { }