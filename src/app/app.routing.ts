import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'

export const routes: Routes = [
//  { path: '', pathMatch: 'full', redirectTo: 'content' },
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