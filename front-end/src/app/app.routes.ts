import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'my-goals',
        loadComponent: () => import('./goals/my-goals/my-goals.component').then(m => m.MyGoalsComponent)
    },
    {
        path: 'public/:publicId',
        loadComponent: () => import('./goals/public-goal-view/public-goal-view.component').then( m => m.PublicGoalViewComponent)
    },
    {
        path: 'public',
        pathMatch: 'full',
        loadComponent: () => import('./goals/public-goals/public-goals.component').then(m => m.PublicGoalsComponent),

    }
];
