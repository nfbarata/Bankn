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
import { HomeComponent } from './shared/components/home/home.component';
import { AccountSelectComponent } from './shared/components/account-select/account-select.component';
import { AccountCreateComponent } from './shared/components/account-create/account-create.component';
import { MenuSideComponent } from './shared/components/menu-side/menu-side.component';

registerLocaleData(localeEn, 'en-EN');
registerLocaleData(localePt, 'pt-PT');

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [ 
    AppComponent, MenuComponent, HomeComponent, MenuSideComponent, AccountCreateComponent, AccountSelectComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' }, 
    AccountService, FileService
  ]
})
export class AppModule { }
