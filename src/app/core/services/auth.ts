import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

const TOKEN_KEY = 'ls_token';
const USER_KEY = 'ls_user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private userSubject = new BehaviorSubject<User | null>(this.getStoredUser());

  user$ = this.userSubject.asObservable();

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  signIn(email: string, password: string): void {
    // demo: generate a fake user
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'individual';
    const user: User = {id: crypto.randomUUID(), fullName: "Demo User", email, role};

    localStorage.setItem(TOKEN_KEY, 'demo-token');
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.userSubject.next(null);
  }


  private getStoredUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }

}
