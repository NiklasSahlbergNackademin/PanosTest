import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimestampService {
  private timestampSource = new Subject<string>();
  timestamp$ = this.timestampSource.asObservable();
  
  updateTimestamp(timestamp: string) {
    this.timestampSource.next(timestamp);
  }
}