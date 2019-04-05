import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from "@angular/router";
let toggle:Boolean;
      toggle =true;

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
togglePLay(){


  if (toggle === true){
    this.play();
    toggle = false;
    

  }else if ( toggle === false){
  this.pause();
  toggle = true;


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

}
