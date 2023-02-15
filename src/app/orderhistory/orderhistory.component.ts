import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order/order';


@Component({
  selector: 'app-orders',
  template: `
<table class="table-auto w-full">
  <thead class="bg-gray-800 text-white">
    <tr>
      <th class="px-4 py-2">Order ID</th>
      <th class="px-4 py-2">Producs bought</th>
      <th class="px-4 py-2">Product prices</th>
      <th class="px-4 py-2">Total Amount</th>
      
    </tr>
  </thead>
  <tbody>
    <tr class="text-center" *ngFor="let order of orders">
    <td class="border px-4 py-2">
        <ng-container >{{ order.id}}</ng-container>
      </td>
      <td class="border px-4 py-2">
        <ng-container *ngFor="let product of order.items">{{ product.name + "."}}</ng-container>
      </td>
      <td class="border px-4 py-2">
        <ng-container *ngFor="let product of order.items">{{ product.price + "$ "}}</ng-container>
      </td>
      
      <td class="border px-4 py-2">{{ order.totalAmount + '$'}}</td>
     
    </tr>
  </tbody>
</table>
  `,
})
export class OrderhistoryComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      console.log(orders)
    });
  }
}