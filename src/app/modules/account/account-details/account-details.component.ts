import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { Input } from '@angular/input';
import { AccountService } from './app/shared/services/account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  //@Input() account;
  account;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.account = this.accountService.getAccount(params.get('accountId'));
    });
  }

  addToCart(product) {
    //this.accountService.addToCart(product);
    //window.alert('Your product has been added to the cart!');
  }
}