import { OrderService } from './../../../services/order.service';
import { Router } from '@angular/router';
import { Order } from './../../../shared/models/Order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  order:Order = new Order();

  constructor(router: Router, orderService: OrderService) {

    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error:() => {
        // router.navigateByUrl('/checkout');
      }
    })

  }

  ngOnInit(): void {
  }

}
