import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorMessageComponent } from '../../../shared/components/UI/error-message/error-message.component';
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'app-check-out',
  imports: [
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss',
})
export class CheckOutComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _orderService = inject(OrderService);
  checOutForm!: FormGroup;
  cartId!: string;
  ngOnInit(): void {
    this.getCartId();
    this.initFrom();
  }
  getCartId() {
    this.cartId = this._activatedRoute.snapshot.params['cartId'];
  }
  initFrom() {
    this.checOutForm = new FormGroup({
      details: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    });
  }
  completeOrder() {
    this._orderService
      .onlinePayment(this.cartId, this.checOutForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          open(res.session.url);
        },
      });
    // this._orderService
    //   .cachOrder(this.cartId, this.checOutForm.value)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //     },
    //   });
  }
}
