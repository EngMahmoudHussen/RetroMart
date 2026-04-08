import { Product } from './../../../shared/interfaces/product';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/produst/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgIf } from '../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr';
import { ProductItemComponent } from '../../../shared/components/UI/product-item/product-item.component';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, ProductItemComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productService = inject(ProductService);
  private readonly _cartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);
  productDetails!: Product;
  recentProduct!: Product[];
  apiError!: string;
  isLoading: boolean = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this.getId();
  }
  getId() {
    this._activatedRoute.paramMap.subscribe({
      next: (res: any) => {
        console.log(res?.params?.id);
        console.log(res?.params?.id);
        this.getDetails(res?.params?.id);
      },
    });
    // let { id } = this._activatedRoute.snapshot.params;
  }
  getDetails(id: string) {
    this._productService.getProductById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.productDetails = res.data;
        this.getRelatedProducts(this.productDetails.category._id);
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }
  getRelatedProducts(catagoryId: string) {
    this._productService.getProducts(catagoryId).subscribe({
      next: (res) => {
        console.log(res);
        this.recentProduct = res.data;
      },
    });
  }
  addToCart(id: string) {
    this.isLoading = true;
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this._toastr.success(res.message, 'Toastr fun!');
      },
    });
  }
}
