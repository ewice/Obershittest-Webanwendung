import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChannelsService, MessagesService, HttpService } from '../../_shared/_services';
import { Channel } from '../../_shared/_interface';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  channelId: String;
  subscription: Subscription;
  channel: Channel;

  constructor(
    private channelsService: ChannelsService,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.subscription = this.channelsService.selectedItem$.subscribe(item => {
      this.channelId = item;
      this.channelsService.getChannel(this.channelId).subscribe(channel => {
        this.channel = channel;
      });
      this.messagesService.saveMessages(this.channelId);
    });
  }

  refreshChannel() {
    alert('TODO');
  }
}
