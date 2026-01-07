import { inject, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { SignIn } from './pages/sign-in/sign-in';
import { SignUp } from './pages/sign-up/sign-up';
import { Auth } from '../../core/services/auth';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { ResetPassword } from './pages/reset-password/reset-password';
import { VerifyEmail } from './pages/verify-email/verify-email';


// Prevent logged-in users from visiting auth pages
const redirectIfLoggedIn = () =>{
  const auth = inject(Auth);
  const router = inject(Router);

  if(auth.isLoggedIn()){
    router.navigate(['/']);
    return false;
  }
  return true;
}

const routes: Routes = [
  {path: 'sign-in', component: SignIn},
  {path: 'sign-up', component: SignUp},
  {path:'forgot-password', component: ForgotPassword},
  {path: 'reset-password', component: ResetPassword},
  {path:'verify-email', component: VerifyEmail},
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
