import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CalendarComponent, ClockComponent, TemplateTodoComponent, TemplateTodoFormComponent, TodoListComponent } from './_template';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';

import { HttpService, AuthService } from './_services';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { GridsterModule } from 'angular-gridster2';
import { WeatherComponent } from './weather/weather.component';


export function tokenGetter() {
  const cookie = new CookieService();
  return cookie.get('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CalendarComponent,
    ClockComponent,
    TemplateTodoComponent,
    TemplateTodoFormComponent,
    TodoListComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GridsterModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    DragulaModule.forRoot()
  ],
  providers: [HttpService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
