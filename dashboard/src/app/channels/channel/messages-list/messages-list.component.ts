import { Component, OnInit, Input } from '@angular/core';
import { MessagesService } from '../../../../_services/index';

@ Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {

  constructor(private messagesService: MessagesService) {
  }

  ngOnInit() {
  }
}
