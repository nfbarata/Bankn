import { Component, OnInit, NgZone } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';
import  { Account } from "../../../shared/models/account";
import  { Transaction } from "../../../shared/models/transaction";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions : Transaction[];

  constructor(
    private accountService: AccountService,
    private zone:NgZone
  ) { 
  }

  ngOnInit() {   

    this.transactions = this.accountService.getTransactions(this.accountService.getSelectedAccounts());
    this.accountService.accountSelectionChange.subscribe(()=>{
      console.log("event catched");
      this.zone.run(()=>{
        console.log("event zoned");
      
        this.transactions = this.accountService.getTransactions(this.accountService.getSelectedAccounts());
      })
    });
  }
}