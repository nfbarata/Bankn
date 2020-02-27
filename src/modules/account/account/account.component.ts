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
  accountFormData;
  countries;
  defaultCountryCode:String='null';

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string
    ) { 
      if(locale!=null && locale.split("-").length>0){
        this.defaultCountryCode = locale.split("-")[0].toUpperCase();
        
        this.countries = countries.all.filter(function(country){
          return country.currencies.length>0;
        });
        /*var country;
        for (let i = 0; i < this.currencies.length; i++) {
          if (this.currencies[i].alpha2 == this.defaultCountryCode) 
            country = this.currencies[i];
        }
        var defaultCurrency = country.currencies[0];*/
      }
      console.log("default countryCode: "+this.defaultCountryCode);
      this.accountFormData = {
        id:null,
        name:null,
        referenceValue:null,
        referenceCountry:null,
        referenceDay:null,
        referenceMonth:null,
        referenceYear:null,
        description:null
      }
      this.accountForm = this.formBuilder.group(this.accountFormData);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var accountId:String = params.get('accountId');
      if(accountId==null || accountId.trim().length==0){
        this.accountFormData = {
          id:null,
          name:'',
          referenceValue:0,
          referenceCountry:this.defaultCountryCode,
          referenceDay:'1',
          referenceMonth:'1',
          referenceYear:'2000',
          description:''
        }
        this.accountForm.setValue(this.accountFormData);
        
      }else{
        var account:Account = this.accountService.getAccount(accountId);
        var country;
        for (let i = 0; i < this.countries.length; i++) {
          if (this.countries[i].currencies[0] == account.referenceValue.currency) 
            country = this.countries[i];
        }
        this.accountFormData = {
          id:account.id,
          name:account.name,
          referenceValue:Dinero(account.referenceValue).toUnit(),
          referenceCountry:account.referenceCountry,
          referenceDay:account.referenceDate.getDate(),
          referenceMonth:account.referenceDate.getMonth()+1,
          referenceYear:account.referenceDate.getFullYear(),
          description:account.description
        };
        this.accountForm.setValue(this.accountFormData);
      } 
    });
  }

  onSubmit(data) {
    var country;
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].alpha2 == data.referenceCountry) 
        country = this.countries[i];
    }
    var currency = country.currencies[0];
    var referenceValue = Dinero({currency:currency});
    var value = data.referenceValue * Math.pow(10,referenceValue.getPrecision());
    var amount = Dinero({amount:value,currency:currency});
    var date = new Date();
    date.setFullYear(data.referenceYear, data.referenceMonth-1, data.referenceDay);
    if(data.id==null){
      this.accountService.createAccount(
        data.name,
        data.description,
        amount.toObject(),
        date,
        data.referenceCountry
      );
    }else{
      this.accountService.updateAccount(
        data.id,
        data.name,
        data.description,
        amount.toObject(),
        date,
        data.referenceCountry
      );
    }
    this.accountForm.reset();
    this.router.navigate(['/accounts']);
  }
}