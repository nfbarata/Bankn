import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import  { Account } from "../../../models/account";

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  createAccountForm;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    ) { 
      
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params:ParamMap => {
      var accountId:String = params.get('accountId');
      if(accountId==null || accountId.trim().length==0){
        this.createAccountForm = this.formBuilder.group({
          id:null,
          name:'',
          referenceValue:'',
          referenceValueCurrency:'',
          referenceDate:'',
          description:''
        });
      }else{
        var account:Account = this.accountService.getAccount(accountId);
        this.createAccountForm.id=account.id;
        this.createAccountForm.name=account.name;
        this.createAccountForm.referenceValue = account.referenceValue;
        this.createAccountForm.referenceDate = account.referenceDate;
        this.createAccountForm.description = account.description;
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
    this.createAccountForm.reset();
    this.router.navigate(['/accounts']);
  }
}