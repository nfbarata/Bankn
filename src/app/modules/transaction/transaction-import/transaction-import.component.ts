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
  selector: 'transaction-import',
  templateUrl: './transaction-import.component.html',
  styleUrls: ['./transaction-import.component.css'],
 // encapsulation: ViewEncapsulation.None
})
export class TransactionImportComponent implements OnInit, AfterViewInit {
  submitDisabled: boolean=true;
  @ViewChild('importData',{static:false}) importData:ElementRef;
  @ViewChild('columnSeparator',{static:false}) columnSeparator:ElementRef;
  @ViewChild('lineSeparator',{static:false}) lineSeparator:ElementRef;
  @ViewChild('customColumnSeparator',{static:false}) customColumnSeparator:ElementRef;
  @ViewChild('customLineSeparator',{static:false}) customLineSeparator:ElementRef;
  @ViewChild('parsedData',{static:false}) parsedData:ElementRef;
  @ViewChild('submitHelpBlock',{static:false}) submitHelpBlock:ElementRef;

  form;
  formData;
  accountId;
  output;

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
    //https://www.rapidtables.com/web/html/html-codes.html
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
  }

  ngOnInit() {
    this.transactionService.importTransactions=[];
    this.route.paramMap.subscribe(params => {
      this.accountId = params.get('accountId');
    });
  }

  onSubmit(data) {
    this.transactionService.importTransactions=this.output;
    this.form.reset();
    this.router.navigate(['/transactions/import-parse/'+this.accountId]);
  }

  setMessage(message:string){
    this.renderer.setProperty(this.submitHelpBlock.nativeElement, 'innerHTML', message);
  }

  onInputChange(){

    this.clearTable();
    this.submitDisabled = true;

    var lineSeparator;
    var columnSeparator;
    if(this.lineSeparator.nativeElement.value==""){
      lineSeparator = this.customLineSeparator.nativeElement.value;
      if(lineSeparator.trim().length==0){
        this.setMessage('Insert some value at row separator');
        return;
      }
    }else{
      lineSeparator = String.fromCharCode(this.lineSeparator.nativeElement.value);
    }
    if(this.columnSeparator.nativeElement.value==""){
      columnSeparator = this.customColumnSeparator.nativeElement.value;
      if(columnSeparator.trim().length==0){
        this.setMessage('Insert some value at column separator');
        return;
      }
    }else{
      columnSeparator = String.fromCharCode(this.columnSeparator.nativeElement.value);
    }

    //i18n
    var data = this.importData.nativeElement.value;
    var lines = data.split(lineSeparator);
    if(lines.length>0 && lines[0].trim().length>0){
      var firstRow = lines[0].split(columnSeparator);
      var parsedData = [];
      if(firstRow.length>3){
        for(var i=0; i!=lines.length;i++){
          if(lines[i].trim().length!=0){//ignore empty lines
            var columns = lines[i].split(columnSeparator);
            if(columns.length!=firstRow.length){
              this.setMessage('Not all rows have the same number of columns');
              return;    
            }
            parsedData.push(columns);
          }
        }
        this.setMessage('Check the data below before import');
        this.fillTable(parsedData);
        this.submitDisabled = false;
      }else{
        this.setMessage('There should be at least 3 columns');
      }
    }else{
      this.setMessage('Enter some text');
    } 
  }

  clearTable(){
    this.output = null;
    this.renderer.setProperty(this.parsedData.nativeElement, 'innerHTML',""); 
  }

  fillTable(data){
    this.output = data;
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