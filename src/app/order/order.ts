import { CartItem } from "../models/cart.model";
import { Product } from "../models/product.model";

export class Order {
    id: number | undefined;
   // user: any;
    items: Product[] = [];
    date: Date = new Date();
    totalAmount: number | undefined;
  
  /*  constructor(id: number,  date: Date, products: Product[], user:any, totalAmount: number) {
      this.id = id;
      this.date = date;
   //   this.user = user;
      this.products = products;
      this.totalAmount = totalAmount;
    }

    */
  }