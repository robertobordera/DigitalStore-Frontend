import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'store',
    loadChildren: () =>
      import('./store/store.routes').then((m) => m.storeRoutes),
  },
  { path: '', redirectTo: '/store', pathMatch: 'full' },
  { path: '**', redirectTo: '/store' },
];
