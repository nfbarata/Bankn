import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { TransactionRoutingModule } from './transaction-routing.module';
import { SharedModule } from '../shared/shared.module';

import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionImportComponent } from './transaction-import/transaction-import.component';
import { TransactionComponent } from './transaction/transaction.component'

@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule
  ],
  declarations: [
    TransactionListComponent,
    TransactionImportComponent,
    TransactionComponent
  ],
  exports: [
    TransactionImportComponent,TransactionComponent
  ]
})
export class TransactionModule { }