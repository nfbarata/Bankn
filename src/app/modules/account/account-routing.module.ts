import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AccountComponent } from "./components/account/account.component";
import { AccountListComponent } from "./components/account-list/account-list.component";

const routes: Routes = [
  { path: "", component: AccountListComponent },
  { path: "account", component: AccountComponent },
  { path: "account/:accountId", component: AccountComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule {}
