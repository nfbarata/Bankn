import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { AccountModule } from './modules/account/account.module';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: AccountListComponent },
      { path: 'accounts', component: AccountListComponent },
      { path: 'accounts/:accountId', component: AccountDetailsComponent },
      { path: 'account-create', component: AccountCreateComponent },
    ]),
    AccountModule
     ],
  declarations: [ AppComponent, MenuComponent, AccountCreateComponent, AccountListComponent, AccountDetailsComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppModule { }
