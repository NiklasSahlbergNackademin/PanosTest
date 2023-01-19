import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Customer} from "../../models/customer.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  customers: Array<Customer> | undefined;

  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;

  constructor(private http: HttpClient) {
  }

  onSubmit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post('http://localhost:8080/customer/add',
      {name: this.name, email: this.email, password: this.password},
      {headers, observe: 'response'}).subscribe(
      res => {
        console.log(res);
        this.name = '';
        this.email = '';
        this.password = '';
        if (res.status) {
          console.log("Successfully Created User")
        }
      },
      err => {
        if (err.status === 404) {
          console.log("User Not Found");
        } else if (err.status === 400) {
          console.log("Bad Request");
        }
      });
  }

  onDelete() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.delete(`http://localhost:8080/customer/delete/${this.id}`, {headers, observe: 'response'}).subscribe(
      res => {
        if (res.status === 204) {
          console.log("Successfully Deleted User");
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
