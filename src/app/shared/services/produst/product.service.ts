import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-toen';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _httpClient = inject(HttpClient);
  _baseURl = inject(API_BASE_URL);

  constructor() {}
  getProducts(catagoryId?: string): Observable<any> {
    let url = catagoryId
      ? `${this._baseURl}/products?category[in]=${catagoryId}`
      : `${this._baseURl}/products`;
    return this._httpClient.get(url);
  }
  getProductById(id: string): Observable<any> {
    return this._httpClient.get(`${this._baseURl}/products/${id}`);
  }
}
