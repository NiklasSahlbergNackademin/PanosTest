import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Product} from "../../models/product.model";
import {ProductService} from "../../models/product.service";
import {HttpErrorResponse} from "@angular/common/http";
const ROWS_HEIGHT: {[id:number]: number} = { 1: 400, 3: 335, 4: 350};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cols = 3;
  rowHeight = ROWS_HEIGHT [this.cols];
  category: string | undefined;

  constructor(private carService: CartService, private productService: ProductService) {
  }
  public products: Product[] = [];

  public getProducts(): void{
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  ngOnInit(): void {
    this.getProducts();
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT [this.cols];
  }

  onShowCategory(newCategory: string) : void {
    this.category = newCategory;
  }

  onAddToCart(product: Product): void{
    this.carService.addToCart({
      product: product.image,
      name: product.name,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }
}
