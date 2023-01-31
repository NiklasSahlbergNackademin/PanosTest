import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles : [])
  {
    localStorage.setItem('role', JSON.stringify(roles));

  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('role')!);
  }

  public setToken(jwtToken:string) {
    localStorage.setItem("token", jwtToken)
  }

  public getToken(): string {
   return localStorage.getItem("token")!;
  }


  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
  return this.getRoles() && this.getToken();
  }
}
