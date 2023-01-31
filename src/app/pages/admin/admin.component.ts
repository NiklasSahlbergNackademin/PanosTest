import {Component} from '@angular/core';
import {Product} from "../../models/product.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  products: Array<Product> | undefined;

  id: number | undefined;
  name: string | undefined;
  price: number | undefined;
  category: string | undefined;
  description: string | undefined;
  image: string | undefined;

  constructor(private http: HttpClient) {
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
          console.log("Successfully Created")
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
        if (res.status === 204) {
          console.log("Successfully Deleted");
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
}
