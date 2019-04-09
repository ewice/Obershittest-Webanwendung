import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  FormControl
} from '@angular/forms';
import {
  FormGroup
} from '@angular/forms';
import {
  HttpService
} from '../_services';
import {
  Wettersettings
} from '../_interface/wettersettings';
import { WeatherService } from '../_services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit {
  @Input() active: Boolean;

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


  loadedWetterSettings;


  constructor(private _http: HttpClient, private _httpS: HttpService, private _weather: WeatherService) {
    this.loadedWetterSettings = _weather.loadedWetterSettings
    _httpS.getWeatherSettings().subscribe(data => {
      this.loadedWetterSettings.automaticLocation = data["doc"].automaticLocation;
      this.loadedWetterSettings.zip = data["doc"].zip;

      console.log(this.loadedWetterSettings);
      this._weather.weatherSettings.patchValue({
        zip: this.loadedWetterSettings.zip
      });
      this._weather.weatherSettings.patchValue({
        automaticLocation: this.loadedWetterSettings.automaticLocation
      });

      if (this.loadedWetterSettings.automaticLocation && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.loadWheater(position.coords.latitude.toString(), position.coords.longitude.toString());
        });
      } else {
        this.loadWheater(this.loadedWetterSettings.zip);
      }
    });


  }

  ngOnInit() {

  }

  onSubmit() {
    const weathersettings: Wettersettings = {
      zip: this.weatherSettings.value.zip,
      userId: localStorage.getItem('userId'),
      automaticLocation: this.weatherSettings.value.automaticLocation
    };
    this.loadedWetterSettings = weathersettings;
    this._httpS.sendWeatherSettings(weathersettings);
    if (weathersettings.automaticLocation === true) {
      navigator.geolocation.getCurrentPosition(position => {
          this.loadWheater(position.coords.latitude.toString(), position.coords.longitude.toString());
        });
      } else {
        this.loadWheater(weathersettings.zip);
      }
    }

    loadWheater(city ? : string, long ? : string, lat ? : string, zip ? : string) {
      if (this.loadedWetterSettings.automaticLocation == true) {
        this._http.get("http://api.openweathermap.org/data/2.5/weather?appid=ea618f9320a674d69a89eda628786e04&lat=" + city + "&lon=" + long).subscribe(res => {
          this.wetter = {
            temp: Math.round(res["main"].temp - 273.15),
            location: res['name'],
            iconSrc: 'http://openweathermap.org/img/w/' + res['weather'][0].icon + '.png'
          };
          console.log(res);
        });
      } else if (this.loadedWetterSettings.automaticLocation == false) {
        this._http.get("http://api.openweathermap.org/data/2.5/weather?appid=ea618f9320a674d69a89eda628786e04&zip=" + city + ",de").subscribe(res => {
          this.wetter = {
            temp: Math.round(res["main"].temp - 273.15),
            location: res['name'],
            iconSrc: 'http://openweathermap.org/img/w/' + res['weather'][0].icon + '.png'
          };
          console.log(res);
        });
      }



    }

  }
