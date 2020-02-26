import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import  { Account } from "../../../models/account";
//import currencies from '../../../assets/currencies.json';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountForm;
  currencies;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string
    ) { 
      var countryCode = locale.split("-")[0];
      const countries        = require('country-data').countries,
            currencies       = require('country-data').currencies,
            regions          = require('country-data').regions,
            languages        = require('country-data').languages,
            callingCountries = require('country-data').callingCountries;
      this.currencies = countries.all.filter(function(country){
        return country.currencies.length>0;
      });
      var country;
      for (let i = 0; i < countries.all.length; i++) {
        if (countries.all[i].alpha2 == countryCode) 
          country = countries[i];
      }
      console.log("country: "+country);
      this.accountForm = this.formBuilder.group({
          id:null,
          name:'',
          referenceValue:'',
          referenceValueCurrency:'',
          referenceDate:'',
          description:''
        });
      
      
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var accountId:String = params.get('accountId');
      console.log(accountId);
      if(accountId==null || accountId.trim().length==0){
        this.accountForm.reset();
      }else{
        var account:Account = this.accountService.getAccount(accountId);
        this.accountForm.id=account.id;
        this.accountForm.name=account.name;
        this.accountForm.referenceValue = account.referenceValue;
        this.accountForm.referenceDate = account.referenceDate;
        this.accountForm.description = account.description;
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