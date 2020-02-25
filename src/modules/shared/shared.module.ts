import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSelectCardComponent } from './account-select-card/account-select-card.component';
import { AccountCreateCardComponent } from './account-create-card/account-create-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    AccountCreateCardComponent, AccountSelectCardComponent
  ],
  declarations: [
    AccountCreateCardComponent, AccountSelectCardComponent
  ]
})
export class SharedModule { }