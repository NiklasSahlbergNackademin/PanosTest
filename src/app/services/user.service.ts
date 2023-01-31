import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient, 
    private userAuthService: UserAuthService) { }

    private user = new BehaviorSubject(null);
  currentUser = this.user.asObservable();
   public updateUser(user : any) {
      this.user.next(user);
    }

    



  PATH_OF_API_LOCAL = "http://localhost:8080";

  PATH_OF_API_AWS = "";

  requestHeader = new HttpHeaders({ "No-Auth":"True"});

  


  public login(loginData : any) {
  
    return this.httpclient.post(this.PATH_OF_API_LOCAL + "/api/v1/auth/authenticate", loginData,{ headers: this.requestHeader})
  }

  public roleMatch(allowedRoles : any) :boolean {

    let isMatch = false;
   const userRoles: any = this.userAuthService.getRoles();
   if(userRoles != null && userRoles) {
    
    if(userRoles == allowedRoles ){
      isMatch = true;
      return isMatch;
    }
    else{
      return isMatch;
    }
   }
   return isMatch;
  }
}
