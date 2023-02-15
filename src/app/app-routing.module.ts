import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {CartComponent} from "./pages/cart/cart.component";
import {ReceiptComponent} from "./buyer-info/receipt/receipt.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {RegisterComponent} from "./pages/register/register.component";
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { BuyerInfoComponent } from './buyer-info/buyer-info.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { AdditemComponent } from './additem/additem.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'cart', component: CartComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'receipt', component: ReceiptComponent},
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{role:['ADMIN']}},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'buyerinfo', component: BuyerInfoComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'orderhistory', component: OrderhistoryComponent, canActivate:[AuthGuard], data:{role:['ADMIN']}},
  {path: 'additem', component: AdditemComponent, canActivate:[AuthGuard], data:{role:['ADMIN']}}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
