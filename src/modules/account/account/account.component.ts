import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import  { Account } from "../../../models/account";
//import currencies from '../../../assets/currencies.json';

const countries        = require('country-data-list').countries,
      currencies       = require('country-data-list').currencies,
      regions          = require('country-data-list').regions,
      languages        = require('country-data-list').languages,
      callingCountries = require('country-data-list').callingCountries;

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountForm;
  formData;
  currencies;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string
    ) { 

      var currency = null;
      if(locale!=null && locale.split("-").length>0){
        var countryCode = locale.split("-")[0].toUpperCase();
        
        this.currencies = countries.all.filter(function(country){
          return country.currencies.length>0;
        });
        var country;
        for (let i = 0; i < this.currencies.length; i++) {
          if (this.currencies[i].alpha2 == countryCode) 
            country = this.currencies[i];
        }
        currency = country.currencies[0];
      }
      console.log(currency);
      this.formData = {
        id:null,
        name:'',
        referenceValue:0,
        referenceValueCurrency:currency,
        referenceDate:'2000-1-1',
        description:''
      }
      this.accountForm = this.formBuilder.group(this.formData);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var accountId:String = params.get('accountId');
      if(accountId==null || accountId.trim().length==0){
        this.accountForm.reset();
      }else{
        var account:Account = this.accountService.getAccount(accountId);
        this.formData = {
          id:account.id,
          name:account.name,
          referenceValue:account.referenceValue.ammount,
          referenceValueCurrency:account.referenceValue.currency,
          referenceDate:account.referenceDate,
          description:account.description
        };
        this.accountForm.setValue(this.formData);
        console.log("setted");
      } 
    });
  }

  onSubmit(data) {
    if(data.id==null){
      this.accountService.createAccount(
        data.name,
        data.description,
        Dinero({
          ammount:data.referenceValue, 
          currency:'EUR'}),//TODO currecy
          Date.parse(data.referenceDate)
      );
    }else{
      this.accountService.updateAccount(
        data.id,
        data.name,
        data.description,
        Dinero({
          ammount:data.referenceValue, 
          currency:'EUR'}),//TODO currecy
          Date.parse(data.referenceDate)
      );
    }
    this.accountForm.reset();
    this.router.navigate(['/accounts']);
  }
}