import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  //@Input() accountId;
  account;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.setAccount(params.get('accountId'));
    });
  }

  ngOnChange(changes: SimpleChanges){
    const currentItem: SimpleChange = changes.item;
    console.log('prev value: ', currentItem.previousValue);
    console.log('got item: ', currentItem.currentValue);
    if(currentItem.currentValue){
      //this.scannedUPC = changes.item.currentValue.upc;
    }
    //this.suppliedQuantity = 0;
  }

  setAccount(accountId){
    this.account = this.accountService.getAccount(accountId);
  }
  
}