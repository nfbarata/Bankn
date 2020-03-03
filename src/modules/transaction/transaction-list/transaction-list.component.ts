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
      var balanceUp = this.accountService.toDinero(
        firstAccount.referenceAmount.getCurrency(),
        0
      );
      for (let i = newTransactions.length-1; i >=0 ; i--) {
        balanceUp = balanceUp.add(newTransactions[i].balanceAfter);
        newTransactions[i].balanceAfter = balanceUp;
      }

      this.transactions = newTransactions;
    }
  }

  refreshAccounts(){
    this.accounts = this.accountService.getAccounts();
    this.refreshData();
  }

  applyBalanceToTransactions(account:Account):Transaction[]{
    var balanceUp = this.accountService.toDinero(
      account.referenceAmount.getCurrency(),
      account.referenceAmount.toUnit()
    );
    var balanceDown = this.accountService.toDinero(
      account.referenceAmount.getCurrency(),
      account.referenceAmount.toUnit()
    );
    
    var accountTransactions = [].concat(account.transactions);

    for (let i = accountTransactions.length-1; i >=0 ; i--) {
      if(accountTransactions[i].date.getTime()>account.referenceDate.getTime()){
        //after referenceAmount
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
        //before referenceAmount
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
    return accountTransactions;
  }
}