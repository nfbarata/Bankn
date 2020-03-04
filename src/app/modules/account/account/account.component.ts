import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';

import { BanknService } from '../../../..services/bankn.service';
import { AccountService } from '../../../services/account.service';
import { Account } from "../../../models/account";

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  form;
  formData;
  countries;
  
  constructor(
    private banknService: BanknService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
    ) { 
      this.formData = {
        id:null,
        name:null,
        referenceAmount:null,
        referenceCountry:null,
        referenceDay:null,
        referenceMonth:null,
        referenceYear:null,
        description:null
      }
      this.form = this.formBuilder.group(this.formData);
  }

  ngOnInit() {
    this.countries = this.banknService.getCountries();
    this.route.paramMap.subscribe(params => {
      var accountId:String = params.get('accountId');
      if(accountId==null || accountId.trim().length==0){
        this.formData = {
          id:null,
          name:'Main',
          referenceAmount:0,
          referenceCountry:this.banknService.getReferenceCountry(),
          referenceDay:'1',
          referenceMonth:'1',
          referenceYear:'2000',
          description:''
        }
        this.form.setValue(this.formData);
        
      }else{
        var account:Account = this.accountService.getAccount(accountId);

        this.formData = {
          id:account.id,
          name:account.name,
          referenceAmount:account.referenceAmount.toUnit(),
          referenceCountry:account.referenceCountry,
          referenceDay:account.referenceDate.getDate(),
          referenceMonth:account.referenceDate.getMonth()+1,
          referenceYear:account.referenceDate.getFullYear(),
          description:account.description
        };
        this.form.setValue(this.formData);
      } 
    });
  }

  onSubmit(data) {
    var currency = this.banknService.getCurrencyOfCountry(data.referenceCountry);
    
    var amount = this.accountService.toDinero(currency,data.referenceAmount);

    var date = new Date(0);//clear hours/minutes/seconds
    date.setFullYear(data.referenceYear, data.referenceMonth-1, data.referenceDay);
    
    if(data.id==null){
      this.accountService.createAccount(
        data.name,
        data.description,
        amount,//.toObject(),
        date,
        data.referenceCountry
      );
    }else{
      this.accountService.updateAccount(
        data.id,
        data.name,
        data.description,
        amount,//.toObject(),
        date,
        data.referenceCountry
      );
    }
    this.form.reset();
    this.router.navigate(['/accounts']);
  }

  onDelete(accountId:String){
    this.accountService.deleteAccountId(accountId);
    this.location.back();
  }
}