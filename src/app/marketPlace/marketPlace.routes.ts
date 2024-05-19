import { Routes } from '@angular/router';
// import { logoutActivateGuard } from '../guards/logout-activate.guard';


export const marketPlaceRoutes: Routes = [
  {
    path: 'products',
    title: 'marketPlace | Productos',
    // canActivate: [logoutActivateGuard],
    loadComponent: () =>
      import('./market-place-product/market-place-product.component').then((m) => m.MarketPlaceProductComponent),
  },
  {
    path: 'products/form',
    loadComponent: () =>
        import('./market-place-form/market-place-form.component').then(
            (m) => m.MarketPlaceFormComponent
        )
  },
  {
    path: 'products/:id',
    loadComponent: () =>
        import('./market-place-product-detail/market-place-product-detail.component').then(
            (m) => m.MarketPlaceProductDetailComponent
        )
  },
//   {
//     path: 'register',
//     title: 'Register ',
//     // canActivate: [logoutActivateGuard],
//     loadComponent: () =>
//       import('./store-register/store-register.component').then((m) => m.StoreRegisterComponent),
//   },
];
