import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { UserService } from 'src/app/services/user.service';
import {Product} from "../../../../models/product.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {

  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();


  constructor (public userService : UserService,
    private http: HttpClient) {}

  ngOnInit(): void {
  }


  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
  
  refresh(): void {
    window.location.reload();
}

  onDelete(id: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.delete(`http://localhost:8080/item/delete/${id}`, {headers, observe: 'response'}).subscribe(
      res => {
        window.location.reload();
        
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
