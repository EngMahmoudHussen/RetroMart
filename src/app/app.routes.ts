import { Routes } from '@angular/router';
import { AuthLeyoutComponent } from './core/leyout/auth-leyout/auth-leyout.component';
import { audit } from 'rxjs';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedUserGuard } from './core/guards/auth/logged-user.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLeyoutComponent,

    children: [
      {
        path: '',
        canActivate: [loggedUserGuard],
        loadComponent: () =>
          import('./core/pages/login/login.component').then(
            (c) => c.LoginComponent,
          ),
      },
      {
        path: 'register',
        canActivate: [loggedUserGuard],
        loadComponent: () =>
          import('./core/pages/register/register.component').then(
            (c) => c.RegisterComponent,
          ),
      },
      {
        path: 'forget-password',
        canActivate: [loggedUserGuard],
        loadComponent: () =>
          import('./core/pages/forget-password/forget-password.component').then(
            (c) => c.ForgetPasswordComponent,
          ),
      },
    ],
  },

  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/home/home.component').then(
        (c) => c.HomeComponent,
      ),
  },
  {
    path: 'brands',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./features/pages/brands/brands.component').then(
        (c) => c.BrandsComponent,
      ),
  },
  {
    path: 'categories',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./features/pages/categories/categories.component').then(
        (c) => c.CategoriesComponent,
      ),
  },
  {
    path: 'products',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./features/pages/products/products.component').then(
        (c) => c.ProductsComponent,
      ),
  },
  {
    path: 'cart',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./features/pages/cart/cart.component').then(
        (c) => c.CartComponent,
      ),
  },
  {
    path: 'check-out/:cartId',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./features/pages/check-out/check-out.component').then(
        (c) => c.CheckOutComponent,
      ),
  },
  {
    path: 'product-details/:id',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./features/pages/product-details/product-details.component').then(
        (c) => c.ProductDetailsComponent,
      ),
  },
  {
    path: 'allorders',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./features/pages/orders/orders.component').then(
        (c) => c.OrdersComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/pages/notfound/notfound.component').then(
        (c) => c.NotfoundComponent,
      ),
  },
];
