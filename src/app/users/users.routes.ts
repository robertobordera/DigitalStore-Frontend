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
        path:'settings',
        title:'Settings | Digital Store',
        loadComponent:()=>
            import('./settings/settings.component').then(
                m => m.SettingsComponent),
    }
]