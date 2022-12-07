import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../../models/product.model";
import {ProductService} from "../../../../models/product.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  product: Product | undefined = {
    id: 1,
    name: 'Tiger',
    price: 150,
    category: 'shoes',
    description: 'Description',
    image: 'https://via.placeholder.com/150'
  };


  @Output() addToCart = new EventEmitter();

  public products: Product[] = [];
  constructor (private productService: ProductService) {}

  ngOnInit(): void{
    this.getProducts();
  }

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

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }


}
