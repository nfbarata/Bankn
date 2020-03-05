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
  selector: 'transaction-import',
  templateUrl: './transaction-import.component.html',
  styleUrls: ['./transaction-import.component.css']
})
export class TransactionImportComponent implements OnInit {

  form;
  formData;

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
      description:null,
      columnSeparator:null,
      lineSeparator:null
    }
    this.form = this.formBuilder.group(this.formData);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var accountId = params.get('accountId');
    });
  }

  onSubmit(data) {
    this.form.reset();
    this.router.navigate(['/transactions']);
  }

}