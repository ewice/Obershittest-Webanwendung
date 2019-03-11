import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'litter';

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
