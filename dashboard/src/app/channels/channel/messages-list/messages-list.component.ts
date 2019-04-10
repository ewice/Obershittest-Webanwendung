import { Component, OnInit, Input } from '@angular/core';
import { MessagesService } from '../../../_services/index';

@ Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.sass']
})
export class MessagesListComponent implements OnInit {

  constructor(private messagesService: MessagesService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.cutOfImage();
    });
  }

  cutOfImage() {
    this.messagesService.messages.forEach(element => {
      const descElement = element.description;
      const description = descElement.slice(descElement.indexOf('">') + 1, descElement.length);
      element.description = description;
    });
  }
}
