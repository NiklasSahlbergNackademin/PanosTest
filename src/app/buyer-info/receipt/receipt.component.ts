import {Component, Input} from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";
import { BuyerInfoComponent } from '../buyer-info.component';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { Order } from 'src/app/order/order';
import { OrderService } from 'src/app/order.service';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})


export class ReceiptComponent implements OnInit{

  order!: Order;
  
  firstName: string ="";
  lastName: string="";
  email: string="";
  address: string="";
  postalCode: string="";
  @Input() buyerData: any;
  @Input() data : any

  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  public newArray: CartItem[] = [];
  newSum = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
  }

  constructor(private cartService: CartService,
    private route: ActivatedRoute,
    private orderService: OrderService
   ) { }

   receiveBuyerInfo(buyerInfo: { firstName: string, lastName: string, email: string, address: string, postalCode: string }) {
    this.firstName = buyerInfo.firstName;
    this.lastName = buyerInfo.lastName;
    this.email = buyerInfo.email;
    this.address = buyerInfo.address;
    this.postalCode = buyerInfo.postalCode;
  }

  ngOnInit(){
  
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      if (this.newArray.length == 0)
      {
      this.newArray = [...this.cart.items];
      this.cartService.clearCart();
      }
    
     
      
      
      this.route.paramMap.subscribe(params => {
        let firstName = params.get('firstName');
        if (firstName) {
          this.firstName = firstName;
        }

        let lastName = params.get('lastName');
        if (lastName) {
          this.lastName = lastName;
        }

        let email = params.get('email');
        if (email) {
          this.email = email;
        }

        let address = params.get('address');
        if (address) {
          this.address = address;
        }

        let postalCode = params.get('postalCode');
        if (postalCode) {
          this.postalCode = postalCode;
        }
      });
    })
  }

  getTotal(items: Array<CartItem>): number {

    
    if (this.cartService.getTotal(items) > 0)
      {
        this.newSum = this.cartService.getTotal(items);
        return this.newSum;

      }
  return this.newSum;
    


  }

 
}
