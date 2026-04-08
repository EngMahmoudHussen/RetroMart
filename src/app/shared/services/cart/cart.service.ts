import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { count } from 'console';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  _httpClient = inject(HttpClient);
  baseURl = enviroment.baseURL

  constructor() {}
  addProductToCart(productId: string): Observable<any> {
    return this._httpClient.post(
      `${this.baseURl}/cart`,
      { productId },

    );
  }

  updateProductQuantity(productId: string, count: string): Observable<any> {
    return this._httpClient.put(
      `${this.baseURl}/cart/${productId}`,
      { count },

    );
  }
  getLoggedUserCart(): Observable<any> {
    return this._httpClient.get(`${this.baseURl}/cart`, {

    });
  }
  removeSpecificItem(productId: string): Observable<any> {
    return this._httpClient.delete(
      `${this.baseURl}/cart/${productId}`,

    );
  }
  clearUaerCart(): Observable<any> {
    return this._httpClient.delete(
      `${this.baseURl}/cart`,
      
    );
  }
}
