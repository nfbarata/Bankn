import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  Directive,
  ViewEncapsulation,
  Renderer2,
  Inject
} from "@angular/core";
import { Location, DOCUMENT } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EventsService } from "../../../../services/events.service";
import { BanknService } from "../../../../services/bankn.service";
import { AccountService } from "../../../../services/account.service";
import { TransactionService } from "../../../../services/transaction.service";
import { Account } from "../../../../models/account";
import { Transaction } from "../../../../models/transaction";

@Component({
  selector: "app-transaction-import-edit",
  templateUrl: "./transaction-import-edit.component.html",
  styleUrls: ["./transaction-import-edit.component.css"]
})
export class TransactionImportEditComponent implements OnInit {
  form: FormGroup;
  formData;
  account: Account | null = null;
  transactions: Transaction[] | null = null;
  //document;
  submitDisabled: boolean = false;

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
    //@Inject(DOCUMENT) document: any
  ) {
    //this.document = document;
    this.formData = {
      importData: null
    };
    this.form = this.formBuilder.group(this.formData);
  }

  ngOnInit() {
    this.account = null;
    this.transactions = this.transactionService.filterTransactions;
    this.route.paramMap.subscribe(params => {
      var accountId = params.get("accountId");
      if(accountId!=null){
        this.account = this.accountService.getAccount(accountId);
        if (this.account == null) {
          this.router.navigate([""]);
        }else if (this.transactions == null || this.transactions.length == 0) {
          alert("No transactions to edit"); //i18n
          this.router.navigate(["/transactions/import/" + this.account.id]);
        }
      }
    });
  }

  onSubmit(data: any) {
    if(this.account!=null && this.transactions!=null){
      //TODO processar categorias/entities
      this.transactions.forEach(transaction => {
        if(this.account!=null)
          this.transactionService.createTransaction(
            this.account,
            transaction.amount,
            transaction.date,
            transaction.type,
            transaction.entityName,
            transaction.categoryName,
            transaction.receiptReference,
            transaction.description
          );
      });

      this.form.reset();
      this.accountService.selectAccount(this.account);
      this.router.navigate(["/transactions/" + this.account.id]);
    }else{
      console.error("No account selected")
      this.router.navigate(["/accounts"]);
    }
  }
}
