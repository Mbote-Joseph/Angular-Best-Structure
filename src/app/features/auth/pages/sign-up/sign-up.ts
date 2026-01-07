import { Component, inject } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  private auth = inject(Auth);
  private fb = inject(FormBuilder);


  loading = false;
  error = '';
  verifyLink = '';

  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: [, Validators.required ]
  });

  constructor() {}

  submit() {
    this.error = '';
    this.verifyLink = '';
    if (this.form.invalid) return;

    this.loading = true;
    try {
      const { fullName, email, password , role} = this.form.getRawValue();
      this.auth.signUp(fullName!, email!, password!, role!);

      const token = this.auth.getVerifyTokenForDemo();
      if (token) {
        this.verifyLink = `${location.origin}/auth/verify-email?token=${token}`;
      }

      // You can either keep them on this page to verify, or redirect to sign-in:
      // this.router.navigate(['/auth/sign-in']);
    } catch (e: any) {
      this.error = e?.message ?? 'Failed to sign up.';
    } finally {
      this.loading = false;
    }
    console.log(this.form.value)
  }

}
