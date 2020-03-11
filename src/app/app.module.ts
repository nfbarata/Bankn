//angular dependecies
import { NgModule , LOCALE_ID, Injector, Inject, InjectionToken  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
//import { APP_BASE_HREF } from '@angular/common';//from erro
//external dependencies
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faStackOverflow, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
//localization
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localeEn, 'en-EN');
registerLocaleData(localePt, 'pt-PT');
//modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
//services
import { FileService } from './services/file.service';
import { EventsService } from './services/events.service';
import { BanknService } from './services/bankn.service';
import { AccountService } from './services/account.service';
import { TransactionService } from './services/transaction.service';
//guards
import { InitializedGuard } from './guards/initialized.guard';
//components
import { MainComponent } from './components/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuSideComponent } from './components/menu-side/menu-side.component';
import { HomeComponent } from './components/home/home.component';
import { BanknCreateComponent } from './components/bankn-create/bankn-create.component';

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

export let AppInjector: Injector;
export const ACCOUNT_SERVICE = new InjectionToken('AccountService');
export const TRANSACTION_SERVICE = new InjectionToken('TransactionService');

//declare var coinify: any;

@NgModule({
  imports: [ 
    BrowserModule, FormsModule, ReactiveFormsModule, FontAwesomeModule,
    AppRoutingModule, SharedModule
  ],
  exports: [
    
  ],
  declarations: [ 
    MainComponent, MenuComponent, HomeComponent, MenuSideComponent, BanknCreateComponent
  ],
  bootstrap: [ MainComponent ],
  providers: [
    //{provide: APP_BASE_HREF, useValue : '/' }, 
    {provide: LOCALE_ID, useValue: lang},
    EventsService,FileService,
    BanknService, AccountService, TransactionService,
    { provide: ACCOUNT_SERVICE, useExisting: AccountService },
    { provide: TRANSACTION_SERVICE, useExisting: TransactionService },
    InitializedGuard
  ]
})
export class AppModule { 
   
  constructor(
    private library: FaIconLibrary,
    private injector:Injector,
    private eventsService: EventsService,
    private fileService: FileService,
    private banknService:BanknService, 
    private accountService:AccountService, 
    private transactionService:TransactionService
  ){  
    AppInjector=this.injector;
    library.addIcons(
      faSquare, 
      faCheckSquare, 
      farSquare, 
      farCheckSquare, 
      faStackOverflow, 
      faGithub, 
      faMedium
    );
  }
}