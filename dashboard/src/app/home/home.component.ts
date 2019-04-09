import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

import {CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridType, GridsterItemComponentInterface} from 'angular-gridster2';
import { VideoDetail } from '../youtube/video-detail.model';
import { HttpService } from '../_services';
import { FormControl, FormGroup } from '@angular/forms';
import { ColorsService } from '../_services/colors.service';
import { WeatherService } from '../_services/weather.service';
import { AuthFirebaseService } from '../_services/auth-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  status: Boolean = false;
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  calendar: Boolean = true;
  youtube: Boolean = true;
  rss: Boolean = true;
  todo: Boolean = true;
  spotify: Boolean = true;
  weather: Boolean = true;


  settingMenuIsActive = false;
  selectedColor: String;
  color = new FormGroup({
    colorInput: new FormControl('')
  });
  active: Boolean;


  static itemChange(item, itemComponent) {
    console.log('itemChanged');
  }

  static itemResize(item, itemComponent) {
    console.log('itemResized', item, itemComponent);
  }
  private eventStop(item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent) {
  }

  constructor(
    private _http: HttpService,
    public _colorService: ColorsService,
    private _weather: WeatherService,
    private auth: AuthFirebaseService
  ) {
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.CompactLeftAndUp,
      margin: 30,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      resizable: {
        enabled: true,
      },
      swap: true,
      draggable: {
        enabled: true,
        stop: this.savePositions.bind(this)
      },
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
   };

   this.dashboard = [
    {cols: 2, rows: 1, y: 0, x: 0, hasContent: true, type: 'weather'},
    {cols: 2, rows: 2, y: 0, x: 2, hasContent: true, type: 'todo'},
    {cols: 1, rows: 2, y: 0, x: 4, hasContent: true, type: 'spotify'},
    {cols: 1, rows: 1, y: 2, x: 5},
    {cols: 1, rows: 1, y: 1, x: 0},
    {cols: 1, rows: 1, y: 1, x: 0},
    {cols: 2, rows: 2, y: 3, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2'},
    {cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2'},
    {cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled'},
    {cols: 1, rows: 1, y: 2, x: 4, dragEnabled: true, resizeEnabled: false, label: 'Drag&Resize Disabled'},
    {cols: 1, rows: 1, y: 2, x: 6}
  ];
    this._http.getDashboardPositions().subscribe(data => {
        console.log(data);

        if (data['docs'] != null) {
          this.dashboard = data['docs'].dashboard;
          console.log(this.dashboard);

        } else {
          this.dashboard = data['doc'].dashboard;
        }
        this.dashboard.forEach(element => {
          if (element.type === 'spotify') {
            this.spotify = false;
          } else if (element.type === 'rss') {
            this.rss = false;
          } else if (element.type === 'calendar') {
            this.calendar = false;
          } else if (element.type === 'weather') {
            this.weather = false;
          } else if (element.type === 'youtube') {
            this.youtube = false;
          } else if (element.type === 'todo') {
            this.todo = false;
          }
        });
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

   ngOnInit() {

  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
      console.log('changed');

    }
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
    if (item.type === 'spotify') {
      this.spotify = true;
    } else if (item.type === 'rss') {
      this.rss = true;
    } else if (item.type === 'calendar') {
      this.calendar = true;
    } else if (item.type === 'weather') {
      this.weather = true;
    } else if (item.type === 'youtube') {
      this.youtube = true;
    } else if (item.type === 'todo') {
      this.todo = true;
    }
  }
  savePositions(item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent) {
    setTimeout( () => this._http.sendDashboardPositions(this.dashboard), 250 );

    console.log(this.dashboard);

  }
  addItem() {
    this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1});
  }

  toggleSettingsMenu() {
    this.active = !this.active;
  }

  onSubmit(item: GridsterItem, color?) {
    console.log(this.selectedColor);

    item['bg'] = this.selectedColor;
    console.log(item);

  }

  addComponent(component: string) {
    let isExisting = false;
    this.dashboard.forEach(element => {
      if (element.type === component) {
        console.log('Component besteht bereits');
        isExisting = true;
      }
    });

    setTimeout( () => {
      if (!isExisting) {
        this.dashboard.push({
          x: 3,
          y: 3,
          cols: 1,
          rows: 1,
          type: component,
          hasContent: true
        });
      }
    }, 250 );

  }

}
