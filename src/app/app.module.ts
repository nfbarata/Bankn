import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';

//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { TooltipModule } from 'ngx-bootstrap/tooltip';
//import { ModalModule } from 'ngx-bootstrap/modal';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { AccountService } from './services/account.service';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

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
    //NgbModule
    //BsDropdownModule.forRoot(),
    //TooltipModule.forRoot(),
    //ModalModule.forRoot()
     ],
  declarations: [ AppComponent, MenuComponent, AccountCreateComponent, AccountListComponent, AccountDetailsComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' },AccountService]
})
export class AppModule { }
