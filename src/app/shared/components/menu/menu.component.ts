import { Component, OnInit } from '@angular/core';
import { AccountService } from '/app/shared/services/account.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  accounts = [];
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.accounts = this.accountService.getAccounts();  
  }

}