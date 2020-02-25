import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';//from erro
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';

import { AccountService } from './shared/services/account.service';
import { FileService } from './shared/services/file.service';

import { AppComponent } from './app.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { MenuSideComponent } from './shared/components/menu-side/menu-side.component';
import { HomeComponent } from './shared/components/home/home.component';
import { AccountSelectCardComponent } from './shared/components/account-select-card/account-select-card.component';
import { AccountCreateCardComponent } from './shared/components/account-create-card/account-create-card.component';

registerLocaleData(localeEn, 'en-EN');
registerLocaleData(localePt, 'pt-PT');

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [ 
    AppComponent, MenuComponent, HomeComponent, MenuSideComponent, AccountCreateCardComponent, AccountSelectCardComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' }, 
    AccountService, FileService
  ]
})
export class AppModule { }
