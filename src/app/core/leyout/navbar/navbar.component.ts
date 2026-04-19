import { AuthService } from './../../services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  _authService = inject(AuthService);
  isLoggedIn: any;
  isMenuOpen = false;

  constructor() {}
  ngOnInit(): void {
    this.chackLoginStatus();
  }
  chackLoginStatus() {
    this._authService.userData.subscribe({
      next: (res) => {
        setTimeout(() => {
          this.isLoggedIn = res;
        });
      },
    });
  }
  signOut() {
    this._authService.logOut();
  }
}
