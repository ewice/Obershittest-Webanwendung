import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-calendar',
  templateUrl: './template-calendar.component.html',
  styleUrls: ['./template-calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  public datum = new Date();
  public letzerTag = [];
  public monate = [];
  public monatIndex;
  public monat;
  public jahr;
  public tag;
  public ersterTagImMonat;
  public ersterTagImMonatIndex;
  public anzahlWochen;
  public wochen = [];

  constructor() {
    this.letzerTag =
    [
      31, // Januar
      28, // Februar
      31, // März
      30, // April
      31, // Mai
      30, // Juni
      31, // Juli
      31, // August
      30, // September
      31, // Oktober
      30, // November
      31  // Dezember
    ];
    this.monate =
    [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember'
    ];

    this.monatIndex = this.datum.getMonth();
    this.monat = this.monate[this.monatIndex];
    this.jahr = this.datum.getFullYear();
    this.tag = this.datum.getDate();

    this.ersterTagImMonat = new Date(this.datum.getFullYear(), this.monatIndex, 1);
    this.ersterTagImMonatIndex = this.ersterTagImMonat.getDay();

    this.anzahlWochen = Math.round((this.letzerTag[this.monatIndex] + this.ersterTagImMonatIndex) / 7);
    this.letzerTag[1] += this.CheckLeapYear(this.jahr) ? 1 : 0;

    this.loadData();
  }

  ngOnInit() {
  }

  loadData(): void {
    let tage = 1;
    for ( let i = 0; i < this.anzahlWochen; i++) {
      const tageArray = [];
      for ( let j = 1; j <= 7; j++) {
        if ( i === 0 && j < this.ersterTagImMonatIndex ) {
          tageArray.push( '' );
        } else if ( tage <= this.letzerTag[this.monatIndex] ) {
          tageArray.push( tage );
          tage++;
        }
      }
      this.wochen.push( tageArray );
    }
  }

  CheckLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  }
}
