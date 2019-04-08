import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

import {CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridType, GridsterItemComponentInterface} from 'angular-gridster2';
import { VideoDetail } from '../youtube/video-detail.model';
import { HttpService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  results: VideoDetail[];
  loading: boolean;
  message = '';
  settingMenuIsActive = false;
  static itemChange(item, itemComponent) {
    console.log('itemChanged');
  }

  static itemResize(item, itemComponent) {
    console.log('itemResized', item, itemComponent);
  }
  private eventStop(item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent) {
  }

  constructor(private _http: HttpService) {
    console.log("test");

    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.CompactLeftAndUp,
      margin: 10,
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

    this._http.getDashboardPositions().subscribe(data => {
        console.log(data);

        if(data["docs"] != null) {
          this.dashboard = data["docs"].dashboard
          console.log(this.dashboard);

        }
        else {
          this.dashboard = data["doc"].dashboard
        }

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
      console.log("changed");

    }
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
    console.log("removed");

  }
  savePositions(item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent) {
    setTimeout( () => this._http.sendDashboardPositions(this.dashboard), 250 );

    console.log(this.dashboard);

  }
  addItem() {
    this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1});
  }

  updateResults(results: VideoDetail[]): void {
    this.results = results;
    if (this.results.length === 0) {
      this.message = 'Not found...';
    } else {
      this.message = 'Top 10 results:';
    }
  }

  toggleSettingsMenu() {
    this.settingMenuIsActive = !this.settingMenuIsActive;
  }

}
