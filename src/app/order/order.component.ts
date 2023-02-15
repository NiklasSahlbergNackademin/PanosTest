import { Component, OnInit } from '@angular/core';
import { Order } from './order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  template: `
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>User</th>
          <th>Order Date</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let order of orders">
          <td>{{order.id}}</td>
          <td>{{order.user.name}}</td>
         
          <td>{{order.totalAmount}}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
}