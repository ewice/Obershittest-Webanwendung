import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {
  eventForm = new FormGroup({
    summary: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    start: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required])
  });
  user$: Observable<firebase.User>;
  calendarItems: any[];
  days: any[];

  constructor(public afAuth: AngularFireAuth) {
    this.initClient();
    this.user$ = afAuth.authState;
  }

  // Initialize the Google API client with desired scopes
  initClient() {
    gapi.load('client', () => {
      console.log('loaded client');

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: 'AIzaSyAIlzWsmdNdJvMBLzuDz2XRLDCYf2Jq8aA',
        clientId: '948806960933-jkukoqbs0clqsg9elfeeli94jka3j78v.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      });

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));

    });
  }

  async login() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;

    console.log(googleUser);

    const credential = auth.GoogleAuthProvider.credential(token);

    await this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);

    console.log(credential);

    // Alternative approach, use the Firebase login with scopes and make RESTful API calls
    // const provider = new auth.GoogleAuthProvider()
    // provider.addScope('https://www.googleapis.com/auth/calendar');
    // this.afAuth.auth.signInWithPopup(provider)

  }

  logout() {
    this.afAuth.auth.signOut();
  }

  async getCalendar() {
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    });


    this.calendarItems = events.result.items;

  }

  async insertEvent(summary: String, desc: String, start, end?) {
    const insert = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      start: {
        dateTime: start,
        timeZone: 'Europe/Berlin'
      },
      end: {
        dateTime: end,
        timeZone: 'Europe/Berlin'
      },
      summary: summary,
      description: desc
    })
    await this.getCalendar();
  }

  // ... helper function

   hoursFromNow = (n) => new Date(Date.now() + n * 1000 * 60 * 60 ).toISOString();

   onSubmit() {
    console.log(new Date(Date.now()).toISOString());

   const start = this.eventForm.value.start + 'T' + this.eventForm.value.startTime + ':00.000' + 'Z';
    const end = this.eventForm.value.end + 'T' + this.eventForm.value.endTime + ':00.000' + 'Z';
     this.insertEvent(this.eventForm.value.summary, this.eventForm.value.desc, start, end);
   }
}
