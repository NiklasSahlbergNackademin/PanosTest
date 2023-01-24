import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "./customer.model";

const API_BASE_URL = 'localhost:8080';



@Injectable({
  providedIn: 'root'
})


export class CustomerService {

  requestHeader = new HttpHeaders({ "No-Auth":"True"});

  constructor(private http: HttpClient) {}

  public getCustomers(): Observable<Array <Customer>> {
    return this.http.get<Customer[]>(`http://localhost:8080/customer/all`);
  }

  public addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>('http://localhost:8080/customer/add', customer, {headers : this.requestHeader});
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>('http://localhost:8080/customer/update', customer);
  }
  public deleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/customer/delete/${customerId}');
  }
}
