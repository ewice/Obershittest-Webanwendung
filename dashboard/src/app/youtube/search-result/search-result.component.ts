import { Component, OnInit, Input } from '@angular/core';
import { VideoDetail } from '../video-detail.model';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.sass']
})
export class SearchResultComponent implements OnInit {
  @Input() result: VideoDetail;

  constructor() { }

  ngOnInit() {
  }

  onNavigate() {
    window.open(this.result.videoUrl, '_blank');
  }

}
