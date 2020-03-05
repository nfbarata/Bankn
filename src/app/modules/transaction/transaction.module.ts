import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { TextInputHighlightModule } from 'angular-text-input-highlight';

import { TransactionRoutingModule } from './transaction-routing.module';
import { SharedModule } from '../shared/shared.module';

import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionImportComponent } from './transaction-import/transaction-import.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionImportParseComponent } from './transaction-import-parse/transaction-import-parse.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    TransactionRoutingModule,
    SharedModule,
    TextInputHighlightModule
  ],
  declarations: [
    TransactionListComponent,
    TransactionImportComponent,
    TransactionComponent,
    TransactionImportParseComponent
  ],
  exports: [
    TransactionImportComponent,TransactionComponent
  ]
})
export class TransactionModule {
  
 }