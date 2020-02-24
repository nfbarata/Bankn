import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';//from erro
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { HomeComponent } from './shared/components/home/home.component';

import { AccountService } from './shared/services/account.service';
import { FileService } from './shared/services/file.service';

registerLocaleData(localeFr, 'fr-FR');

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [ 
    AppComponent, MenuComponent, HomeComponent,
  ],
  bootstrap: [ AppComponent ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' }, 
    AccountService, FileService
  ]
})
export class AppModule { }
