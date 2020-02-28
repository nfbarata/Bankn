import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AccountSelectCardComponent } from './account-select-card/account-select-card.component';
import { AccountCreateCardComponent } from './account-create-card/account-create-card.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileOpenCardComponent } from './file-open-card/file-open-card.component';
import { BanknCreateCardComponent } from './bankn-create-card/bankn-create-card.component';

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    AccountCreateCardComponent, AccountSelectCardComponent, FileUploadComponent, FileOpenCardComponent
  ],
  declarations: [
    AccountCreateCardComponent, AccountSelectCardComponent, FileUploadComponent, FileOpenCardComponent, BanknCreateCardComponent
  ]
})
export class SharedModule { }