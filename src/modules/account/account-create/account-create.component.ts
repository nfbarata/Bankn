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
  accountService;

  constructor(
    private cartService: AccountService,
    private formBuilder: FormBuilder,
    ) { 
      this.createAccountForm = this.formBuilder.group(new Account());
  }

  ngOnInit() {
  }

  onSubmit(account) {
    // Process checkout data here
    this.accountService.createAccount(account);
    this.createAccountForm.reset();
  }
}