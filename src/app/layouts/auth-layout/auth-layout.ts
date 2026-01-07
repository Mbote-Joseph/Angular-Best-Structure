import { Component } from '@angular/core';
import { AdminRoutingModule } from "../../features/admin/admin-routing-module";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [AdminRoutingModule, RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {

}
