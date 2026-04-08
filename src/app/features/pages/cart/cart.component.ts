import { Cart } from '../../../shared/interfaces/cart';
import { CartService } from './../../../shared/services/cart/cart.service';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _cartService = inject(CartService);
  cartDetails!: Cart;
  isLoading: boolean = true;
  emptyCart: boolean = false;
  ngOnInit(): void {
    this.getCart();
  }
  getCart() {
    this._cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res;
        this.isLoading = false;
      },
    });
  }
  removeItem(id: string) {
    this.isLoading = true;
    this._cartService.removeSpecificItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res;
        this.isLoading = false;
      },
    });
  }
  updateCount(id: string, count: number) {
    this.isLoading = true;

    this._cartService.updateProductQuantity(id, `${count}`).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res;
        this.isLoading = false;
      },
    });
  }
  clearCart() {
    this.isLoading = true;
    this._cartService.clearUaerCart().subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;

        if (res.message == 'success') {
          this.cartDetails = {} as Cart;
          this.emptyCart = true;
        }
      },
    });
  }
}
