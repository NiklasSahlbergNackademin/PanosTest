import {Component, Input} from '@angular/core';
import {Cart} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";
import { BuyerInfoComponent } from '../buyer-info.component';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit{
  firstName: string ="";
  lastName: string="";
  email: string="";
  address: string="";
  postalCode: string="";
  @Input() buyerData: any;
  @Input() data : any

  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
  }
  
  constructor(private cartService: CartService,
    private route: ActivatedRoute
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

}
