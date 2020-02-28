import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { EventsService } from '../../../services/events.service';
import { Account } from "../../../models/account";

@Component({
  selector: 'transactions-import-card',
  templateUrl: './transactions-import-card.component.html',
  styleUrls: ['./transactions-import-card.component.css']
})
export class TransactionsImportCardComponent implements OnInit {
  
  accounts:Account[] = [];
  selectedAccount:Account=null;
  newSelectedAccount:String=null;

  constructor(
    private accountService: AccountService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.refreshData();
    this.refreshSelectionData()
    this.eventsService.accountsChange.subscribe(()=>this.refreshData());
    this.eventsService.accountSelectionChange.subscribe(()=>this.refreshSelectionData());
  }

  refreshData(){
    this.accounts = this.accountService.getAccounts(); 
  }

  refreshSelectionData(){
    var selectedAccounts = this.accountService.getSelectedAccounts();
    if(selectedAccounts.length>0){
      this.selectedAccount=selectedAccounts[0];
    }else{
      this.selectedAccount=this.accounts[0];
    }
    this.newSelectedAccount = this.selectedAccount.id;
  }

  accountChangeHandler (event: any) {
    this.newSelectedAccount = event.target.value;
  }

}