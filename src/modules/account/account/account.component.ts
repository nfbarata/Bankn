import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    ) { 
      this.createAccountForm = this.formBuilder.group({
        id:null,
        name:'',
        referenceValue:'',
        referenceDate:'',
        description:''
      });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var accountId:String = params.get('accountId');
      if(accountId==null || accountId.trim().length==0){

      }else{
        var account:Account = this.accountService.getAccount(accountId);
          
      } 
      this.setAccount(params.get('accountId'));
    });
  }

  onSubmit(data) {
    //https://github.com/sarahdayan/dinero.js
    this.accountService.createAccount(
      data.name,
      data.description,
      Dinero({
        ammount:data.referenceValue, 
        currency:'EUR'}),//TODO currecy
        Date.parse(data.referenceDate)
    );
    this.createAccountForm.reset();
  }
}