import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'store',
    loadChildren: () =>
      import('./store/store.routes').then((m) => m.storeRoutes),
  },
  {
    path: 'auth',
    loadChildren:()=>
      import('./auth/auth.routes').then((m)=>m.loginRoutes)
  },
  {
    path: 'marketPlace',
    loadChildren:()=>
      import('./marketPlace/marketPlace.routes').then((m)=>m.marketPlaceRoutes)
  },
  {
    path: 'user',
    loadChildren:()=>
      import('./users/users.routes').then((m)=>m.usersRoutes)
  },
  { path: '', redirectTo: '/store', pathMatch: 'full' },
  { path: '**', redirectTo: '/store' },
];
