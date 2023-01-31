import { Component, OnInit } from '@angular/core';
import { TimestampService } from '../timestamp.service';
import { Router } from '@angular/router';
import { TimestampPipe } from '../timestamp.pipe';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  timestamp: string | undefined;
  someDate: Date;
  user: any;
  pictures: any[] = [
    {url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/640px-Smiley.svg.png'},
    {url: 'https://i.pinimg.com/originals/24/7c/56/247c5670f7b8cdd44a3a8c53fdd8b70f.jpg'},
    {url: 'https://hmkbilcon.com/wp-content/uploads/Groen_smiley-1110x500.jpg'},
    
  ];
  constructor(private timestampService: TimestampService,
    timestamppipe: TimestampPipe,
    private userService: UserService) {
      this.someDate = new Date();
      this.userService.currentUser.subscribe(user => {
        this.user = user;
      });
    }



    /*ngOnInit() : void {
      this.timestampService.timestamp$.subscribe(timestamp => {
        this.timestamp = timestamp;
      });
  
    }
    */


    ngOnInit() {
      const storedUserString = localStorage.getItem('user');
      if (storedUserString) {
        const storedUser = JSON.parse(storedUserString);
        this.user = storedUser;
      } else {
        this.userService.currentUser.subscribe(user => {
          this.user = user;
        });
      }
    }
    
    selectProfilePicture(url: string) {
      this.user.profilePicture = url;
      localStorage.setItem('user', JSON.stringify(this.user));
    }

    chooseProfilePicture(picture: string ) {
      this.user.profilePicture = picture;
      this.userService.updateUser(this.user);
    }
    
    
    
    
    
}
