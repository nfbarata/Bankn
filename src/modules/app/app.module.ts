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

import { AccountService } from '../../services/account.service';
import { FileService } from '../../services/file.service';

import { BanknComponent } from './bankn/bankn.component';
import { MenuComponent } from './menu/menu.component';
import { MenuSideComponent } from './menu-side/menu-side.component';
import { HomeComponent } from './home/home.component';

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
    BanknComponent, MenuComponent, HomeComponent, MenuSideComponent
  ],
  bootstrap: [ BanknComponent ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' }, 
    AccountService, FileService,
    { provide: LOCALE_ID, useValue: lang }
  ]
})
export class AppModule { 

  @Inject(LOCALE_ID) public locale: string
  
  constructor(
    private injector:Injector
  ){
    //console.log(this.injector.get(LOCALE_ID));
  }
}