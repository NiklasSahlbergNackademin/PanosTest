import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-info',
  templateUrl: './buyer-info.component.html',
  styleUrls: ['./buyer-info.component.css']
})
export class BuyerInfoComponent {

  constructor(private router: Router) {}

  firstName: string = "";
  lastName: string ="";
  email: string ="";
  address: string="";
  postalCode: string="";

  @Output() buyerInfo = new EventEmitter<{ firstName: string, lastName: string, email: string, address: string, postalCode: string }>();

  public submitForm() {
   // this.buyerInfo.emit({ firstName: this.firstName, lastName: this.lastName, email: this.email, address: this.address, postalCode: this.postalCode });
    
    this.router.navigate(['/receipt', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      postalCode: this.postalCode
    }], { replaceUrl: true });
  }
}
