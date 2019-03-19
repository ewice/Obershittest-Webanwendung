import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  apiKey = "ea618f9320a674d69a89eda628786e04";
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ; charset=UTF-8'
      })
    };
    location = {
      lat: 0,
      lon: 0
    };
    wetter = {
      location: "normal",
      temp: 234,
      iconSrc: ""
    };

  constructor(private _http: HttpClient) {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location.lat = position.coords.latitude;
        this.location.lon = position.coords.longitude;
        console.log(position.coords);
      });
   }
   setTimeout(() => {this.loadWheater()}, 3000)


  }

  ngOnInit() {
  }

  loadWheater(city?: string, long?: string, lat?: string, zip?: string ) {
    this._http.get("http://api.openweathermap.org/data/2.5/weather?appid=ea618f9320a674d69a89eda628786e04&lat=" + this.location.lat + "&lon=" + this.location.lon).subscribe(res => {
      this.wetter = {
        temp: Math.round(res["main"].temp - 273.15),
        location: res['name'],
        iconSrc: 'http://openweathermap.org/img/w/' + res['weather'][0].icon + '.png'
      }
    console.log(res);

    });


  }

}
