import { Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { centralResolver } from './resolvers/central-resolver';
import { countryAccessGuard } from './guards/country-access-guard';
import { countryLeaveGuard } from './guards/country-leave-guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./home/home').then(m => m.Home),
        resolve: {
            init: centralResolver,
        },
    },
    {
        path: 'live',
        pathMatch: 'prefix',
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard),
        resolve: {
            init: centralResolver,
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                loadComponent: () => import('./dashboard/empty-dashboard/empty-dashboard').then(m => m.EmptyDashboard),
            },
            {
                path: ':code',
                runGuardsAndResolvers: 'paramsChange',
                canActivate: [countryAccessGuard],
                canDeactivate: [countryLeaveGuard],
                loadComponent: () => import('./dashboard/country-dashboard/country-dashboard').then(m => m.CountryDashboard),
            }
        ],
    },
    {
        path: 'terms-of-use',
        pathMatch: 'full',
        resolve: {
            init: centralResolver,
        },
        loadComponent: () => import('./terms/terms').then(m => m.Terms),
    },
    {
        path: 'privacy-policy',
        pathMatch: 'full',
        resolve: {
            init: centralResolver,
        },
        loadComponent: () => import('./privacy/privacy').then(m => m.Privacy),
    },
    {
        path: '**',
        redirectTo: '/',
    }
];
