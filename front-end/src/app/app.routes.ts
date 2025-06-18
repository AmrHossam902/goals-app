import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'my-goals',
        loadComponent: () => import('./goals/my-goals/my-goals.component').then(m => m.MyGoalsComponent)
    },
    {
        path: 'public',
        loadComponent: () => import('./goals/public-goals/public-goals.component').then(m => m.PublicGoalsComponent)
    }
];
