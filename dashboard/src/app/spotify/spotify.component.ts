import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss']
})

export class SpotifyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient) {


  }

  ngOnInit() {
  }



  playPause() {
    let token: String;
    this.route.fragment.subscribe(fragment => {
      token = fragment.substring(fragment.indexOf('access_token=') + 13, fragment.indexOf('&', 0));
    })

   // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    const httpHeaders = new HttpHeaders ({
      'Authorization': 'Bearer ' + token
    });

    console.log(httpHeaders);
    this.httpClient.put('https://api.spotify.com/v1/me', { headers: httpHeaders })
      .subscribe(
        data => {
          console.log('PUT Request is successful ', data);
        },
        error => {
          console.log('Error', error);
        }
      );

  }
}


