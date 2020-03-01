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

    //clear
    while(this.transactions.length>0)
      this.transactions.pop();
    
    var newTransactions = [];

    this.selectedAccounts = this.accountService.getSelectedAccounts();
    this.selectedAccounts.forEach(account => {
      account.transactions.forEach(transaction => {
        transaction.accountId=account.id;
        newTransactions.push(transaction);
      });
      //add reference values
      var referenceTransaction = this.transactionService.getReferenceTransaction(account);
      referenceTransaction.hide=true;
      newTransactions.push(referenceTransaction);
    });
    
    //sort
    newTransactions = this.transactionService.sortTransactions(newTransactions);

//TODO se reference values são posteriores tem que se diminuir o sum
    //add sums
    var sum = Dinero({amount:0,currency:"EUR"});//TODO account ini
    for (let i = newTransactions.length-1; i >=0 ; i--) {
      switch(newTransactions[i].type){
        case TransactionType.CREDIT:
          sum = sum.add(newTransactions[i].amount);
        break;
        case TransactionType.DEBIT:
          sum = sum.subtract(newTransactions[i].amount);
        break;
      }
      newTransactions[i].sum = sum;
    }

    this.transactions = newTransactions;
  }

  refreshAccounts(){
    this.accounts = this.accountService.getAccounts();
    this.refreshData();
  }
}