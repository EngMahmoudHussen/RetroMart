import { Product } from './../../../interfaces/product';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Input() isLoading: boolean = false; 
  @Output() fireAddToCart: EventEmitter<string> = new EventEmitter();

  handleAddToCart(id: string) {
    this.fireAddToCart.emit(id);
  }
}
