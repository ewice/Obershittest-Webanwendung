import { HttpClient, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GridsterItem } from 'angular-gridster2';

import { User, ToDo, Channel, Wettersettings, DashboardPositions } from '../_interface';
import { AuthService, Rss2jsonService  } from '../_services';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient,
    private rss2json: Rss2jsonService,
    private _authservice: AuthService,
    private router: Router
  ) { }

  urlTodos = 'http://localhost:3000/todos/';
  urlUsers = 'http://localhost:3000/users/';
  urlChannels = 'http://localhost:3000/channels/';
  urlWeather = 'http://localhost:3000/weather/';
  urlDashboardPositions = 'http://localhost:3000/dashboardPositons/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json ; charset=UTF-8',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  httpOptionsAuthorization = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

// ##########################################################
//                            ToDo
// ##########################################################

  // GET
  public getToDo(): Observable<ToDo[]> {
    return this._http.get<ToDo[]>(this.urlTodos, this.httpOptionsAuthorization);
}

// POST
public postToDo(object: ToDo): Observable<ToDo> {
  return this._http.post<ToDo>(this.urlTodos, object, this.httpOptionsAuthorization);
}

// DELETE
public deleteToDo(object: ToDo): Observable<ToDo> {
  return this._http.delete<ToDo>(this.urlTodos + object._id, this.httpOptionsAuthorization);
}

// PUT
public putToDo(object: ToDo): Observable<ToDo> {
  return this._http.patch<ToDo>(this.urlTodos + object._id, object, this.httpOptionsAuthorization);
}

// ##########################################################
//                            User
// ##########################################################

  sendEmailandPassword(name: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ; charset=UTF-8'
      })
    };
    this._http.post<any>(this.urlUsers + 'login', {email: name, password: password}, httpOptions ).subscribe( data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      this._authservice.isAuthenticated();
      this.router.navigate(['']);
    },
    err => {
      console.log(err);

    }
    );
  }

  getCurrentUser(): Observable<User> {
    const userId = localStorage.getItem('userId');
    return this._http.get<User>(this.urlUsers + userId, this.httpOptions);
  }

  registerNewUser(email: string, password: string, name: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ; charset=UTF-8'
      })
    };
    this._http.post<any>(this.urlUsers + 'signup', {email: email, password: password, name: name}, httpOptions).subscribe();
  }

  getCertainUser(uid: any): Observable<User> {
   return this._http.get<User>(this.urlUsers + uid, this.httpOptions);
  }

// ##########################################################
//                          RSS-Feed
// ##########################################################

  // GET
  public getRssChannels(): Observable<Channel[]> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    return this._http.get<Channel[]>(this.urlChannels, httpOptions);
  }

  // GET
  public getRssChannel(id: String): Observable<Channel> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    return this._http.get<Channel>(this.urlChannels + id, httpOptions);
  }

  // POST
  public addRssChannel(object: Channel): Observable<Channel> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    return this._http.post<Channel>(this.urlChannels, object, httpOptions);
  }

  // XML in JSON umwandeln
  public parseChannel(url: string) {
    const encodedUrl = '?rss_url=' + encodeURI(url);
    const httpOptions = {
      headers: new HttpHeaders({
        'api_key': this.rss2json.getApiKey(),
        'count': this.rss2json.getCountMessages()
      })
    };
    return this ._http.get(this.rss2json.getEndpoint() + encodedUrl, httpOptions);
  }

// ##########################################################
//                          Wetter
// ##########################################################

  public sendWeatherSettings(settings: Wettersettings) {
    this._http.post<Wettersettings>(this.urlWeather, settings, this.httpOptionsAuthorization).subscribe();
    console.log('done');
  }

  public getWeatherSettings() {
    return this._http.get<Wettersettings>(this.urlWeather, this.httpOptions);
  }

  public sendDashboardPositions(dashboard: Array<GridsterItem>) {
    const temporalDashboard: DashboardPositions = {
      dashboard: dashboard,
      userId: localStorage.getItem('userId')
    };

    this._http.post<DashboardPositions>(this.urlDashboardPositions, temporalDashboard, this.httpOptionsAuthorization).subscribe(data => {

    });
  }

  public getDashboardPositions(): Observable<Array<GridsterItem>> {
   return this._http.get<Array<GridsterItem>>(this.urlDashboardPositions + localStorage.getItem('userId'), this.httpOptionsAuthorization);
  }
}
