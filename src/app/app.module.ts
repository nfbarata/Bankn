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

registerLocaleData(localeEn, 'en-EN');
registerLocaleData(localePt, 'pt-PT');

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
  ],
  declarations: [ 
    AppComponent, MenuComponent, HomeComponent, MenuSideComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' }, 
    AccountService, FileService
  ]
})
export class AppModule { }
