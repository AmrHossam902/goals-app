import { Routes } from '@angular/router';
import { authGuard } from '../common/guards/auth.guard';

export const routes: Routes = [
    {
        canActivate: [authGuard],
        path: 'my-goals',
        loadComponent: () => import('./my-goals/my-goals.component').then(m => m.MyGoalsComponent)
    },
    {
        path: 'public/:publicId',
        loadComponent: () => import('./public-goal-view/public-goal-view.component').then( m => m.PublicGoalViewComponent)
    },
    {
        path: 'public',
        pathMatch: 'full',
        loadComponent: () => import('./public-goals/public-goals.component').then(m => m.PublicGoalsComponent),

    }
];
