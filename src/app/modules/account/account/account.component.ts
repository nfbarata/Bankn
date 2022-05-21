import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { BanknService } from "../../../services/bankn.service";
import { AccountService } from "../../../services/account.service";
import { Account } from "../../../models/account";

@Component({
  selector: "account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent implements OnInit {
  
  form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(),
    referenceAmount: new FormControl(),
    referenceCountry: new FormControl(),
    referenceDay: new FormControl(),
    referenceMonth: new FormControl(),
    referenceYear: new FormControl(),
    description: new FormControl()
  });
  countries: any;//used on UI

  constructor(
    private banknService: BanknService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.countries = this.banknService.getCountries();
    this.route.paramMap.subscribe(params => {
      var accountId = params.get("accountId");

      if (accountId == null || accountId.trim().length == 0) {
        this.form.setValue({
          id: null,
          name: "Main",
          referenceAmount: 0,
          referenceCountry: this.banknService.getReferenceCountry(),
          referenceDay: "1",
          referenceMonth: "1",
          referenceYear: "2000",
          description: ""
        });
      } else {
        var account = this.accountService.getAccount(accountId);
        if(account!=null){
          this.form.setValue({
            id: account.id,
            name: account.name,
            referenceAmount: account.referenceAmount.toUnit(),
            referenceCountry: account.referenceCountry,
            referenceDay: account.referenceDate.getDate(),
            referenceMonth: account.referenceDate.getMonth() + 1,
            referenceYear: account.referenceDate.getFullYear(),
            description: account.description
          });
        }
      }
    });
  }

  onSubmit() {
    var currency = this.banknService.getCurrencyOfCountry(
      this.form.controls["referenceCountry"].value
    );
    var amount = Account.toDinero(currency, this.form.controls["referenceAmount"].value);

    var date = new Date(0); //clear hours/minutes/seconds
    date.setFullYear(
      this.form.controls["referenceYear"].value,
      this.form.controls["referenceMonth"].value - 1,
      this.form.controls["referenceDay"].value
    );

    if (this.form.controls["id"].value == null) {
      this.accountService.createAccount(
        this.form.controls["name"].value,
        this.form.controls["description"].value,
        date,
        this.form.controls["referenceCountry"].value,
        amount //.toObject(),
      );
    } else {
      this.accountService.updateAccount(
        this.form.controls["id"].value,
        this.form.controls["name"].value,
        this.form.controls["description"].value,
        amount, //.toObject(),
        date,
        this.form.controls["referenceCountry"].value
      );
    }
    this.form.reset();
    this.router.navigate([""]);
  }

  onDelete(accountId: string) {
    this.accountService.deleteAccountId(accountId);
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
