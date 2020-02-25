import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSelectCardComponent } from './account-select-card/account-select-card.component';
import { AccountCreateCardComponent } from './account-create-card/account-create-card.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    AccountCreateCardComponent, AccountSelectCardComponent, FileUploadComponent
  ],
  declarations: [
    AccountCreateCardComponent, AccountSelectCardComponent, FileUploadComponent
  ]
})
export class SharedModule { }