import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import  { Account } from "../../models/account";

@Component({
  selector: 'account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

}