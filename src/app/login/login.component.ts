import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';
import { TimestampService } from '../timestamp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService
    , private userAuthService:UserAuthService,
    private router: Router,
    private timestampService: TimestampService) {}

  ngOnInit():void {

  }


  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
     (response:any)=> {
     console.log(response.token);
     console.log(response.user.role);
     console.log(response.user);
     this.userAuthService.setRoles(response.user.role);
     this.userAuthService.setToken(response.token);
     this.userService.updateUser(response.user); //To display user in profile
 
     const timestamp = new Date().toString();
     this.timestampService.updateTimestamp(timestamp);
     localStorage.setItem('user', JSON.stringify(response.user));
  
     const userRole = response.user.role;
     if(userRole === 'ADMIN')
     {
       this.router.navigate(['/admin']);
     
 
     }
     else {
       this.router.navigate(['home']);
     }
     },
     (error) => {
       console.log(error);
     }
    );
   }
}
