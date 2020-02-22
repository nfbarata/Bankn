import { Component, OnInit } from '@angular/core';
import { accounts } from '../accounts';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts = accounts;
  constructor() { }

  ngOnInit() {
  }

}