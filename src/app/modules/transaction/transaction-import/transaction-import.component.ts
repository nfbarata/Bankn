import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Directive, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['./transaction-import.component.css'],
 // encapsulation: ViewEncapsulation.None
})
export class TransactionImportComponent implements OnInit, AfterViewInit {
  
  text = '';

  @ViewChild('importData',{static:false}) importData:ElementRef;
  @ViewChild('columnSeparator',{static:false}) columnSeparator:ElementRef;
  @ViewChild('lineSeparator',{static:false}) lineSeparator:ElementRef;
  @ViewChild('parsedData',{static:false}) parsedData:ElementRef;

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
      importData:null,
      columnSeparator:null,
      lineSeparator:null
    }
    this.form = this.formBuilder.group(this.formData);
  }

  ngAfterViewInit(): void {
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

  onInputChange(){
    var data = this.importData.nativeElement.value;
    console.log(this.lineSeparator.nativeElement.value);
    console.log(this.columnSeparator.nativeElement.value);
    //data.split()
    //this.parsedData

    
  }
}