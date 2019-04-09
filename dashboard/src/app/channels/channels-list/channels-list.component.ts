import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Channel } from '../../_shared/_interface';
import { HttpService, ChannelsService } from '../../_shared/_services';

@Component({
  selector: 'app-channels-list',
  templateUrl: './channels-list.component.html',
  styleUrls: ['./channels-list.component.scss']
})
export class ChannelsListComponent implements OnInit {
  channels: Channel[];
  channelId: String;

  constructor(private httpService: HttpService, private channelsService: ChannelsService) { }

  ngOnInit() {
    this .httpService.getRssChannels().subscribe((channels: Channel[]) => {
      this .channels = channels;
    });
  }

  selectedChannelItem(channelId: String) {
    this.channelsService.changeChannel(channelId);
  }

}
