import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {CartComponent} from "./pages/cart/cart.component";
import {ReceiptComponent} from "./components/header/receipt/receipt.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'cart', component: CartComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'receipt', component: ReceiptComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
