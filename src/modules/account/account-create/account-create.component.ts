import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import  { Account } from "../../../models/account";
import { Dinero } from 'dinero.js';

@Component({
  selector: 'account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {

  createAccountForm;
  accountService;

  constructor(
    private cartService: AccountService,
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
    // Process checkout data here
    this.accountService.createAccount(
      data.name,
      data.description,
      new Dinero(),
      data.referenceDate
      );
    this.createAccountForm.reset();
  }
}