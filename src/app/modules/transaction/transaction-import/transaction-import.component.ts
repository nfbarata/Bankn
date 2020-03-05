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
declare var $: any;
@Component({
  selector: 'transaction-import',
  templateUrl: './transaction-import.component.html',
  styleUrls: ['./transaction-import.component.css'],
 / encapsulation: ViewEncapsulation.None
})
export class TransactionImportComponent implements OnInit, AfterViewInit {
  text = 'Hello @mattlewis92 how are you today?\n\nLook I have a #different background color!\n\n@angular is pretty awesome!';

  @ViewChild('importData',{static:false}) importData:ElementRef;

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
    //console.log(this.importData);
    console.log(`jQuery version: ${$.fn.jquery}`);
    console.log($('importData'));
    $('.importData').highlightWithinTextarea({
        highlight: "aa" // string, regexp, array, function, or custom object
    });
    /*this.importData.nativeElement.highlightWithinTextarea({
      highlight: "aa" // string, regexp, array, function, or custom object
    });*/
  }

  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      var accountId = params.get('accountId');
    });
/*
    $('description').highlightWithinTextarea({
      highlight: "aa" // string, regexp, array, function, or custom object
    });*/
  }

  onSubmit(data) {
 
    this.form.reset();
    this.router.navigate(['/transactions']);
  }
}