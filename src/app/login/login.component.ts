
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService
    , private userAuthService:UserAuthService,
    private router: Router) {}

  ngOnInit():void {

  }


  login(loginForm: NgForm) {
   this.userService.login(loginForm.value).subscribe(
    (response:any)=> {
    console.log(response.token);
    console.log(response.user.role);
    this.userAuthService.setRoles(response.user.role);
    this.userAuthService.setToken(response.token);

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