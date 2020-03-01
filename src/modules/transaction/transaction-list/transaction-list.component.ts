import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { AccountService } from '../../../services/account.service';
import { TransactionService } from '../../../services/transaction.service';
import { Account } from "../../../models/account";
import { Transaction,TransactionType } from "../../../models/transaction";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions = [];
  selectedAccounts : Account[] = [];
  accounts : Account[] = [];

  constructor(
    private eventsService: EventsService,
    private accountService: AccountService,
    private transactionService: TransactionService,
  ) { 
  }

  ngOnInit() {
    this.refreshAccounts();
    this.eventsService.accountSelectionChange.subscribe(()=>this.refreshData());
    this.eventsService.accountsChange.subscribe(()=>this.refreshAccounts());
  }

  refreshData(){
    this.selectedAccounts = this.accountService.getSelectedAccounts();
    this.transactions = this.transactionService.getTransactions(this.selectedAccounts);
    
    //add reference values
    this.selectedAccounts.forEach(account => {
      var referenceTransaction = this.transactionService.getReferenceTransaction(account);
      referenceTransaction.hide=true;
      this.transactions.push(referenceTransaction);
    });

    //sort
    this.transactions = this.transactionService.sortTransactions(this.transactions);

//TODO se reference values são posteriores tem que se diminuir o sum
    //add sums
    var sum = Dinero({amount:0,currency:"EUR"});//account ini
    for (let i = this.transactions.length-1; i >=0 ; i--) {
      switch(this.transactions[i].type){
        case TransactionType.CREDIT:
          sum = sum.add(this.transactions[i].amount);
        break;
        case TransactionType.DEBIT:
          sum = sum.subtract(this.transactions[i].amount);
        break;
      }
      this.transactions[i].sum = sum;
    }
  }

  refreshAccounts(){
    this.accounts = this.accountService.getAccounts();
    this.refreshData();
  }
}