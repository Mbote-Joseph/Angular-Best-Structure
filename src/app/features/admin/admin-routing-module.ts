import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Settings } from './pages/settings/settings';
import { Users } from './pages/users/users';

const routes: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'settings',
    component: Settings
  },
  {
    path: 'users',
    component: Users
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
