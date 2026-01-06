import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Profile } from './pages/profile/profile';

const routes: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'profile',
    component: Profile
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualRoutingModule { }
