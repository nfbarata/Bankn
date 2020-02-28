import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionListComponent } from './transaction-list/transaction-list.component'
import { TransactionImportComponent } from './transaction-import/transaction-import.component'

const routes: Routes = [
  { path: '', component: TransactionListComponent },
  { path: 'import/:accountId', component: TransactionImportComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }