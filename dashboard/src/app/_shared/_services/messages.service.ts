import { EventEmitter, Injectable } from '@angular/core';
import { Channel, Message } from '../_interface';
import { HelperService, HttpService } from '../_services/index';

@ Injectable()
export class MessagesService {
  message = new EventEmitter< Message >();
  messages = [];

  constructor(
    private helperService: HelperService,
    private httpService: HttpService
  ) {}

  // Alle Nachrichten abrufen
  getMessages(channel: Channel) {
    this.addMessages(channel);
    return this.messages;
  }

  // Informationen zu ein Nachricht
  /* getMessage(channelId: string, messageId: string): Promise< Message > {
    return new Promise((resolve) => {
      this .channelsService.getChannel(channelId).then((channel: Channel) => {
        let output = null;

        if (channel && channel.messages) {
          output = channel.messages.find(message => {
            return message.id === messageId;
          });
        }

        resolve(output);
      });
    });
  } */

  // Nachrichten ins Array hinzufügen
  addMessages(channel: Channel): Promise< Channel[] > {
    return new Promise((resolve, reject) => {
      this.httpService.parseChannel(channel.url).subscribe((response: any) => {
        if (response.status === 'ok') {
          for (const item of response.items) {
            let enclosure = '';
            if (item.enclosure && Object.keys(item.enclosure).length !== 0) {
              if (item.enclosure.type && item.enclosure.type.indexOf('image') !== -1) {
                enclosure = item.enclosure.link;
              }

              if (item.enclosure.thumbnail) {
                enclosure = item.enclosure.thumbnail;
              }
            }

            const message = new Message(
              this .helperService.generateId(),
              item.title,
              item.link,
              item.description,
              item.pubDate,
              item.author,
              enclosure
            );

            this.messages.push(message);
          }
        } else {
          reject(response.message);
        }
      });
    });
  }
}
