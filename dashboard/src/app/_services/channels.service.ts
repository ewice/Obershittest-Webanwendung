import { Injectable } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ChannelsService {
  private _selectedChannel = new BehaviorSubject<String>('5cab4edb2e779f34f81f69b2');
  selectedItem$ = this._selectedChannel.asObservable();

  constructor(private httpService: HttpService) { }

  changeChannel(id: String) {
    this._selectedChannel.next(id);
  }

  getChannels() {
    return this.httpService.getRssChannels();
  }

  getChannel(id: String) {
    return this.httpService.getRssChannel(id);
  }
}
