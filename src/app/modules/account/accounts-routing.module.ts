import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

const routes: Routes = [
  { path: '', component: AccountListComponent }, // default route of the module
  { path: 'accounts/:accountId', component: AccountDetailsComponent },
  { path: 'account-create', component: AccountCreateComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }