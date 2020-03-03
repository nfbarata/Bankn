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

    var firstAccount:Account = null;

    this.selectedAccounts = this.accountService.getSelectedAccounts();

    if(this.selectedAccounts.length>0){

      this.selectedAccounts.forEach(account => {

        //add meta balance for this account
        newTransactions = newTransactions.concat(this.applyBalanceToTransactions(account));

        //update firstReferenceTransaction
        if(firstAccount==null || firstAccount.referenceDate.getTime()>account.referenceDate.getTime()){
          firstAccount = account; 
        }
        if(!this.hasRealTransactions && account.transactions.length>0)
          this.hasRealTransactions = true;
      });

      //sort
      newTransactions = this.transactionService.sortTransactions(newTransactions);

      //update meta sum for all accounts and invert order
      var accumulatedBalance = this.accountService.toDinero(
        firstAccount.referenceAmount.getCurrency(),
        0
      );
      for (let i = newTransactions.length-1; i >=0 ; i--) {
        accumulatedBalance = accumulatedBalance.add(newTransactions[i].balanceAfter);
        //update balanceAfter with all accounts balance
        newTransactions[i].balanceAfter = accumulatedBalance;
      }

      this.transactions = newTransactions;
    }
  }

  refreshAccounts(){
    this.accounts = this.accountService.getAccounts();
    this.refreshData();
  }

  applyBalanceToTransactions(account:Account):Transaction[]{
    
    var accountTransactions = [].concat(account.transactions);

    var initialBalance = this.accountService.toDinero(
      account.referenceAmount.getCurrency(),
      account.referenceAmount.toUnit()
    );
    console.log(initialBalance);
    //calculate initial balance
    for (let i = accountTransactions.length-1; i >=0 ; i--) {
      if(accountTransactions[i].date.getTime()<=account.referenceDate.getTime()){
        switch(accountTransactions[i].type){
          case TransactionType.CREDIT:
            initialBalance = initialBalance.subtract(accountTransactions[i].amount);
            console.log(initialBalance);
          break;
          case TransactionType.DEBIT:
            initialBalance = initialBalance.add(accountTransactions[i].amount);
            console.log(initialBalance);
          break;
        }
      }
    }
    console.log(initialBalance);

    var accumulatedBalance = initialBalance;

    for (let i = accountTransactions.length-1; i >=0 ; i--) {
      accountTransactions[i].balanceBefore=accumulatedBalance;
      switch(accountTransactions[i].type){
        case TransactionType.CREDIT:
          accumulatedBalance = accumulatedBalance.add(accountTransactions[i].amount);
        break;
        case TransactionType.DEBIT:
          accumulatedBalance = accumulatedBalance.subtract(accountTransactions[i].amount);
        break;
      }
      accountTransactions[i].balanceAfter = accumulatedBalance;
    }
    return accountTransactions;
  }
}