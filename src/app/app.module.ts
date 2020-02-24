import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';//from erro

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { HomeComponent } from './shared/components/home/home.component';

import { AccountService } from './shared/services/account.service';

//import { AccountModule } from './modules/account/account.module';
//import { AccountCreateComponent } from './modules/account/account-create/account-create.component';
//import { AccountListComponent } from './modules/account/account-list/account-list.component';
//import { AccountDetailsComponent } from './modules/account/account-details/account-details.component';


@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [ 
    AppComponent, MenuComponent, HomeComponent,
  //  AccountCreateComponent, AccountListComponent, AccountDetailsComponent 
    ],
  bootstrap: [ AppComponent ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }, AccountService]
})
export class AppModule { }
