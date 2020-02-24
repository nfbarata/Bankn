import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'content' },
  { path: 'content', component: ContentComponent },
  {
    path: 'accounts',
    loadChildren: './modules/accounts/account.module#AccountModule',
  },
  {
    path: 'transactions',
    loadChildren: './modules/transactions/transaction.module#TransactionModule',
  }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes)