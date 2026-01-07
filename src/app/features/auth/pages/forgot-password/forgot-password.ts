import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from '../../../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {

  private auth = inject(Auth);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  loading = false;
  error = '';
  resetLink = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {}

  submit() {
    this.error = '';
    this.resetLink = '';
    if (this.form.invalid) return;

    this.loading = true;
    try {
      const { email } = this.form.getRawValue();
      const token = this.auth.requestPasswordReset(email!);
      this.resetLink = `${location.origin}/auth/reset-password?token=${token}`;
    } catch (e: any) {
      this.error = e?.message ?? 'Failed to generate reset link.';
    } finally {
      this.loading = false;
    }
  }

}
