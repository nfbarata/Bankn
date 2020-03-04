import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { BanknService } from '../../../services/bankn.service';
import { AccountService } from '../../../services/account.service';
import { TransactionService } from '../../../services/transaction.service';
import { Account } from "../../../models/account";
import { Transaction, TransactionType, getTransactionType } from "../../../models/transaction";

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  form;
  formData;
  accounts:Account[];
  transactionTypes:String;
  transaction:Transaction = null;

  constructor(
    private eventsService: EventsService,
    private banknService: BanknService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.formData = {
      accountId:null,
      id:null,
      amount:null,
      day:null,
      month:null,
      year:null,
      typeId:null,
      entity:null,
      category:null,
      description:null
    }
    this.form = this.formBuilder.group(this.formData);
    this.transactionTypes = Object.values(TransactionType);
  }

  ngOnInit() {
    this.refreshAccounts();
    this.eventsService.accountsChange.subscribe(()=>this.refreshAccounts());
    this.route.paramMap.subscribe(params => {
      var accountId = params.get('accountId');
      if(accountId==null || accountId.trim().length==0){
        var selected = this.accountService.getSelectedAccounts();
        if(selected.length>0)
          accountId=selected[0].id;
      }
      if(accountId==null){
        accountId=this.accounts[0].id;
      }
      
      var transactionId:String = params.get('transactionId');
      var now = new Date();
      if(transactionId==null || transactionId.trim().length==0){
        this.formData = {
          accountId:accountId,
          id:null,
          amount:0,
          day:now.getDate(),
          month:now.getMonth()+1,
          year:now.getFullYear(),
          typeId:TransactionType.DEBIT.id,
          entity:null,
          category:null,
          description:""
        }
        this.form.setValue(this.formData);
      }else{
        var account=this.accountService.getAccount(accountId);
        this.transaction = this.transactionService.getTransaction(account,transactionId);
        this.formData = {
          accountId:accountId,
          id:transactionId,
          amount:this.transaction.amount.toUnit(),
          day:this.transaction.date.getDate(),
          month:this.transaction.date.getMonth()+1,
          year:this.transaction.date.getFullYear(),
          typeId:this.transaction.type.id,
          entity:this.transaction.entity,
          category:this.transaction.category,
          description:this.transaction.description
        };
        this.form.setValue(this.formData);
      } 
    });
  }

  refreshAccounts(){
    this.accounts = this.accountService.getAccounts();
  }

  onSubmit(data) {
    var account = this.accountService.getAccount(data.accountId);
    var amount = this.accountService.toDinero(account.referenceAmount.getCurrency(),data.amount);

    var date = new Date(0);//clear hours/minutes/seconds
    date.setFullYear(data.year, data.month-1, data.day);
    
    
    if(data.id==null){
      this.transactionService.createTransaction(
        account,
        amount,
        date,
        getTransactionType(data.typeId),
        data.entity,
        data.category,
        data.description
      );
    }else{
      this.transactionService.updateTransaction(
        account,
        this.transaction,
        amount,
        date,
        getTransactionType(data.typeId),
        data.entity,
        data.category,
        data.description
      );
    }
    this.form.reset();
    this.router.navigate(['/transactions']);
  }

  onDelete(accountId:String, transactionId:String){
    this.transactionService.deleteTransactionId(accountId, transactionId);
    this.location.back();
    //this.router.navigate(['/transactions']);
  }
}