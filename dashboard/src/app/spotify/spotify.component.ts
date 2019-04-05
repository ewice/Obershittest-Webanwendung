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
      const httpOptions = {
       headers: new HttpHeaders({
         'Authorization': 'Bearer ' + "BQC8UY9vfe_nSnnPFg5scdB8bYUt13U_UEWthm0E78kIn29ZzwW2wsqAKryDPOVnQcPY3jWUKUiE5PfrYkcTXUQ0L2vYdsdDx0bWQ-UOEKCiTuuF0kIZ4sHygI_kt_ZR8G05_u2rpo6Fqsm6RGL0JSt3qqTBZ3ER28k"
       })
      };
//console.log(httpOptions);

      this.httpClient.put('https://api.spotify.com/v1/me/player/play', "{} ", httpOptions)
        .subscribe(
          data => {

            console.log('PUT Request is successful ', data);
          },
          error => {
            console.log('Error', error);

          }
        );
    })

   // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
   //let headers = new Headers();
   //headers.set("Authorization", "Bearer " +token)
    console.log(token)
    //const httpHeaders = new HttpHeaders ({
    //  'Authorization': 'Bearer ' + token
    //});


  }
}


