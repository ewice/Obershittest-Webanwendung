import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Channel } from '../../_shared/_interface';

@ Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  channel: Channel;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this .route.data.subscribe((data: Data) => {
      if (data['channel']) {
        this .channel = data['channel'];
      } else {
        alert('Channel not found');
        this .router.navigate(['/channels']);
      }
    });
  }

  refreshChannel() {
    alert('TODO');
  }
}
