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

    var firstReferenceTransaction:Transaction = null;

    this.selectedAccounts = this.accountService.getSelectedAccounts();
    this.selectedAccounts.forEach(account => {

      var accountTransactions = account.transactions.forEach(transaction => {
        //add meta accountId -> TODO add it at creation?
        transaction.accountId=account.id;
        newTransactions.push(transaction);
      });
      
      //add reference values
      var referenceTransaction = this.transactionService.getReferenceTransaction(account);
      //add meta hide
      referenceTransaction.hide=true;
      newTransactions.push(referenceTransaction);
      if(firstReferenceTransaction==null || firstReferenceTransaction.date.getTime()>referenceTransaction.date.getTime())
        firstReferenceTransaction = referenceTransaction; 
    });
    
    //sort
    newTransactions = this.transactionService.sortTransactions(newTransactions);

    //add meta sum and invert order
    var sum = Dinero({
      amount:0,
      currency: firstReferenceTransaction.amount.getCurrency()
    });
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