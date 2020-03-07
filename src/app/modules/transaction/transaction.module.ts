import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { TransactionRoutingModule } from './transaction-routing.module';
import { SharedModule } from '../shared/shared.module';

import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionImportComponent } from './transaction-import/transaction-import.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionImportFilterComponent } from './transaction-import-filter/transaction-import-filter.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    TransactionRoutingModule,
    SharedModule
  ],
  declarations: [
    TransactionListComponent,
    TransactionImportComponent,
    TransactionComponent,
    TransactionImportFilterComponent
  ],
  exports: [
    TransactionImportComponent,TransactionComponent
  ]
})
export class TransactionModule {
  
 }