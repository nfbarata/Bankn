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
        referenceDate:null,
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
          referenceDate:'2000-1-1',
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
          referenceValue:account.referenceValue.toUnit(),
          referenceCountry:account.referenceCountry,
          referenceDate:account.referenceDate,
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
    if(data.id==null){
      this.accountService.createAccount(
        data.name,
        data.description,
        Dinero.fromUnit(data.referenceValue,{currency:country.currencies[0]}),
        Date.parse(data.referenceDate),
        data.referenceCountry
      );
    }else{
      this.accountService.updateAccount(
        data.id,
        data.name,
        data.description,
        Dinero.fromUnit(data.referenceValue,{currency:country.currencies[0]}),
        Date.parse(data.referenceDate),
        data.referenceCountry
      );
    }
    this.accountForm.reset();
    this.router.navigate(['/accounts']);
  }
}