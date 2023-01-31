import {Component, Input, OnInit} from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';
import {Cart, CartItem} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";
import { Router } from '@angular/router';
import { TimestampService } from 'src/app/timestamp.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current,  0);
  }
  user: any;
   timestamp: string | undefined;
  constructor(private cartService: CartService, private userAuthService: UserAuthService,
    public userService: UserService,
    private router: Router,
    private timestampService: TimestampService) {  this.userService.currentUser.subscribe(user => {
      this.user = user;
    });}

  ngOnInit() : void {
    this.timestampService.timestamp$.subscribe(timestamp => {
      this.timestamp = timestamp;
    });

  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

}
