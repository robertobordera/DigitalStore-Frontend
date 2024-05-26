import { Routes } from '@angular/router';

export const usersRoutes:Routes = [
    {
        path:'account',
        title:'Account | Digital Store',
        loadComponent:()=>
            import('./account/account.component').then(
                m => m.AccountComponent),
    },
    {
        path:'account/:id',
        title:'Account | Digital Store',
        loadComponent:()=>
            import('./account/account.component').then(
                m => m.AccountComponent),
    },
    {
        path:'settings',
        title:'Settings | Digital Store',
        loadComponent:()=>
            import('./settings/settings.component').then(
                m => m.SettingsComponent),
    },
    {
        path:'favorites',
        title:'favorites | Digital Store',
        loadComponent:()=>
            import('./favorites/favorites.component').then(
                m => m.FavoritesComponent),
    },
    {
        path:'favorites/:id',
        title:'favorites | Digital Store',
        loadComponent:()=>
            import('./favorites/favorites.component').then(
                m => m.FavoritesComponent),
    },
    {
        path:'myProducts',
        title:'myProducts | Digital Store',
        loadComponent:()=>
            import('./my-products/my-products.component').then(
                m => m.MyProductsComponent),
    },
    {
        path:'mail',
        title:'myMail | Digital Store',
        loadComponent:()=>
            import('./mail/mail.component').then(
                m => m.MailComponent),
    },
    {
        path:'resenya',
        title:'myMail | Digital Store',
        loadComponent:()=>
            import('./resenya/resenya.component').then(
                m => m.ResenyaComponent),
    },{
        path:'opinions',
        title:'myMail | Digital Store',
        loadComponent:()=>
            import('./opinions/opinions.component').then(
                m => m.OpinionsComponent),
    }
]