import { HttpClient, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User, ToDo, Channel } from '../_interface';
import { AuthService } from '../_services/auth.service';
import { Rss2jsonService } from '../_services/rss2json.service';



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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json ; charset=UTF-8',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

// ##########################################################
//                            ToDo
// ##########################################################

  // GET
  public getToDo(): Observable<ToDo[]> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    return this._http.get<ToDo[]>(this.urlTodos, httpOptions);
}

// POST
public postToDo(object: ToDo): Observable<ToDo> {
  const httpOptions = {
      headers: new HttpHeaders ({
          'Content-Type': 'application/json'
      })
  };
  return this._http.post<ToDo>(this.urlTodos, object, httpOptions);
}

// DELETE
public deleteToDo(object: ToDo): Observable<ToDo> {
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };
  return this._http.delete<ToDo>(this.urlTodos + object._id, httpOptions);
}

// PUT
public putToDo(object: ToDo): Observable<ToDo> {
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };
  return this._http.patch<ToDo>(this.urlTodos + object._id, object, httpOptions);
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
}
