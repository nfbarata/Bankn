import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitializedGuard } from './guards/initialized.guard';
import { HomeComponent } from './components/home/home.component';
import { BanknCreateComponent } from './components/bankn-create/bankn-create.component';

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'content' },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'bankn', component: BanknCreateComponent },
  { path: 'bankn/:banknId', component: BanknCreateComponent, canActivate: [InitializedGuard] },
  { path: 'accounts', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule), canActivate: [InitializedGuard]},
  { path: 'transactions', loadChildren: () => import('./modules/transaction/transaction.module').then(m => m.TransactionModule), canActivate: [InitializedGuard]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }