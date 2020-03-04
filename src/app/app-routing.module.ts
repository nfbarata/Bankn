import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BanknCreateComponent } from './bankn-create/bankn-create.component';

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'content' },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'bankn', component: BanknCreateComponent },
  { path: 'bankn/:banknId', component: BanknCreateComponent },
  { path: 'accounts', loadChildren: () => import('../../modules/account/account.module').then(m => m.AccountModule)},
  { path: 'transactions', loadChildren: () => import('../../modules/transaction/transaction.module').then(m => m.TransactionModule)},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }