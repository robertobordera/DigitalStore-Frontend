import { Routes } from '@angular/router';

export const storeRoutes:Routes = [
    {
        path:'',
        title:'Productos | Digital Store',
        loadComponent:()=>
            import('./store-product/store-product.component').then(
                m => m.StoreProductComponent),
    },
    {
        path: ':id',
        loadComponent: () =>
            import('./store-detail-product/store-detail-product.component').then(
                (m) => m.StoreDetailProductComponent
            )
    }
]