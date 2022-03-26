import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AccountSelectCardComponent } from './account-select-card/account-select-card.component';
import { AccountCreateCardComponent } from './account-create-card/account-create-card.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileOpenCardComponent } from './file-open-card/file-open-card.component';
import { BanknCreateCardComponent } from './bankn-create-card/bankn-create-card.component';
import { TransactionsImportCardComponent } from './transactions-import-card/transactions-import-card.component';
import { TransactionCreateCardComponent } from './transaction-create-card/transaction-create-card.component';
import { DineroPipe } from './dinero.pipe';
import { TransactionPipe } from './transaction.pipe';
import { TransactionTypePipe } from './transactionType.pipe';
import { ImportColumnTypePipe } from './importColumnType.pipe';

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    AccountCreateCardComponent, AccountSelectCardComponent, FileUploadComponent, FileOpenCardComponent, BanknCreateCardComponent, TransactionsImportCardComponent,
    TransactionCreateCardComponent, DineroPipe, TransactionPipe, TransactionTypePipe, ImportColumnTypePipe
  ],
  declarations: [
    AccountCreateCardComponent, AccountSelectCardComponent, FileUploadComponent, FileOpenCardComponent, BanknCreateCardComponent, TransactionsImportCardComponent, TransactionCreateCardComponent,DineroPipe, TransactionPipe, TransactionTypePipe, ImportColumnTypePipe
  ],
  providers:[
    DineroPipe , TransactionPipe, TransactionTypePipe, ImportColumnTypePipe
  ]
})
export class SharedModule { }