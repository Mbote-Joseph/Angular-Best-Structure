import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { AuthModule } from './features/auth/auth-module';
import { MainLayout } from './layouts/main-layout/main-layout';
import { IndividualModule } from './features/individual/individual-module';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { AdminModule } from './features/admin/admin-module';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  // Auth area
  {
    path: 'auth',
    component: AuthLayout,
    loadChildren: () => import('./features/auth/auth-module').then(m => AuthModule),
  },
  // Individual Area (protected)
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    loadChildren: () => import('./features/individual/individual-module').then(m => IndividualModule),
  },
  // Admin Area (protected)
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard, roleGuard],
    loadChildren: () => import('./features/admin/admin-module').then(m => AdminModule),
  },
  // Redirect
  {
    path: '**',
    redirectTo: ''
  }
];
