import { Component } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { Auth } from '../../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  user: User | null;

  constructor(private auth: Auth) {
    this.user = this.auth.currentUser;
  }

  logout() {
    this.auth.signOut();
  }
}
