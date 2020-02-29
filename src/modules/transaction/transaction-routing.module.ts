import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionListComponent } from './transaction-list/transaction-list.component'
import { TransactionImportComponent } from './transaction-import/transaction-import.component'
import { TransactionComponent } from './transaction-import/transaction.component'

const routes: Routes = [
  { path: '', component: TransactionListComponent },
  { path: 'transaction/:accountId', component: TransactionImportComponent },
  { path: 'transaction/:accountId/:transactionId', component: TransactionImportComponent },
  { path: 'import/:accountId', component: TransactionImportComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }