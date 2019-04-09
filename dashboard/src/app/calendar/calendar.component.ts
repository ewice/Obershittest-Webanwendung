import { Component, OnInit, Input } from '@angular/core';
import { AuthFirebaseService } from '../_services/auth-firebase.service';
import { ACTIVE_INDEX } from '@angular/core/src/render3/interfaces/container';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  constructor(private auth: AuthFirebaseService) {
    console.log(auth.user$);

   }

  ngOnInit() {
  }

}
