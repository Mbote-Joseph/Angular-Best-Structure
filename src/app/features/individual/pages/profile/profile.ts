import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../../../core/models/user.model';
import { Auth } from '../../../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private auth = inject(Auth);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

   user: User | null = null;
  loading = false;
  error = '';
  success = '';

  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    this.user = this.auth.currentUser;
    if (this.user) {
      this.form.patchValue({
        fullName: this.user.fullName,
        email: this.user.email,
      });
    }
  }

  save() {
    this.error = '';
    this.success = '';

    if (this.form.invalid) return;

    this.loading = true;
    try {
      const { fullName, email } = this.form.getRawValue();
      this.auth.updateProfile({ fullName: fullName!, email: email! });
      this.success = 'Profile updated successfully.';
    } catch (e: any) {
      this.error = e?.message ?? 'Failed to update profile.';
    } finally {
      this.loading = false;
    }
  }

  back() {
    this.router.navigate(['/']);
  }
}
