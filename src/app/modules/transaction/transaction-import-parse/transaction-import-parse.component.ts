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
export class TransactionImportParseComponent implements OnInit, AfterViewInit {

  form;
  formData;
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
    this.formData = {
      importData:null,
      columnSeparator:"9",
      lineSeparator:"10",
      customColumnSeparator:"",
      customLineSeparator:""
    }
    this.form = this.formBuilder.group(this.formData);
  }
  ngAfterViewInit(): void {
    this.clearTable();
    this.fillTable(this.transactions);
  }
  ngOnInit() {
    this.transactions = this.transactionService.importTransactions;
    this.route.paramMap.subscribe(params => {
      this.accountId = params.get('accountId');
      
    });
  }

  clearTable(){
    this.renderer.setProperty(this.parsedData.nativeElement, 'innerHTML',""); 
  }

  fillTable(data){
    var headerRow = this.renderer.createElement('tr');
    this.renderer.appendChild(this.parsedData.nativeElement, headerRow);
    
    var headerCheckbox = this.renderer.createElement('th');
    this.renderer.setProperty(headerCheckbox, 'innerHTML',"Import?");
    
    this.renderer.appendChild(headerRow, headerCheckbox);
    
    data[0].forEach(column=>{
        var headerCell = this.renderer.createElement('th');
        this.renderer.appendChild(headerRow, headerCell);
        this.renderer.setProperty(headerCell, 'innerHTML',"TODO");
    });    
    
    data.forEach(row=>{
      
      var htmlRow = this.renderer.createElement('tr');
      this.renderer.appendChild(this.parsedData.nativeElement, htmlRow);

      var htmlCheckBoxCell = this.renderer.createElement('td');
      this.renderer.appendChild(htmlRow, htmlCheckBoxCell);
      
      var htmlCheckbox = this.renderer.createElement('input');
      this.renderer.setProperty(htmlCheckbox, 'type',"checkbox");
      this.renderer.setProperty(htmlCheckbox, 'checked',"tr");
      
      this.renderer.appendChild(htmlCheckBoxCell, htmlCheckbox);
      
      row.forEach(column=>{
        var htmlCell = this.renderer.createElement('td');
        this.renderer.appendChild(htmlRow, htmlCell);
        this.renderer.setProperty(htmlCell, 'innerHTML',column);
      });
    });
  }
}