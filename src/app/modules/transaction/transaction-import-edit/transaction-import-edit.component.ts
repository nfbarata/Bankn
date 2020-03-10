import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Directive, ViewEncapsulation, Renderer2, Inject } from '@angular/core';
import { Location, DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { BanknService } from '../../../services/bankn.service';
import { AccountService } from '../../../services/account.service';
import { TransactionService } from '../../../services/transaction.service';
import { Account } from "../../../models/account";
import { Transaction, TransactionType, getTransactionType, ImportColumnType, getImportColumnType } from "../../../models/transaction";

@Component({
  selector: 'app-transaction-import-edit',
  templateUrl: './transaction-import-edit.component.html',
  styleUrls: ['./transaction-import-edit.component.css']
})
export class TransactionImportEditComponent implements OnInit {

  form;
  formData;
  account;
  transactions;
  document;

  constructor(
    private renderer: Renderer2,
    private eventsService: EventsService,
    private banknService: BanknService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    @Inject(DOCUMENT) document
  ) {
    this.document = document;
    this.formData = {
      importData:null,
    }
    this.form = this.formBuilder.group(this.formData);
   }

  ngOnInit() {
    this.account=null;
    this.transactions = this.transactionService.filterTransactions;
    this.route.paramMap.subscribe(params => {
      var accountId = params.get('accountId');
      this.account = this.accountService.getAccount(accountId);
      if(this.account==null){
        this.router.navigate(['']);
      }
      if(this.transactions.length==0){
        this.router.navigate(['/transactions/import/'+this.account.Id]);
      }
    });
  }

  onSubmit(data) {
    this.form.reset();
    this.accountService.selectAccount(this.account);
    this.router.navigate(['/transactions/'+this.account.id]);
  }
}