import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartItem } from '../models/cart.model';
import { OrderService } from '../order.service';
import { Order } from '../order/order';
import { CartComponent } from '../pages/cart/cart.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-buyer-info',
  templateUrl: './buyer-info.component.html',
  styleUrls: ['./buyer-info.component.css']
})
export class BuyerInfoComponent {

  constructor(private router: Router,
    private orderService: OrderService,
    private cartService: CartService) {}

    order: Order = new Order();
    isCreatingOrder = false;

  firstName: string = "";
  lastName: string ="";
  email: string ="";
  address: string="";
  postalCode: string="";

  private _cart: Cart = { items: [] };
  public newArray: CartItem[] = [];
  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
  }

  
  @Output() buyerInfo = new EventEmitter<{ firstName: string, lastName: string, email: string, address: string, postalCode: string }>();

  public submitForm() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      if (this.newArray.length == 0)
      {
      this.newArray = [...this.cart.items];
      }

    });
    
   this.order.date = new Date();
   this.order.id = 8;
   console.log(this._cart);
   console.log(this.newArray)
   this.order.totalAmount = 0;

   const itemsArray = [];
    for (const item of this.newArray) {
      for (let i = 0; i < item.quantity; i++) {
        this.order.totalAmount+= item.price;
        itemsArray.push({ 
          id: item.id, 
          name: item.name, 
          price: item.price, 
          category: 'null', 
          image: 'null', 
          description: 'Null', 
          uniqueIdentifier: Date.now()
        });
      }
    }
    this.order.items = itemsArray;

   console.log(this.order.items);

   this.isCreatingOrder = true;
   this.orderService.createOrder(this.order)
     .subscribe(
       (order) => {
         console.log('Order created:', order);
         this.isCreatingOrder = false;
       },
       (error) => {
         console.error('Error creating order:', error);
         this.isCreatingOrder = false;
       }
     );

   
    this.router.navigate(['/receipt', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      postalCode: this.postalCode
    }], { replaceUrl: true });
  }

}
