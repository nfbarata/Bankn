import { Output, EventEmitter, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Bankn } from "../models/bankn";
import { Account } from "../models/account";
import { EventsService} from "./events.service";
import { FileService} from "./file.service";

@Injectable({
  providedIn:'root'
})
export class BanknService implements OnInit{

  private bankn : Bankn = environment.bankn;

  constructor(
    private eventsService:EventsService,
    private fileService:FileService
  ) { }

  ngOnInit() {
    //test environment has bankn pre-configured
    if(this.bankn!=null)
      this.eventsService.banknChange.emit();
  }

  saveToFile():void{
    this.fileService.downloadJsonFile(this.bankn);
  }

  loadFromFile(): void{
    this.fileService.parseJsonFile((bankn:Bankn)=>{
      //clear (necessary? quickly...)
      while (this.bankn.accounts.length > 0) {
        while(this.bankn.accounts[this.bankn.accounts.length()-1].transactions.length>0){
            this.bankn.accounts[this.bankn.accounts.length()-1].transactions.pop();    
        }
        this.bankn.accounts.pop();
      }
      //fill
      this.bankn = bankn;

      this.eventsService.banknChange.emit();
      this.eventsService.accountsChange.emit();
      this.eventsService.accountSelectionChange.emit();
    });
  }

  addAccount(account:Account):void{
    this.bankn.accounts.push(account);
    this.eventsService.accountsChange.emit();
  }

  deleteAccountId(accountId:String){
    this.bankn.accounts = this.bankn.accounts.filter(function(account){
       return account.id != accountId;
    });
    this.eventsService.accountsChange.emit();
  }

  getAccounts() : Account[]{
    return this.bankn.accounts;
  }
}