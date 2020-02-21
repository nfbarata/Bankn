import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MenuComponent } from './menu/menu.component';
import { AccountService } from './account.service';
import { AccountCreateComponent } from './account-create/account-create.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, MenuComponent, AccountCreateComponent ],
  bootstrap:    [ AppComponent ],
  providers: [AccountService]
})
export class AppModule { }
