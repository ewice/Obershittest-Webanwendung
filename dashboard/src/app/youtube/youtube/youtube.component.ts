import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.sass']
})
export class YoutubeComponent implements OnInit {
  @Input() active;

  constructor() { }

  ngOnInit() {
  }

}
