import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Directive, ViewEncapsulation, Renderer2 } from '@angular/core';
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
  selector: 'app-transaction-import-parse',
  templateUrl: './transaction-import-parse.component.html',
  styleUrls: ['./transaction-import-parse.component.css']
})
export class TransactionImportParseComponent implements OnInit {

  accountId;
  transactions;
  @ViewChild('parsedData',{static:false}) parsedData:ElementRef;

  constructor(
    private renderer: Renderer2,
    private eventsService: EventsService,
    private banknService: BanknService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { 
    this.transactions = this.transactionService.importTransactions;
  }

  ngOnInit() {
    this.transactions = this.transactionService.importTransactions;
    this.route.paramMap.subscribe(params => {
      this.accountId = params.get('accountId');
      this.clearTable();
      this.fillTable(this.transactions);
    });
  }

  clearTable(){
    this.renderer.setProperty(this.parsedData.nativeElement, 'innerHTML',""); 
  }

  fillTable(data){
    data.forEach(row=>{
      var htmlRow = this.renderer.createElement('tr');
      this.renderer.appendChild(this.parsedData.nativeElement, htmlRow);
      row.forEach(column=>{
        var htmlCell = this.renderer.createElement('td');
        this.renderer.appendChild(htmlRow, htmlCell);
        this.renderer.setProperty(htmlCell, 'innerHTML',column);
      });
    });
  }
}