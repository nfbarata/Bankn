import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { BanknService } from '../../../services/bankn.service';
import { AccountService } from '../../../services/account.service';
import { TransactionService } from '../../../services/transaction.service';
import { Account } from "../../../models/account";
import { Transaction, TransactionType } from "../../../models/transaction";

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  form;
  formData;
  accounts:Account[];
  account:Account;
  transactionTypes:String;
  transaction:Transaction = null;

  constructor(
    private eventsService: EventsService,
    private banknService: BanknService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formData = {
      accountId:null,
      id:null,
      amount:null,
      day:null,
      month:null,
      year:null,
      typeId:null,
      toAccount:null,
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
      this.account = this.accountService.getAccount(accountId);
      var transactionId:String = params.get('transactionId');
      if(transactionId==null || transactionId.trim().length==0){
        this.formData = {
          accountId:this.account.id,
          id:null,
          amount:0,
          day:1,
          month:1,
          year:2000,
          typeId:TransactionType.DEBIT.id,
          toAccount:null,
          entity:null,
          category:null,
          description:""
        }
        this.form.setValue(this.formData);
      }else{
        this.transaction = this.transactionService.getTransaction(this.account,transactionId);
        this.formData = {
          accountId:this.account.id,
          id:transactionId,
          amount:this.transaction.amount.toUnit(),
          day:1,
          month:1,
          year:2000,
          typeId:this.transaction.type.id,
          toAccount:this.transaction.toAccount,
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
    var account = this.accountService.getAccount(data.account.id);
    var amount = this.accountService.toDinero(account.referenceAmount.currency,data.referenceAmount);

    var date = new Date(0);//clear hours/minutes/seconds
    date.setFullYear(data.referenceYear, data.referenceMonth-1, data.referenceDay);
    
    if(data.id==null){
      this.transactionService.createTransaction(
        account,
        amount,
        date,
        data.typeId,
        data.toAccount,
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
        data.typeId,
        data.toAccount,
        data.entity,
        data.category,
        data.description
      );
    }
    this.form.reset();
    this.router.navigate(['/transactions']);
  }
}