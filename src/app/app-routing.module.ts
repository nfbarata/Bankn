import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'content' },
  { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'accounts', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)},
]

@NgModule({
  imports: [
     RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }