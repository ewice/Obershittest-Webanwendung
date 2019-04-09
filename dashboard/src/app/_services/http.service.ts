import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User, ToDo } from '../_interface';
import { AuthService } from '../_services/auth.service';
import { Wettersettings } from '../_interface/wettersettings';
import { GridsterItem } from 'angular-gridster2';
import { DashboardPositions } from '../_interface/dashboard-positions';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient, private _authservice: AuthService, private router: Router) { }

  urlTodos = 'http://localhost:3000/todos/';
  urlUsers = 'http://localhost:3000/users/';
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


  sendWeatherSettings(settings: Wettersettings) {
    this._http.post<Wettersettings>(this.urlWeather, settings, this.httpOptions).subscribe();
    console.log('done');

  }

  getWeatherSettings() {
    return this._http.get<Wettersettings>(this.urlWeather, this.httpOptionsAuthorization);
  }

  sendDashboardPositions(dashboard: Array<GridsterItem>) {
    let temporalDashboard: DashboardPositions = {
      dashboard: dashboard,
      userId: localStorage.getItem("userId")
    }

    this._http.post<DashboardPositions>(this.urlDashboardPositions, temporalDashboard, this.httpOptionsAuthorization).subscribe(data => {

    });
  }

  getDashboardPositions(): Observable<Array<GridsterItem>>{
   return this._http.get<Array<GridsterItem>>(this.urlDashboardPositions + localStorage.getItem("userId"), this.httpOptions);
  }
}
