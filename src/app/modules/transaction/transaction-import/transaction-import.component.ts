import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Directive } from '@angular/core';
import { Location} from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { BanknService } from '../../../services/bankn.service';
import { AccountService } from '../../../services/account.service';
import { TransactionService } from '../../../services/transaction.service';
import { Account } from "../../../models/account";
import { Transaction, TransactionType, getTransactionType } from "../../../models/transaction";
import { HighlightTag } from 'angular-text-input-highlight';

/*@Directive({selector: 'importData'})
export class TextArea {
  
}*/

@Component({
  selector: 'transaction-import',
  templateUrl: './transaction-import.component.html',
  styleUrls: ['./transaction-import.component.css']
})
export class TransactionImportComponent implements OnInit, AfterViewInit {
  text = 'Hello @mattlewis92 how are you today?\n\nLook I have a #different background color!\n\n@angular is pretty awesome!';
  /*tags: HighlightTag[] = [{
    indices: { start: 0, end: 12 },
    //cssClass: 'bg-blue',
    data: "a"//{ user: { id: 1 } }
  }];*/
   tags: HighlightTag[] = [];
  //@ViewChild(TextArea) importData;
  //@ViewChild('importData',{static:false}) importData2:ElementRef;

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
    /*console.log(this.importData);
    console.log(this.importData2);
    this.importData2.nativeElement.highlightWithinTextarea({
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


  addTags() {
    this.tags = [];
    const matchMentions = /(@\w+) ?/g;
    let mention;
    // tslint:disable-next-line
    while ((mention = matchMentions.exec(this.text))) {
      this.tags.push({
        indices: {
          start: mention.index,
          end: mention.index + mention[1].length
        },
        data: mention[1]
      });
    }

    const matchHashtags = /(#\w+) ?/g;
    let hashtag;
    // tslint:disable-next-line
    while ((hashtag = matchHashtags.exec(this.text))) {
      this.tags.push({
        indices: {
          start: hashtag.index,
          end: hashtag.index + hashtag[1].length
        },
        cssClass: 'bg-pink',
        data: hashtag[1]
      });
    }
  }
}