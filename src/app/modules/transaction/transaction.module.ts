import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';


import { TransactionListComponent } from './transaction-list/transaction-list.component'
import { AccountSelectCardComponent } from '../../shared/components/account-select-card/account-select-card.component'

@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule
  ],
  declarations: [
    TransactionListComponent,
    AccountSelectCardComponent
  ],
  exports: []
})
export class TransactionModule { }