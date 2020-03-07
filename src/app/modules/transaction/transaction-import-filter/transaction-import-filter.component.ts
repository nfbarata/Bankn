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
  selector: 'app-transaction-import-filter',
  templateUrl: './transaction-import-filter.component.html',
  styleUrls: ['./transaction-import-filter.component.css']
})
export class TransactionImportFilterComponent implements OnInit, AfterViewInit {

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
    /**if(this.transactions.length>0){
      this.clearTable();
      this.fillTable(this.transactions);
    }*/
  }
  ngOnInit() {
    this.transactions = this.transactionService.importTransactions;
    if(this.transactions.length==0){
      this.router.navigate(['/transactions/import/'+this.accountId]);
    }
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
      
        var select = this.renderer.createElement('select');
        this.renderer.addClass(select, "form-control");
      
        this.renderer.appendChild(headerCell, select);
      
        this.renderer.appendChild(headerRow, headerCell);
    });    
    
    var i = 0;
    data.forEach((row, index)=>{
      
      var htmlRow = this.renderer.createElement('tr');
      this.renderer.appendChild(this.parsedData.nativeElement, htmlRow);

      var htmlCheckBoxCell = this.renderer.createElement('td');
      this.renderer.appendChild(htmlRow, htmlCheckBoxCell);
      
      var htmlCheckboxDiv = this.renderer.createElement('div');
      this.renderer.addClass(htmlCheckboxDiv, "custom-control");
      this.renderer.addClass(htmlCheckboxDiv, "custom-checkbox");
      this.renderer.addClass(htmlCheckboxDiv, "text-center");

      var htmlCheckbox = this.renderer.createElement('input');
      this.renderer.setProperty(htmlCheckbox, 'id',"checkbox"+index);
      this.renderer.setProperty(htmlCheckbox, 'type',"checkbox");
      this.renderer.setProperty(htmlCheckbox, 'checked',"true");
      this.renderer.addClass(htmlCheckbox, "custom-control-input");
      
      var htmlCheckboxLabel = this.renderer.createElement('label');
      this.renderer.setAttribute(htmlCheckboxLabel, 'for',"checkbox"+index);
      this.renderer.addClass(htmlCheckboxLabel, "custom-control-label");
      
      this.renderer.appendChild(htmlCheckboxDiv, htmlCheckbox);
      this.renderer.appendChild(htmlCheckboxDiv, htmlCheckboxLabel);
      
      this.renderer.appendChild(htmlCheckBoxCell, htmlCheckboxDiv);
      
      row.forEach(column=>{
        var htmlCell = this.renderer.createElement('td');
        this.renderer.appendChild(htmlRow, htmlCell);
        this.renderer.setProperty(htmlCell, 'innerHTML',column);
      });
    });
  }
}