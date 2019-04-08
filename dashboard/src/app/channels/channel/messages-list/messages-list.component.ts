import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@ Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  loadMessages() {
  }

  loadMessage(messageId: string) {
    this .router.navigate(['message', messageId], { relativeTo: this .route });
  }
}
