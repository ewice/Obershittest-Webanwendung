import { Injectable } from '@angular/core';

@ Injectable()
export class Rss2jsonService {
  private endpoint = 'https://api.rss2json.com/v1/api.json';
  private apiKey = 'bdw2x5e4yopiyvqhoqgtywqsftwq6vizri96ufd1';
  private countMessages = '500';

  getEndpoint(): string {
    return this .endpoint;
  }

  getApiKey(): string {
    return this .apiKey;
  }

  getCountMessages(): string {
    return this .countMessages;
  }
}
