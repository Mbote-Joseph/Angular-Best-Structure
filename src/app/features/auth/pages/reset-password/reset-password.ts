import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from '../../../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
   private auth = inject(Auth);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  loading = false;
  error = '';
  done = false;
  token: string | null;

  form = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', Validators.required],
  });

  constructor() {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  submit() {
    this.error = '';
    this.done = false;
    if (!this.token) return;
    if (this.form.invalid) return;

    const { password, confirm } = this.form.getRawValue();
    if (password !== confirm) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.loading = true;
    try {
      this.auth.resetPassword(this.token, password!);
      this.done = true;
    } catch (e: any) {
      this.error = e?.message ?? 'Failed to reset password.';
    } finally {
      this.loading = false;
    }
  }
}
