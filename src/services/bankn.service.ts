import { Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { Bankn } from "../models/bankn";
import { Account } from "../models/account";
import { EventsService} from "./events.service";
import { FileService} from "./file.service";

@Injectable({
  providedIn:'root'
})
export class BanknService {

  private bankn : Bankn=null;

  constructor(
    private eventsService:EventsService,
    private fileService:FileService
  ) {  }

  saveToFile():void{
    this.fileService.downloadJsonFile(this.bankn);
  }

  loadFromFile(): void{
    this.fileService.parseJsonFile((bankn:Bankn)=>{
      this.loadFromJson(bankn);    
    });
  }

  private clear():void{
    if(this.bankn!=null){
      //(necessary? quickly...)
      while(this.bankn.accounts.length > 0) {
        while(this.bankn.accounts[this.bankn.accounts.length()-1].transactions.length>0){
            this.bankn.accounts[this.bankn.accounts.length()-1].transactions.pop();    
        }
        this.bankn.accounts.pop();
      }
    }
  }

  loadFromJson(bankn:Bankn):void{
    this.clear();
    this.bankn = bankn;
    this.eventsService.banknChange.emit();
    this.eventsService.accountsChange.emit();
    this.eventsService.accountSelectionChange.emit();
    console.log("emite");
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
    if(this.bankn==null)
      return [];
    return this.bankn.accounts;
  }
}