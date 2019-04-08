import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { timeout } from 'rxjs/operators';
import { getToken } from '@angular/router/src/utils/preactivation';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.sass']
})

export class SpotifyComponent implements OnInit {

  toggle = true;
  anmelden = true;
  artist: String = '';
  track: String;
  albumUrl: String = '';
  token: String;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient) {



  }

  ngOnInit() {
    setTimeout(() => this.getTrackInfo(), 1000);
    this.getToken();
    this.isTokenUndefined();

  }
  togglePLay() {

    this.getTrackInfo();
    if (this.toggle === true) {
      this.play();
      this.toggle = false;


    } else if (this.toggle === false) {
      this.pause();
      this.toggle = true;


    }
  }


  play() {
    this.route.fragment.subscribe(fragment => {
      this.token = fragment.substring(fragment.indexOf('access_token=') + 13, fragment.indexOf('&', 0));
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
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
    console.log(this.toggle);

    this.toggle = true;
    console.log(this.toggle);
    this.track = "";
    this.artist = "";
    setTimeout(() => this.getTrackInfo(), 1000);
  }
getToken(){
  this.route.fragment.subscribe(fragment => {
    this.token = fragment.substring(fragment.indexOf('access_token=') + 13, fragment.indexOf('&', 0));

});
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
    this.track = '';
    this.artist = '';
    setTimeout(() => this.getTrackInfo(), 1000);

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

            console.log('Get request geklappt ', data, data["item"].name, data["item"].artists[0].name, data["item"].album.images[1]);
            this.track = data["item"].name;
            this.albumUrl=data["item"].album.images[1].url;

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
  authenticate(){
    window.location.href="https://accounts.spotify.com/authorize?client_id=05cd27ba45954604967db28cfd533e0d&redirect_uri=http://localhost:4200/&scope=user-read-private%20user-read-email%20user-modify-playback-state%20user-read-currently-playing%20user-read-playback-state&response_type=token&state=123"
  }
  isTokenUndefined(){
    console.log(this.token);

    if(this.token === undefined)
    {
      this.anmelden = true;
    }else {
      this.anmelden = false;
    }
  }

}
