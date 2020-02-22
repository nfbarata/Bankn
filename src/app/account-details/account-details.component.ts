import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { Input } from '@angular/input';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  //@Input() account;
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

}