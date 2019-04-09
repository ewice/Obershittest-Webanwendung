import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Wettersettings } from '../_interface/wettersettings';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  loadedWetterSettings: Wettersettings = {
    automaticLocation: null,
    zip: null,
    userId: localStorage.getItem("userId")
  };

  weatherSettings = new FormGroup({
    zip: new FormControl(this.loadedWetterSettings.zip),
    automaticLocation: new FormControl(''),
    colorInput: new FormControl('')
  });


  constructor() { }
}
