import { Component, OnInit } from '@angular/core';
import { Channel } from '../../_shared/_interface';
import { HttpService } from '../../_shared/_services';

@ Component({
  selector: 'app-channels-list',
  templateUrl: './channels-list.component.html',
  styleUrls: ['./channels-list.component.scss']
})
export class ChannelsListComponent implements OnInit {
  channels: Channel[];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this .httpService.getRssChannels().subscribe((channels: Channel[]) => {
      this .channels = channels;
    });
  }
}
