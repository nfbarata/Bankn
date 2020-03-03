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

  hasRealTransactions:boolean = false;
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
    this.hasRealTransactions = false;

    var newTransactions = [];

    var firstReferenceTransaction:Transaction = null;

    this.selectedAccounts = this.accountService.getSelectedAccounts();
    this.selectedAccounts.forEach(account => {

      var accountTransactions = [].concat(account.transactions);

      if(!this.hasRealTransactions && accountTransactions.length>0)
        this.hasRealTransactions = true;

      //add reference values
      var referenceTransaction = this.transactionService.getReferenceTransaction(account);

      var balanceUp = Dinero({
        amount:referenceTransaction.amount.toUnit(),
        currency: referenceTransaction.amount.getCurrency()
      });
      var balanceDown = Dinero({
        amount:referenceTransaction.amount.toUnit(),
        currency: referenceTransaction.amount.getCurrency()
      });

      //add meta sum for this account
      for (let i = accountTransactions.length-1; i >=0 ; i--) {
        if(accountTransactions[i].date.getTime()>referenceTransaction.date.getTime()){
          //after referenceValue
          accountTransactions[i].balanceBefore=balanceUp;
          switch(accountTransactions[i].type){
            case TransactionType.CREDIT:
              balanceUp = balanceUp.add(accountTransactions[i].amount);
            break;
            case TransactionType.DEBIT:
              balanceUp = balanceUp.subtract(accountTransactions[i].amount);
            break;
          }
          accountTransactions[i].balanceAfter = balanceUp;
        }else{
          //before referenceValue
          accountTransactions[i].balanceBefore=balanceDown;
          switch(accountTransactions[i].type){
            case TransactionType.CREDIT:
              balanceDown = balanceDown.subtract(accountTransactions[i].amount);
            break;
            case TransactionType.DEBIT:
              balanceDown = balanceDown.add(accountTransactions[i].amount);
            break;
          }
          accountTransactions[i].balanceAfter = balanceDown;
        }
      }

      newTransactions = newTransactions.concat(accountTransactions);

      //update firstReferenceTransaction
      if(firstReferenceTransaction==null || firstReferenceTransaction.date.getTime()>referenceTransaction.date.getTime())
        firstReferenceTransaction = referenceTransaction; 
    });

    //sort
    newTransactions = this.transactionService.sortTransactions(newTransactions);

    //update meta sum for all accounts and invert order
    var balanceUp = Dinero({
      amount:0,
      currency: firstReferenceTransaction.amount.getCurrency()
    });
    for (let i = newTransactions.length-1; i >=0 ; i--) {
      switch(newTransactions[i].type){
        case TransactionType.CREDIT:
          balanceUp = balanceUp.add(newTransactions[i].sum);
        break;
        case TransactionType.DEBIT:
          balanceUp = balanceUp.subtract(newTransactions[i].sum);
        break;
      }
      newTransactions[i].balanceAfter = balanceUp;
    }
    this.transactions = newTransactions;
  }

  refreshAccounts(){
    this.accounts = this.accountService.getAccounts();
    this.refreshData();
  }
}