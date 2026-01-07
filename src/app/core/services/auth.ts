import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UserRole } from '../models/user.model';
import { EmailValidator } from '@angular/forms';

const TOKEN_KEY = 'ls_token';
const USER_KEY = 'ls_user';

type ResetToken = {token: string; email: string; expiresAt: number };
const RESET_TOKEN_KEY = 'ls_reset_token';

type VerifyToken = {token: string; email: string; expiresAt: number };
const VERIFY_TOKEN_KEY = 'ls_verify_token';

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

  // Sign-In
  signIn(email: string, password: string): void {
    // demo: generate a fake user
    const role: UserRole = email.toLowerCase().includes('admin') ? 'admin' : 'individual';

    // If user already exists with the same email, reuse (Keeps name/verified flags if your model has them)
    const existing = this.getStoredUser();

    const user: User =
    existing && existing.email.toLowerCase() == email.toLowerCase() ? {...existing, role} : {id: crypto.randomUUID(), fullName: "Demo User", email, role};

    localStorage.setItem(TOKEN_KEY, 'demo-token');
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }


  // Sign-UP
  signUp(fullName: string, email: string, password: string): void{
    // DEMO ONLY: ignore password
    const role: UserRole = 'individual';
    const user: User = { id: crypto.randomUUID(), fullName, email, role };

    localStorage.setItem(TOKEN_KEY, 'demo-token');
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);

    // Create demo verify token
    const verify : VerifyToken ={
      token: crypto.randomUUID(),
      email,
      expiresAt: Date.now() + 10000 * 60 * 15,
    };
    localStorage.setItem(VERIFY_TOKEN_KEY, JSON.stringify(verify));
  }

  signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(RESET_TOKEN_KEY);
    localStorage.removeItem(VERIFY_TOKEN_KEY);
    this.userSubject.next(null);
  }

  // Email Verification (demo)
  getVerifyTokenForDemo(): string | null {
    const v = this.getStored<VerifyToken>(VERIFY_TOKEN_KEY);
    return v?.token ?? null;
  }

  verifyEmail(token: string): void {
    const v = this.getStored<VerifyToken>(VERIFY_TOKEN_KEY);
    if(!v) throw new Error('No Verification request found');
    if(v.token !== token) throw new Error('Invalid Verification Token.');
    if(Date.now() > v.expiresAt) throw new Error('Verification token expired');

    const user = this.getStoredUser();
    if (user && user.email.toLowerCase() == v.email.toLowerCase()){
      const updated: any = {...user, emailVerified: true};
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      this.userSubject.next(updated as User);
    }
    localStorage.removeItem(VERIFY_TOKEN_KEY);
  }

  // Reset Password (demo)
  requestPasswordReset(email: string): string {
    const reset: ResetToken = {
      token: crypto.randomUUID(),
      email,
      expiresAt: Date.now() + 1000 * 60 * 15,
    };
    localStorage.setItem(RESET_TOKEN_KEY, JSON.stringify(reset));
    return reset.token;
  }

  resetPassword(token: string, newPassword:string): void{
    const r = this.getStored<ResetToken>(RESET_TOKEN_KEY);
    if(!r) throw new Error('No reset request found');
    if(r.token !== token) throw new Error('Invalid reset token.');
    if(Date.now() > r.expiresAt) throw new Error('Reset token Expired.');

    localStorage.removeItem(RESET_TOKEN_KEY);
  }


  // Storage Helpers

  private getStoredUser(): User | null {
    return this.getStored<User>(USER_KEY);
  }


  private getStored<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if(!raw) return null;
    try{
      return JSON.parse(raw) as T;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  }


}
