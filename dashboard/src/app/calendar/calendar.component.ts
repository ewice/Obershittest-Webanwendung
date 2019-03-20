import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../_services/auth-firebase.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(private auth: AuthFirebaseService) {
   }

  ngOnInit() {
  }

}
