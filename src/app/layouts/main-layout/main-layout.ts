import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
   currentYear = new Date().getFullYear();
   private router = inject(Router)
   private auth = inject(Auth)

   onLogOut():void{
    this.auth.signOut()
    this.router.navigate(['/auth/sign-in'])
   }

}
