import { Component, OnInit, HostListener } from '@angular/core';
import { interval, timer } from 'rxjs';
import { KeyEventsPlugin } from '@angular/platform-browser/src/dom/events/key_events';
import { KEY_CODE } from '../button-click/button-click.component';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  counter = 0;
  timeout = 0;
  amount = .25;

  constructor() {
  }

  ngOnInit() {
    const secondsCounter = interval(1000);
    const mytimeout = interval(1000);
    const newCounter = secondsCounter.pipe(map(x => this.amount));
    // Subscribe to begin publishing values
    
    newCounter.subscribe(x => this.counter += (x));
    mytimeout.subscribe(n => {
      if ((this.timeout++) > 5) {
        this.counter = 0;
      }
    });

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.keyCode === KEY_CODE.SPACE) {
      this.timeout = 0;
    }
  }


}
