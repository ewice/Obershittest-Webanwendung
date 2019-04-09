import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../_services/http.service';
import { Wettersettings } from '../_interface/wettersettings';
import { WeatherService } from '../_services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit {
  @Input() active: Boolean;
  loadedWetterSettings;

  constructor(
    private _http: HttpClient,
    private _httpS: HttpService,
    private _weather: WeatherService
  ) {}

  ngOnInit() {

  }

  onSubmit() {
    const weathersettings: Wettersettings = {
      zip: this._weather.weatherSettings.value.zip,
      userId: localStorage.getItem('userId'),
      automaticLocation: this._weather.weatherSettings.value.automaticLocation
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

    loadWheater(city?: string, long?: string, lat?: string, zip?: string) {
      this._weather.loadWheater();
    }

  }
