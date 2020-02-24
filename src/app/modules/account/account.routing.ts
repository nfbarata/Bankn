import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

export const routes: Routes = [
  { path: '', component: AccountListComponent }, // default route of the module
  { path: 'accounts/:accountId', component: AccountDetailsComponent },
  { path: 'account-create', component: AccountCreateComponent },
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)