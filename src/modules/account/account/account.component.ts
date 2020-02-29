import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { BanknService } from '../../../services/bankn.service';
import { AccountService } from '../../../services/account.service';
import { Account } from "../../../models/account";
//import currencies from '../../../assets/currencies.json';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountForm;
  accountFormData;
  countries;
  
  constructor(
    private banknService: BanknService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ) { 
      this.accountFormData = {
        id:null,
        name:null,
        referenceAmount:null,
        referenceCountry:null,
        referenceDay:null,
        referenceMonth:null,
        referenceYear:null,
        description:null
      }
      this.accountForm = this.formBuilder.group(this.accountFormData);
  }

  ngOnInit() {
    this.countries = this.banknService.getCountries();
    this.route.paramMap.subscribe(params => {
      var accountId:String = params.get('accountId');
      if(accountId==null || accountId.trim().length==0){
        this.accountFormData = {
          id:null,
          name:'',
          referenceAmount:0,
          referenceCountry:this.banknService.getReferenceCountry(),
          referenceDay:'1',
          referenceMonth:'1',
          referenceYear:'2000',
          description:''
        }
        this.accountForm.setValue(this.accountFormData);
        
      }else{
        var account:Account = this.accountService.getAccount(accountId);

        this.accountFormData = {
          id:account.id,
          name:account.name,
          referenceAmount:account.referenceAmount.toUnit(),
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
    
    var amount: = this.accountService.toDinero(currency,data.referenceAmount);

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
    this.accountForm.reset();
    this.router.navigate(['/accounts']);
  }
}