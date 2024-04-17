import { Routes } from '@angular/router';
// import { logoutActivateGuard } from '../guards/logout-activate.guard';


export const loginRoutes: Routes = [
  {
    path: 'login',
    title: 'Login | Angular store Login',
    // canActivate: [logoutActivateGuard],
    loadComponent: () =>
      import('./store-login/store-login.component').then((m) => m.StoreLoginComponent),
  },
  {
    path: 'register',
    title: 'Register ',
    // canActivate: [logoutActivateGuard],
    loadComponent: () =>
      import('./store-register/store-register.component').then((m) => m.StoreRegisterComponent),
  },
];
