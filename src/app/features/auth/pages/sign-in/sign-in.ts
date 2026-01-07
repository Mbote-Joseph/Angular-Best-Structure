import { Component, inject } from '@angular/core';
import { Auth } from '../../../../core/services/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { safeReturnUrl } from '../../auth.utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  private auth = inject(Auth);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  loading = false;
  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit(){
    this.error = '';
    if(this.form.invalid) return;

    this.loading = false;
    try{
      const {email, password} = this.form.getRawValue();
      this.auth.signIn(email!, password!);

      const returnUrl = safeReturnUrl(this.route.snapshot.queryParamMap.get('returnUrl'));
      this.router.navigateByUrl(returnUrl);
    } catch(e: any){
      this.error = e?.message ?? 'Failed to Sign in.'
    } finally {
      this.loading = false
    }
  }
}
