import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-clock',
  templateUrl: './template-clock.component.html',
  styleUrls: ['./template-clock.component.sass']
})
export class ClockComponent implements OnInit {

  myDate: Date;

  constructor() {}

  ngOnInit(): void {
    this.utcTime();
  }

  utcTime(): void {
    setInterval(() => {
      this.myDate = new Date();
    }, 1000);
  }
}
