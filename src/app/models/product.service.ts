import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./product.model";

const API_BASE_URL = 'localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  requestHeader = new HttpHeaders({ "No-Auth":"True"});

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Array <Product>> {
    return this.http.get<Product[]>(`http://localhost:8080/item/all`, { headers: this.requestHeader});
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:8080/item/add', product );
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>('http://localhost:8080/item/update', product);
  }
  public deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/item/delete/${productId}');
  }
}
