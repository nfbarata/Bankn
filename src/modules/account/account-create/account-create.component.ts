import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import  { Account } from "../../../models/account";

@Component({
  selector: 'account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {

  createAccountForm;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    ) { 
      this.createAccountForm = this.formBuilder.group({
        name:'',
        referenceValue:'',
        referenceDate:'',
        description:''
      });

  }

  ngOnInit() {
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