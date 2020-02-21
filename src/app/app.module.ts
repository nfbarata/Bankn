import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AccountService } from './account.service';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AccountListComponent },
    ]) ],
  declarations: [ AppComponent, MenuComponent, AccountCreateComponent, AccountListComponent, AccountDetailsComponent ],
  bootstrap:    [ AppComponent ],
  providers: [AccountService]
})
export class AppModule { }
