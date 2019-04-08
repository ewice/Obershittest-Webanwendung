import { EventEmitter, Injectable } from '@angular/core';
import { Channel } from '../_interface/channel';
import { HttpService } from '../_services/http.service';

@ Injectable()
export class ChannelsService {
  channelsChanged = new EventEmitter< Channel[] >();

  constructor(private httpService: HttpService) { }

  private loadChannels() {
    return this.httpService.getRssChannels();
  }

  private saveChannel(channel) {
    return this.httpService.addRssChannel(channel);
  }

  getChannels() {
    return this.httpService.getRssChannels();
  }

  getChannel(id: String) {
    return this.httpService.getRssChannel(id);
  }

  addChannel(channel: Channel): Promise< Channel[] > {
    return new Promise((resolve, reject) => {
      this.httpService.parseChannel(channel.url).subscribe((response: any) => {
        if (response.status === 'ok') {
          channel.title = response.feed.title;
          channel.url = response.feed.url;
          channel.description = response.feed.description;
          channel.image = response.feed.image;

          this .saveChannel(channel);

        } else {
          reject(response.message);
        }
      });
    });
  }
}
