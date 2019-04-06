import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.sass']
})

export class SpotifyComponent implements OnInit {

  toggle = true;
  artist: String = "";
  track: String;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient) {



  }

  ngOnInit() {
    this.getTrackInfo();
  }
  togglePLay() {

    this.getTrackInfo();
    if (this.toggle === true) {
      this.play();
      this.toggle = !this.toggle;


    } else if (this.toggle === false) {
      this.pause();
      this.toggle = !this.toggle;


    }
  }


  play() {

    let token: String;
    this.route.fragment.subscribe(fragment => {
      token = fragment.substring(fragment.indexOf('access_token=') + 13, fragment.indexOf('&', 0));
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      };

      this.httpClient.put('https://api.spotify.com/v1/me/player/play', "{}", httpOptions)
        .subscribe(
          data => {
            console.log('PUT Request is successful ', data);
          },
          error => {
            console.log('Error', error);
          }
        );
    })
  }
  pause() {

    let token: String;
    this.route.fragment.subscribe(fragment => {
      token = fragment.substring(fragment.indexOf('access_token=') + 13, fragment.indexOf('&', 0));
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      };

      this.httpClient.put('https://api.spotify.com/v1/me/player/pause', "", httpOptions)
        .subscribe(
          data => {
            console.log('PUT Request is successful ', data);
          },
          error => {
            console.log('Error', error);
          }
        );
    });
  }

  next() {
    let token: String;
    this.route.fragment.subscribe(fragment => {
      token = fragment.substring(fragment.indexOf('access_token=') + 13, fragment.indexOf('&', 0));
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      };

      this.httpClient.post('https://api.spotify.com/v1/me/player/next', "", httpOptions)
        .subscribe(
          data => {

            console.log('PUT Request is successful ', data);

          },
          error => {
            console.log('Error', error);

          }
        );
    });
    this.toggle = true;
    setTimeout(() => this.getTrackInfo(), 250);
  }

  back() {
    let token: String;
    this.route.fragment.subscribe(fragment => {
      token = fragment.substring(fragment.indexOf('access_token=') + 13, fragment.indexOf('&', 0));
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      };

      this.httpClient.post('https://api.spotify.com/v1/me/player/previous', "", httpOptions)
        .subscribe(
          data => {
            console.log('PUT Request is successful ', data, this.artist);

            this.artist = "";
            console.log(this.artist)
          },
          error => {
            console.log('Error', error);
          }
        );
    });

    this.toggle = true;
    setTimeout(() => this.getTrackInfo(), 250);

  }
  getTrackInfo() {
    this.artist = "";
    this.track = "";
    let token: String;
    this.route.fragment.subscribe(fragment => {
      token = fragment.substring(fragment.indexOf('access_token=') + 13, fragment.indexOf('&', 0));
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      };

      this.httpClient.get('https://api.spotify.com/v1/me/player/currently-playing', httpOptions)
        .subscribe(
          data => {

            console.log('Get request geklappt ', data, data["item"].name, data["item"].artists[0].name);
            this.track = data["item"].name;

            data["item"].artists.forEach(element => {
              this.artist += ", " + element.name;
            });

            this.artist = this.artist.substring(2, this.artist.length);
            console.log(this.artist, this.track);
          },
          error => {
            console.log('Error', error);
          }
        );
    });
  }
}
