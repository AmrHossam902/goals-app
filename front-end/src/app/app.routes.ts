import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/components/notfount.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: '',
        loadChildren: () => import('./goals/goals.routes').then( m => m.routes )
    },
    {
        path: '',
        loadChildren: () => import('./auth/auth.routes').then( m => m.routes)
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
