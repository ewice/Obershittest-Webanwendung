import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../_services/auth-firebase.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  constructor(private auth: AuthFirebaseService) {
   }

  flipDiv: boolean
   flip(){
     this.flipDiv = !this.flipDiv;
   }
  ngOnInit() {
  }

}
