import { Component, OnInit } from '@angular/core';
import { FormBuilder  } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account-create',
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
      name: '',
      address: ''
    });
    }

  ngOnInit() {
  }

  onSubmit(data) {
    // Process checkout data here
    this.accountService.createAccount(data);
    this.createAccountForm.reset();

    console.warn('Your order has been submitted', data);
  }
}