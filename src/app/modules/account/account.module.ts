import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { routing } from './account.routing'
import { AccountsRoutingModule } from './accounts-routing.module'
import { AccountService } from '../../shared/services/account.service';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

@NgModule({
  imports: [
    CommonModule,
    AccountsRoutingModule
  ],
  exports: [
    
  ],
  declarations: [ AccountCreateComponent, AccountListComponent, AccountDetailsComponent ],
  providers : [AccountService]
})
export class AccountModule { }