import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';
import { FlipModule } from 'ngx-flip';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { GridsterModule } from 'angular-gridster2';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChannelComponent } from './channels/channel/channel.component';
import { ChannelsListComponent } from './channels/channels-list/channels-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessagesListComponent } from './channels/channel/messages-list/messages-list.component';
import { RegisterComponent } from './register/register.component';
import { SearchBoxComponent } from './youtube/search-box/search-box.component';
import { SearchResultComponent } from './youtube/search-result/search-result.component';
import { SpotifyComponent } from './spotify/spotify.component';
import { WeatherComponent } from './weather/weather.component';
import { YoutubeComponent } from './youtube/youtube/youtube.component';
import { ClockComponent, TemplateTodoComponent, TemplateTodoFormComponent, TodoListComponent } from './_template';

import { AuthService, Rss2jsonService, ChannelsService, MessagesService, HelperService } from './_services';
import { HttpService } from './_services/http.service';

import { environment } from '../environments/environment';

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
    ChannelComponent,
    ChannelsListComponent,
    MessagesListComponent,
    ClockComponent,
    TemplateTodoComponent,
    TemplateTodoFormComponent,
    TodoListComponent,
    WeatherComponent,
    SpotifyComponent,
    SearchBoxComponent,
    SearchResultComponent,
    CalendarComponent,
    YoutubeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GridsterModule,
    FlipModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    DragulaModule.forRoot()
  ],
  providers: [HttpService, CookieService, Rss2jsonService, ChannelsService, MessagesService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
