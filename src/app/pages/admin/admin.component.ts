import {Component, OnInit} from '@angular/core';
import { ProductService } from "../../models/product.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../../models/product.model";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];

  id: number | undefined;
  name: string | undefined;
  price: number | undefined;
  category: string | undefined;
  description: string | undefined;
  image: string | undefined;

  constructor(private _snackBar: MatSnackBar,private http: HttpClient, private productService: ProductService) {
  }
  requestHeader = new HttpHeaders({ "No-Auth":"True"});

  onSubmit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post('http://localhost:8080/item/add',
      {name: this.name, price: this.price, category: this.category, description: this.description, image: this.image},
      {headers, observe: 'response'}).subscribe(
      res => {
        console.log(res);
        this.name = '';
        this.price = 0;
        this.category = '';
        this.description = '';
        this.image = '';

        alert("Successfully added");
        if (res.status) {
          console.log("Successfully Created");
          this._snackBar.open('1 item added to list', 'Ok' , { duration: 3000 });
        }
      },
      err => {
        if (err.status === 404) {
          console.log("Not Found");
        } else if (err.status === 400) {
          console.log("Bad Request");
        }
      });
  }

  onDelete() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.delete(`http://localhost:8080/item/delete/${this.id}`, {headers, observe: 'response'}).subscribe(
      res => {
        if (res.status === 200) {
          console.log("Successfully Deleted");
          this._snackBar.open('1 item deleted from list', 'Ok' , { duration: 3000 });
        }
      },
      err => {
        if (err.status === 404) {
          console.log("Not Found");
        } else if (err.status === 400) {
          console.log("Bad Request");
        }
      }
    );
  }

  getProducts() {
    this.http.get<Product[]>('http://localhost:8080/item/all',
      {headers:new HttpHeaders({'Content-Type': 'application/json'})})
      .subscribe(data => {this.products = data as Product[];});
  }

  ngOnInit() {
    this.getProducts();
  }

}
