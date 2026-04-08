import { AuthService } from './core/services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './shared/services/flowbite.service';
import { NavbarComponent } from './core/leyout/navbar/navbar.component';
import { FooterComponent } from './core/leyout/footer/footer.component';
import { NgxSpinnerModule, NgxSpinnerService  } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgxSpinnerModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'RetroMart';
  _flowbiteService = inject(FlowbiteService);
  spinner = inject(NgxSpinnerService)
  // _authService = inject(AuthService);
  constructor() {}

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite((flowbite) => {
      console.log('flow loaded ', flowbite);
    });
    // this._authService.isLoggedUser();
   
  }

}
