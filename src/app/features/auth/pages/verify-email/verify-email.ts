import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from '../../../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss',
})
export class VerifyEmail {
  private auth = inject(Auth);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  token: string | null;
  loading = false;
  done = false;
  error = '';

  constructor() {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  verify() {
    this.error = '';
    if (!this.token) return;

    this.loading = true;
    try {
      this.auth.verifyEmail(this.token);
      this.done = true;
    } catch (e: any) {
      this.error = e?.message ?? 'Failed to verify email.';
    } finally {
      this.loading = false;
    }
  }
}
