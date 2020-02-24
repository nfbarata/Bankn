import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './shared/components/home/home.component';
import { AccountModule } from './modules/account/account.module';

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'content' },
  { path: '', pathMatch: 'full', component: HomeComponent },
 // { path: 'accounts', component: AccountModule},
  //{ path: 'accounts', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)},
/*  {
    path: 'accounts',
    loadChildren: './modules/account/account.module#AccountModule',
  },
  {
    path: 'transactions',
    loadChildren: './modules/transaction/transaction.module#TransactionModule',
  }*/
]

@NgModule({
  imports: [
     RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }