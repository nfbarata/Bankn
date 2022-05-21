import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { AccountService } from '../../../services/account.service';
import { TransactionService } from '../../../services/transaction.service';
import { Account } from "../../../models/account";
import { Transaction,TransactionType } from "../../../models/transaction";
import { Dinero } from 'dinero.js';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  hasRealTransactions:boolean = false;
  transactions: Transaction[] = [];
  selectedAccounts : Account[] = [];
  accounts : Account[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private accountService: AccountService,
    private transactionService: TransactionService,
  ) { 
  }

  ngOnInit() {
    this.refreshAccounts();
    this.eventsService.accountSelectionChange.subscribe(()=>this.refreshData());
    this.eventsService.accountsChange.subscribe(()=>this.refreshAccounts());
    this.route.paramMap.subscribe(params => {
      var accountId = params.get('accountId');
      if(accountId==null || accountId.trim().length==0){
        //do nothing
      }else{
        this.accounts.forEach(account => {
          if(account.id==accountId){
            this.accountService.selectAccount(account);
          }else{
            if(account.selected){
              this.accountService.toggleAccount(account);
            }
          }
        });
      }
    });
  }

  refreshData(){

    //clear
    while(this.transactions.length>0)
      this.transactions.pop();
    this.hasRealTransactions = false;

    var newTransactions: Transaction[] = [];

    this.selectedAccounts = this.accountService.getSelectedAccounts();

    if(this.selectedAccounts.length>0){

      this.selectedAccounts.forEach(account => {
        newTransactions = newTransactions.concat(account.transactions);
        if(!this.hasRealTransactions && account.transactions.length>0)
          this.hasRealTransactions = true;
      });

      //get initial value
      var initialValue = AccountService.getInitialValueMultiple(this.selectedAccounts);

      //sort (from multiple accounts)
      TransactionService.sortTransactions(newTransactions);

      //calculate balances
      this.applyBalanceToTransactions(newTransactions, initialValue);
      
      this.transactions = newTransactions;
    }
  }

  refreshAccounts(){
    this.accounts = this.accountService.getAccounts();
    this.refreshData();
  }

  applyBalanceToTransactions(transactions:Transaction[], initialValue:Dinero):void{
    //update meta sum for all accounts and invert order
    var accumulatedBalance = Account.toDinero(
      initialValue.getCurrency(),
      initialValue.toUnit()
    );

    //add meta balance for this account
    for (let i = transactions.length-1; i >=0 ; i--) {
      transactions[i].balanceBefore=accumulatedBalance;
      switch(transactions[i].type){
        case TransactionType.CREDIT:
          accumulatedBalance = accumulatedBalance.add(transactions[i].amount);
        break;
        case TransactionType.DEBIT:
          accumulatedBalance = accumulatedBalance.subtract(transactions[i].amount);
        break;
      }
      transactions[i].balanceAfter = accumulatedBalance;
    }
  }
}