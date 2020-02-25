import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'accounts'  }, // default route of the module
  { path: '', component: AccountListComponent },
  { path: 'account/:accountId', component: AccountDetailsComponent },
  { path: 'account', component: AccountCreateComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }