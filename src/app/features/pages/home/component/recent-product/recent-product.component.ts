import { Subcategory } from './../../../../../shared/interfaces/product';
import { Product } from '../../../../../shared/interfaces/product';
import { ProductService } from './../../../../../shared/services/produst/product.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductItemComponent } from '../../../../../shared/components/UI/product-item/product-item.component';
import { CartService } from '../../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recent-product',
  imports: [ProductItemComponent],
  templateUrl: './recent-product.component.html',
  styleUrl: './recent-product.component.scss',
})
export class RecentProductComponent implements OnInit {
  products!: Product[];
  private readonly _productService = inject(ProductService);
  private readonly _cartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);
  loadingId: string | null = null;
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this._productService.getProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
  addToCart(id: string) {
    this.loadingId = id;
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.loadingId = null;
        this._toastr.success(res.message, 'Toastr fun!');
      },
    });
  }
}
