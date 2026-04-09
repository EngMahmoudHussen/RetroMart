import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly _httpClint = inject(HttpClient);
  token = JSON.stringify(localStorage.getItem('userToken'));
  baseURL = enviroment.baseURL;

  constructor() {}
  cachOrder(
    id: string,
    shippingAddress: { details: string; phone: string; city: string },
  ): Observable<any> {
    return this._httpClint.post(
      `${this.baseURL}/orders/${id}`,
      { shippingAddress },
      {
        headers: {
          Token: JSON.parse(this.token),
        },
      },
    );
  }
  getAllOrders(): Observable<any> {
    return this._httpClint.get(`${this.baseURL}/orders/`);
  }
  getUserOrders(id: string): Observable<any> {
    return this._httpClint.get(`${this.baseURL}/orders/user/${id}`);
  }
  onlinePayment(
    id: string,
    shippingAddress: { details: string; phone: string; city: string },
  ): Observable<any> {
    return this._httpClint.post(
      
      // `${this.baseURL}/orders/checkout-session/${id}?url=http://localhost:4200`,

      `${this.baseURL}/orders/checkout-session/${id}?url=https://engmahmoudhussen.github.io/RetroMart/allorders`,
      { shippingAddress },
      {
        headers: {
          Token: JSON.parse(this.token),
        },
      },
    );
  }
}
