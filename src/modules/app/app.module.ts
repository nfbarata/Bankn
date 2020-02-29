import { NgModule , LOCALE_ID, Injector, Inject  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';//from erro

import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localeEn, 'en-EN');
registerLocaleData(localePt, 'pt-PT');

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { FileService } from '../../services/file.service';
import { EventsService } from '../../services/events.service';
import { BanknService } from '../../services/bankn.service';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';

import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { MenuSideComponent } from './menu-side/menu-side.component';
import { HomeComponent } from './home/home.component';
import { BanknCreateComponent } from './bankn-create/bankn-create.component';

//TODO pass to object
const lang = (function(defaultValue:String) {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return defaultValue;
    }
    const wn = window.navigator as any;
    let lang = wn.languages ? wn.languages[0] : defaultValue;
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    return lang;
})('pt-PT');

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, ReactiveFormsModule,
    AppRoutingModule, SharedModule
  ],
  exports: [
    
  ],
  declarations: [ 
    MainComponent, MenuComponent, HomeComponent, MenuSideComponent, BanknCreateComponent
  ],
  bootstrap: [ MainComponent ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' }, 
    EventsService,FileService,
    BanknService, AccountService, TransactionService,
    { provide: LOCALE_ID, useValue: lang }
  ]
})
export class AppModule { 
 
  constructor(
    private injector:Injector
  ){  }
}