import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../services/account.service';
import  { Account } from "../../../../models/account";

@Component({
  selector: 'account-create-card',
  templateUrl: './account-create-card.component.html',
  styleUrls: ['./account-create-card.component.css']
})
export class AccountCreateCardComponent implements OnInit {

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

}