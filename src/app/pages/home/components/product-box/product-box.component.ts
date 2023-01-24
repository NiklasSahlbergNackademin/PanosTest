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



}
