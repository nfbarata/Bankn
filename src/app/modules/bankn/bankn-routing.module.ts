import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitializedGuard } from "../../guards/initialized.guard";
import { BanknComponent } from "./bankn/bankn.component";

const routes: Routes = [
  { path: "", component: BanknComponent },
  {
    path: "current",
    component: BanknComponent,
    canActivate: [InitializedGuard]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanknRoutingModule { }