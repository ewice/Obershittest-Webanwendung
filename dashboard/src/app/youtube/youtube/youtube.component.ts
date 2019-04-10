import { Component, OnInit, Input } from '@angular/core';
import { VideoDetail } from '../video-detail.model';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.sass']
})
export class YoutubeComponent implements OnInit {
  results: VideoDetail[];
  message = '';
  loading: boolean;


  constructor() { }

  ngOnInit() {
  }

  updateResults(results: VideoDetail[]): void {
    this.results = results;
    if (this.results.length === 0) {
      this.message = 'Not found...';
    } else {
      this.message = 'Top 10 results:';
    }
  }

}
