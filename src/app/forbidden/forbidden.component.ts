import { Component } from '@angular/core';
import { TimestampPipe } from '../timestamp.pipe';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent {
  someDate: Date;

  constructor(timestamppipe: TimestampPipe) {
    this.someDate = new Date();
  }
}
