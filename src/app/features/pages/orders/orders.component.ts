import { CartItem } from './../../../shared/interfaces/order';
import { resolve } from 'node:path';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import { Order } from '../../../shared/interfaces/order';
import { initFlowbite } from 'flowbite'; // تأكد من عمل install للمكتبة

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  private readonly _authService = inject(AuthService);
  private readonly _orderService = inject(OrderService);
  allOrder: Order[] = [];
  CartItems:CartItem[] = [];
  showModel:boolean = false
  ngOnInit(): void {
    this.getUserId();
    initFlowbite();
  }

  getUserId() {
    this._authService.userData.subscribe({
      next: (res) => {
        console.log(res);
        res.id && this.getAllOrders(res.id);
      },
    });
  }
  getAllOrders(id: string) {
    this._orderService.getUserOrders(id).subscribe({
      next: (res) => {
        console.log(res);
        this.allOrder = res;
      },
    });
  }
  openModel(index:number){
  this.CartItems = this.allOrder[index].cartItems
  this.showModel = true
  }
}
