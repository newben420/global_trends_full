import { Routes } from '@angular/router';
import { centralResolver } from './resolvers/central-resolver';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'prefix',
        resolve: {
            init: centralResolver,
        },
        children: [
            {
                path: '',
                pathMatch:'full',
                loadComponent: () => import('./home/home').then(m => m.Home),
            },
            {
                path: '**',
                redirectTo: '/',
            }
        ]
    }
];
