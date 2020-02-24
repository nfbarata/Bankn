import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { HomeComponent } from './shared/components/home/home.component';

export const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'content' },
  { path: '', component: HomeComponent },
  {
    path: 'accounts',
    loadChildren: './modules/account/account.module#AccountModule',
  },
  {
    path: 'transactions',
    loadChildren: './modules/transaction/transaction.module#TransactionModule',
  }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes)